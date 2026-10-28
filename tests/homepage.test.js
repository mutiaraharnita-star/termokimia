import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HomePage from '../src/components/HomePage.jsx';
import StudentDashboard from '../src/components/StudentDashboard.jsx';
import { getModule } from '../src/content/learningContent.js';
import { applyAction, createInitialState, getModuleProgress } from '../src/domain/learning.js';

const initial = () => createInitialState('2026-10-20T00:00:00.000Z');
const noop = () => {};
const act = (state, type, extra = {}) => applyAction(state, {
  type, studentId: state.activeStudentId, moduleId: 'M1', ...extra,
});
const renderHome = (state) => renderToStaticMarkup(createElement(HomePage, {
  state, onStart: noop, onOpenModule: noop,
}));

function moduleCard(html, moduleId) {
  const title = getModule(moduleId).title;
  const articles = html.match(/<article\b[\s\S]*?<\/article>/g) || [];
  const article = articles.find((entry) => entry.includes('>' + title + '</h3>'));
  expect(article, 'Kartu ' + moduleId + ' harus dirender').toBeDefined();
  return article;
}

function finishFirstModule(state) {
  let next = state;
  for (const item of getModule('M1').items) {
    if (['material', 'example', 'video'].includes(item.type)) {
      next = act(next, 'COMPLETE_ITEM', { itemId: item.id });
    } else if (item.type === 'case') {
      next = act(next, 'SAVE_CASE', { responses: ['Sistem reaksi.', 'Kalor menuju lingkungan.'] });
    } else if (item.type === 'simulation') {
      next = act(next, 'RUN_SIMULATION', { inputs: { productH: -50 } });
    }
  }
  next = act(next, 'START_QUIZ');
  for (const question of getModule('M1').questions) {
    next = act(next, 'ANSWER_QUIZ', {
      questionId: question.id, optionIndex: (question.answerIndex + 1) % 4,
    });
  }
  return next;
}

describe('render Beranda dengan state pembelajaran yang sebenarnya', () => {
  it('mengikuti nama, kelas, dan progres profil aktif ketika profil berganti', () => {
    let state = act(initial(), 'COMPLETE_ITEM', { itemId: 'M1-MAT01' });
    const alya = renderHome(state);
    expect(alya).toContain('Profil demo aktif');
    expect(alya).toContain('Alya Demo');
    expect(alya).toContain('XI Demo');
    expect(moduleCard(alya, 'M1')).toContain('aria-label="1/9 kegiatan"');
    expect(moduleCard(alya, 'M1')).toContain('Sedang dipelajari');

    state = act(state, 'SET_MODE', { mode: 'teacher' });
    state = act(state, 'ADD_CLASS', { name: 'XI B Demo' });
    state = act(state, 'UPDATE_STUDENT', { studentId: 'student-2', classId: state.classes.at(-1).id });
    state = act(state, 'SET_MODE', { mode: 'student' });
    state = act(state, 'SELECT_PROFILE', { studentId: 'student-2' });
    const bima = renderHome(state);
    expect(bima).toContain('Bima Demo');
    expect(bima).toContain('XI B Demo');
    expect(bima).not.toContain('Alya Demo');
    expect(moduleCard(bima, 'M1')).toContain('aria-label="0/9 kegiatan"');
    expect(moduleCard(bima, 'M1')).toContain('Belum dimulai');
    expect(getModuleProgress(state, 'student-1', 'M1').completed).toBe(1);
  });

  it('kuis parsial dengan nol item selesai menawarkan Lanjutkan modul pada Beranda dan ruang siswa', () => {
    const question = getModule('M1').questions[0];
    let state = act(initial(), 'START_QUIZ');
    state = act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: question.answerIndex });
    expect(getModuleProgress(state, state.activeStudentId, 'M1')).toMatchObject({
      completed: 0, started: true, status: 'in_progress', answered: 1,
    });
    const pages = [
      renderHome(state),
      renderToStaticMarkup(createElement(StudentDashboard, {
        state, onOpenModule: noop, onChangeProfile: noop,
      })),
    ];
    for (const html of pages) {
      const card = moduleCard(html, 'M1');
      expect(card).toContain('aria-label="Lanjutkan modul: Konsep Dasar Termokimia"');
      expect(card).not.toContain('aria-label="Mulai modul:');
      expect(card).toContain('Kuis berjalan: 1/5 soal dijawab.');
      expect(card).toContain('aria-label="0/9 kegiatan"');
    }
  });

  it('state null menampilkan prasyarat umum tanpa mengarang profil, status awal, atau persentase progres', () => {
    const html = renderHome(null);
    expect(html.match(/<article\b/g)).toHaveLength(3);
    expect(html).toContain('Status belajar belum tersedia.');
    expect(html).not.toContain('Profil demo aktif');
    expect(html).not.toContain('Alya Demo');
    expect(html).not.toContain('<progress');
    expect(html).not.toContain('status-badge');
    expect(html).not.toContain('Belum dimulai');
    expect(html).not.toContain('Terkunci');
    for (const moduleId of ['M1', 'M2', 'M3']) {
      const card = moduleCard(html, moduleId);
      expect(card).toContain('aria-label="Pilih profil belajar: ' + getModule(moduleId).title + '"');
      expect(card).not.toContain('0/9 kegiatan');
    }
    expect(moduleCard(html, 'M2')).toContain('Terbuka setelah seluruh kegiatan Modul 1 selesai.');
  });

  it('M1 selesai dengan nilai nol dirender selesai dan M2 terbuka sesuai domain', () => {
    const state = finishFirstModule(initial());
    expect(getModuleProgress(state, state.activeStudentId, 'M1')).toMatchObject({
      isComplete: true, firstScore: 0,
    });
    const html = renderHome(state);
    const first = moduleCard(html, 'M1');
    expect(first).toContain('Selesai');
    expect(first).toContain('aria-label="9/9 kegiatan"');
    expect(first).toContain('aria-label="Pelajari kembali: Konsep Dasar Termokimia"');
    const second = moduleCard(html, 'M2');
    expect(second).toContain('aria-label="Mulai modul: Kalorimetri"');
    expect(second).not.toContain('Terkunci');
    expect(second).not.toContain('Lihat prasyarat');
    expect(moduleCard(html, 'M3')).toContain('aria-label="Lihat prasyarat: Penentuan ΔH Reaksi"');
  });
});
