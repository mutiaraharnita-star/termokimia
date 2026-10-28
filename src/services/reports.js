import { modules } from '../content/learningContent.js';
import { getModuleProgress, getModuleRecord } from '../domain/learning.js';

const FILENAMES = {
  summary: 'rekap_belajar.csv',
  answers: 'rincian_jawaban_kuis.csv',
  activities: 'catatan_aktivitas.csv',
};

const STATUS_LABELS = {
  locked: 'Terkunci',
  not_started: 'Belum dimulai',
  in_progress: 'Sedang dipelajari',
  completed: 'Selesai',
};

function cell(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '';
  let text = String(value);
  if (/^[\s\uFEFF]*[=+\-@]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}

function csv(rows) {
  return '\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

function wib(value) {
  if (!value) return '';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '';
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date).map((part) => [part.type, part.value]),
  );
  return parts.year + '-' + parts.month + '-' + parts.day + ' ' + parts.hour + ':' + parts.minute + ':' + parts.second + ' WIB';
}

function optionText(question, index) {
  if (!Number.isInteger(index)) return '';
  return String.fromCharCode(65 + index) + '. ' + question.options[index];
}

function summaryRows(state, students, className, exportedAt) {
  const rows = [[
    'ID siswa', 'Nama siswa', 'Kelas saat ekspor', 'ID modul', 'Modul', 'Status modul',
    'Item selesai', 'Total item', 'Progres (%)', 'Soal aktif terjawab',
    'Nilai pertama selesai', 'Nilai terakhir selesai', 'Waktu ekspor (WIB)',
  ]];
  for (const student of students) {
    for (const module of modules) {
      const progress = getModuleProgress(state, student.id, module.id);
      rows.push([
        student.id, student.name, className, module.id, module.title, STATUS_LABELS[progress.status],
        progress.completed, progress.total, progress.percent,
        progress.activeAttempt ? Object.keys(progress.activeAttempt.answers).length : null,
        progress.firstScore, progress.latestScore, wib(exportedAt),
      ]);
    }
  }
  return rows;
}

function answerRows(state, students, className) {
  const rows = [[
    'ID siswa', 'Nama siswa', 'Kelas saat ekspor', 'ID modul', 'Modul',
    'ID percobaan', 'Nomor percobaan', 'Status percobaan', 'Versi konten',
    'ID soal', 'Teks soal', 'Jawaban siswa', 'Kunci jawaban', 'Status jawaban',
    'Benar atau salah', 'Nilai akhir percobaan', 'Waktu kirim (WIB)',
  ]];
  for (const student of students) {
    for (const module of modules) {
      const record = getModuleRecord(state, student.id, module.id);
      for (const attempt of record.attempts) {
        for (const question of module.questions) {
          const answer = attempt.answers[question.id];
          rows.push([
            student.id, student.name, className, module.id, module.title,
            attempt.id, attempt.number, attempt.status === 'completed' ? 'Selesai' : 'Sedang dikerjakan',
            state.contentVersion, question.id, question.prompt,
            answer ? optionText(question, answer.optionIndex) : '',
            optionText(question, question.answerIndex),
            answer ? 'Dijawab' : 'Belum dijawab',
            answer ? (answer.correct ? 'Benar' : 'Salah') : null,
            attempt.score, answer ? wib(answer.submittedAt) : '',
          ]);
        }
      }
    }
  }
  return rows;
}

function activityRows(state, students, className) {
  const rows = [[
    'ID siswa', 'Nama siswa', 'Kelas saat ekspor', 'ID modul', 'Modul',
    'ID aktivitas', 'Jenis aktivitas', 'Status aktivitas',
    'Waktu pertama selesai (WIB)', 'Waktu perubahan terakhir (WIB)',
    'Respons kasus 1', 'Respons kasus 2', 'Jumlah run simulasi',
    'Input simulasi terakhir (JSON)', 'Hasil simulasi terakhir (JSON)', 'Catatan pengamatan opsional',
  ]];
  for (const student of students) {
    for (const module of modules) {
      const record = getModuleRecord(state, student.id, module.id);
      for (const item of module.items.filter((entry) => ['case', 'simulation'].includes(entry.type))) {
        const isCase = item.type === 'case';
        const value = isCase ? record.caseResponse : record.simulation;
        rows.push([
          student.id, student.name, className, module.id, module.title, item.id,
          isCase ? 'Kasus' : 'Simulasi',
          value ? 'Selesai' : 'Belum dimulai',
          wib(isCase ? value?.completedAt : value?.firstRunAt),
          wib(value?.updatedAt || value?.lastRunAt),
          isCase ? value?.responses[0] ?? '' : '',
          isCase ? value?.responses[1] ?? '' : '',
          isCase ? null : value?.runs ?? 0,
          !isCase && value ? JSON.stringify(value.inputs) : '',
          !isCase && value ? JSON.stringify(value.result) : '',
          !isCase && value ? value.note : '',
        ]);
      }
    }
  }
  return rows;
}

export function generateReport(type, state, classId) {
  if (!Object.hasOwn(FILENAMES, type)) throw new Error('Jenis laporan tidak dikenali.');
  const classroom = state.classes.find((entry) => entry.id === classId);
  if (!classroom) throw new Error('Pilih kelas yang akan diekspor.');
  const students = state.students.filter((student) => student.classId === classId);
  if (type === 'summary') return csv(summaryRows(state, students, classroom.name, new Date().toISOString()));
  if (type === 'answers') return csv(answerRows(state, students, classroom.name));
  return csv(activityRows(state, students, classroom.name));
}

export function downloadReport(type, state, classId) {
  const contents = generateReport(type, state, classId);
  const blob = new Blob([contents], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = FILENAMES[type];
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return { filename: FILENAMES[type] };
}
