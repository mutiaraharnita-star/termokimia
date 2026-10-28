import { describe, expect, it } from 'vitest';
import { getModule } from '../src/content/learningContent.js';
import { applyAction, createInitialState, getModuleRecord } from '../src/domain/learning.js';
import { generateReport } from '../src/services/reports.js';

const initial = () => createInitialState('2026-10-20T00:00:00.000Z');
const act = (state, type, extra = {}) => applyAction(state, {
  type, studentId: 'student-1', moduleId: 'M1', at: '2026-10-20T00:01:00.000Z', ...extra,
});

// Membaca CSV sesuai aturan kutip, termasuk koma, kutip ganda, dan baris baru di dalam sel.
function readCsv(csv) {
  const text = csv.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') { value += '"'; index += 1; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(value); value = '';
    } else if (char === '\n' && !quoted) {
      row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = '';
    } else value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const [headers, ...values] = rows;
  return values.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index]])));
}

function finishQuiz(state, correct = false) {
  let next = act(state, 'START_QUIZ');
  for (const question of getModule('M1').questions) {
    next = act(next, 'ANSWER_QUIZ', {
      questionId: question.id, optionIndex: correct ? question.answerIndex : (question.answerIndex + 1) % 4,
    });
  }
  return next;
}

describe('tiga rekap CSV guru', () => {
  it('ringkasan mencakup setiap siswa dan modul, sementara siswa tanpa percobaan tidak mendapat percobaan palsu', () => {
    const state = initial();
    const csv = generateReport('summary', state, 'class-1');
    expect(csv.startsWith('\uFEFF')).toBe(true);
    const rows = readCsv(csv);
    expect(rows).toHaveLength(9);
    const alya = rows.filter((row) => row['ID siswa'] === 'student-1');
    expect(alya.map((row) => row['Status modul'])).toEqual(['Belum dimulai', 'Terkunci', 'Terkunci']);
    expect(alya.every((row) => row['Nilai pertama selesai'] === '' && row['Item selesai'] === '0')).toBe(true);
    expect(readCsv(generateReport('answers', state, 'class-1'))).toEqual([]);
    expect(readCsv(generateReport('activities', state, 'class-1'))).toHaveLength(18);
  });

  it('laporan kuis parsial membedakan salah dari belum dijawab dan belum memiliki nilai akhir', () => {
    let state = act(initial(), 'START_QUIZ');
    const question = getModule('M1').questions[0];
    state = act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: (question.answerIndex + 1) % 4 });
    const rows = readCsv(generateReport('answers', state, 'class-1'));
    expect(rows).toHaveLength(5);
    expect(rows[0]).toMatchObject({
      'Status percobaan': 'Sedang dikerjakan', 'Status jawaban': 'Dijawab', 'Benar atau salah': 'Salah',
      'Nilai akhir percobaan': '', 'Versi konten': '2.0', 'Waktu kirim (WIB)': '2026-10-20 07:01:00 WIB',
    });
    for (const row of rows.slice(1)) {
      expect(row).toMatchObject({
        'Status jawaban': 'Belum dijawab', 'Benar atau salah': '', 'Jawaban siswa': '',
        'Nilai akhir percobaan': '', 'Waktu kirim (WIB)': '',
      });
    }
    const summary = readCsv(generateReport('summary', state, 'class-1'))[0];
    expect(summary).toMatchObject({ 'Soal aktif terjawab': '1', 'Nilai pertama selesai': '', 'Nilai terakhir selesai': '' });
  });

  it('menyertakan seluruh percobaan dan mempertahankan nilai pertama nol saat nilai terbaru berubah', () => {
    let state = finishQuiz(initial());
    state = finishQuiz(state, true);
    const summary = readCsv(generateReport('summary', state, 'class-1'))[0];
    expect(summary).toMatchObject({ 'Nilai pertama selesai': '0', 'Nilai terakhir selesai': '100' });
    const answers = readCsv(generateReport('answers', state, 'class-1'));
    expect(answers).toHaveLength(10);
    expect(answers.slice(0, 5).every((row) => row['Nilai akhir percobaan'] === '0')).toBe(true);
    expect(answers.slice(5).every((row) => row['Nilai akhir percobaan'] === '100')).toBe(true);
    state = act(state, 'START_QUIZ');
    const retry = readCsv(generateReport('answers', state, 'class-1'));
    expect(retry).toHaveLength(15);
    expect(retry.slice(10).every((row) => row['Nilai akhir percobaan'] === '' && row['Benar atau salah'] === '')).toBe(true);
  });

  it('melaporkan kasus serta snapshot simulasi terakhir tanpa mewajibkan catatan', () => {
    let state = act(initial(), 'SAVE_CASE', { responses: ['Sistem reaksi.', 'Lingkungan menerima kalor.'] });
    state = act(state, 'RUN_SIMULATION', { inputs: { productH: -50 } });
    const firstTime = getModuleRecord(state, 'student-1', 'M1').simulation.firstRunAt;
    state = act(state, 'RUN_SIMULATION', { inputs: { productH: 20 }, at: '2026-10-20T00:02:00.000Z' });
    const rows = readCsv(generateReport('activities', state, 'class-1'));
    const simulation = rows.find((row) => row['ID siswa'] === 'student-1' && row['ID aktivitas'] === 'M1-SIM01');
    expect(simulation).toMatchObject({
      'Status aktivitas': 'Selesai', 'Jumlah run simulasi': '2', 'Catatan pengamatan opsional': '',
      'Waktu pertama selesai (WIB)': '2026-10-20 07:01:00 WIB',
      'Waktu perubahan terakhir (WIB)': '2026-10-20 07:02:00 WIB',
    });
    expect(JSON.parse(simulation['Input simulasi terakhir (JSON)']).productH).toBe(20);
    expect(JSON.parse(simulation['Hasil simulasi terakhir (JSON)']).deltaH).toBe(20);
    expect(getModuleRecord(state, 'student-1', 'M1').simulation.firstRunAt).toBe(firstTime);
    const caseRow = rows.find((row) => row['ID siswa'] === 'student-1' && row['ID aktivitas'] === 'M1-CASE01');
    expect(caseRow).toMatchObject({
      'Status aktivitas': 'Selesai', 'Respons kasus 1': 'Sistem reaksi.', 'Respons kasus 2': 'Lingkungan menerima kalor.',
    });
  });

  it('pemindahan siswa mengubah cakupan ekspor kelas tanpa menghilangkan riwayat', () => {
    let state = finishQuiz(initial());
    state = act(state, 'SET_MODE', { mode: 'teacher' });
    state = act(state, 'ADD_CLASS', { name: 'XI Baru' });
    const classId = state.classes.at(-1).id;
    state = act(state, 'UPDATE_STUDENT', { studentId: 'student-1', classId });
    for (const type of ['summary', 'answers', 'activities']) {
      const oldRows = readCsv(generateReport(type, state, 'class-1'));
      expect(oldRows.some((row) => row['ID siswa'] === 'student-1')).toBe(false);
      const newRows = readCsv(generateReport(type, state, classId));
      expect(newRows.length).toBeGreaterThan(0);
      expect(newRows.every((row) => row['ID siswa'] === 'student-1' && row['Kelas saat ekspor'] === 'XI Baru')).toBe(true);
    }
    expect(readCsv(generateReport('answers', state, classId))).toHaveLength(5);
  });

  it('mengutip koma, kutip, dan baris baru serta melindungi teks pengguna dari formula spreadsheet', () => {
    let state = act(initial(), 'SAVE_CASE', { responses: ['=2+2', 'Kalor, "keluar"\ndari sistem.'] });
    state = act(state, 'SET_MODE', { mode: 'teacher' });
    state = act(state, 'UPDATE_STUDENT', { studentId: 'student-1', name: '=SUM(1,2)' });
    state = act(state, 'RENAME_CLASS', { classId: 'class-1', name: '@Kelas Demo' });
    const csv = generateReport('activities', state, 'class-1');
    const row = readCsv(csv).find((entry) => entry['ID siswa'] === 'student-1' && entry['ID aktivitas'] === 'M1-CASE01');
    expect(row).toMatchObject({
      'Nama siswa': "'=SUM(1,2)", 'Kelas saat ekspor': "'@Kelas Demo",
      'Respons kasus 1': "'=2+2", 'Respons kasus 2': 'Kalor, "keluar"\ndari sistem.',
    });
    expect(csv).toContain('"Kalor, ""keluar""\ndari sistem."');
    const summary = generateReport('summary', initial(), 'class-1');
    expect(summary).toContain(',0,9,0,');
  });

  it('menolak jenis laporan dan kelas yang tidak dikenal', () => {
    expect(() => generateReport('other', initial(), 'class-1')).toThrow();
    expect(() => generateReport('summary', initial(), 'kelas-hilang')).toThrow();
  });
});
