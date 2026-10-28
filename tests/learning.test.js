import { describe, expect, it } from 'vitest';
import { getModule, modules } from '../src/content/learningContent.js';
import { applyAction, createInitialState, getModuleProgress, getModuleRecord, getOverallProgress } from '../src/domain/learning.js';

const STUDENT = 'student-1';
const initial = () => createInitialState('2026-10-20T00:00:00.000Z');
const act = (state, type, props = {}) => applyAction(state, { type, studentId: STUDENT, moduleId: 'M1', ...props });
const simulationInputs = {
  M1: { productH: -50 },
  M2: { mass: 100, initialTemp: 25, moles: 0.05, molarEnthalpy: -41.8 },
  M3: { cards: [{ included: true, reverse: false, factor: 1 }, { included: false, reverse: false, factor: 1 }] },
};

function finishQuiz(state, moduleId = 'M1', correct = false) {
  let next = act(state, 'START_QUIZ', { moduleId });
  for (const question of getModule(moduleId).questions) {
    next = act(next, 'ANSWER_QUIZ', {
      moduleId, questionId: question.id,
      optionIndex: correct ? question.answerIndex : (question.answerIndex + 1) % 4,
    });
  }
  return next;
}

function finishOtherItems(state, moduleId = 'M1', omitType = null) {
  let next = state;
  for (const item of getModule(moduleId).items) {
    if (item.type === omitType) continue;
    if (['material', 'example', 'video'].includes(item.type)) {
      next = act(next, 'COMPLETE_ITEM', { moduleId, itemId: item.id });
    } else if (item.type === 'case') {
      next = act(next, 'SAVE_CASE', { moduleId, responses: ['Sistem reaksi.', 'Kalor keluar dari sistem.'] });
    } else if (item.type === 'simulation') {
      next = act(next, 'RUN_SIMULATION', { moduleId, inputs: simulationInputs[moduleId] });
    }
  }
  return next;
}

function finishModule(state, moduleId = 'M1', correct = false) {
  return finishQuiz(finishOtherItems(state, moduleId), moduleId, correct);
}

describe('alur pembelajaran sembilan item per modul', () => {
  it('memulai profil terpisah dengan M1 terbuka serta M2 dan M3 terkunci', () => {
    const state = initial();
    expect(modules.map((module) => module.items.length)).toEqual([9, 9, 9]);
    expect(getModuleProgress(state, STUDENT, 'M1')).toMatchObject({
      completed: 0, total: 9, status: 'not_started', isLocked: false, firstScore: null, latestScore: null,
    });
    expect(getModuleProgress(state, STUDENT, 'M2').isLocked).toBe(true);
    expect(getModuleProgress(state, STUDENT, 'M3').isLocked).toBe(true);
    expect(getOverallProgress(state, STUDENT)).toMatchObject({ completed: 0, total: 27, percent: 0 });
    expect(() => act(state, 'START_QUIZ', { moduleId: 'M2' })).toThrow(/terkunci/);
  });

  it('menandai materi secara idempoten tanpa memutasi state lama atau menyelesaikan aktivitas lewat jalan pintas', () => {
    const state = initial();
    const changed = act(state, 'COMPLETE_ITEM', { itemId: 'M1-MAT01' });
    expect(state.progress[STUDENT]).toEqual({});
    expect(changed).not.toBe(state);
    expect(getModuleProgress(changed, STUDENT, 'M1').completed).toBe(1);
    expect(act(changed, 'COMPLETE_ITEM', { itemId: 'M1-MAT01' })).toBe(changed);
    for (const item of getModule('M1').items.filter((entry) => ['case', 'simulation', 'quiz'].includes(entry.type))) {
      expect(() => act(changed, 'COMPLETE_ITEM', { itemId: item.id })).toThrow(/aktivitas/);
    }
  });

  it('kasus membutuhkan dua respons valid dan perubahan respons mempertahankan waktu selesai pertama', () => {
    for (const responses of [[], ['a'], ['a', ' '], ['a', 'b'.repeat(1001)], ['a', null]]) {
      expect(() => act(initial(), 'SAVE_CASE', { responses })).toThrow();
    }
    let state = act(initial(), 'SAVE_CASE', { responses: [' Sistem. ', ' Lingkungan. '] });
    const first = getModuleRecord(state, STUDENT, 'M1').caseResponse;
    expect(first.responses).toEqual(['Sistem.', 'Lingkungan.']);
    state = act(state, 'SAVE_CASE', { responses: ['Sistem reaksi.', 'Larutan sebagai lingkungan.'] });
    const edited = getModuleRecord(state, STUDENT, 'M1').caseResponse;
    expect(edited.completedAt).toBe(first.completedAt);
    expect(edited.updatedAt > first.updatedAt).toBe(true);
    expect(getModuleProgress(state, STUDENT, 'M1').completed).toBe(1);
  });

  it('AC05: video dan transkrip memakai ID kegiatan yang sama sehingga hanya dihitung sekali', () => {
    const video = getModule('M1').items.find((item) => item.type === 'video');
    const watched = act(initial(), 'COMPLETE_ITEM', { itemId: video.id });
    const transcriptRead = act(watched, 'COMPLETE_ITEM', { itemId: video.id });
    expect(transcriptRead).toBe(watched);
    expect(getModuleProgress(transcriptRead, STUDENT, 'M1').completed).toBe(1);
  });

  it('satu run valid menyelesaikan simulasi tanpa catatan; run invalid tidak mengubah data', () => {
    const before = initial();
    expect(() => act(before, 'SAVE_NOTE', { note: 'Catatan' })).toThrow(/Jalankan/);
    expect(() => act(before, 'RUN_SIMULATION', { inputs: { productH: '' } })).toThrow();
    expect(before.progress[STUDENT]).toEqual({});
    let state = act(before, 'RUN_SIMULATION', { inputs: simulationInputs.M1 });
    const first = getModuleRecord(state, STUDENT, 'M1').simulation;
    expect(first).toMatchObject({ runs: 1, note: '', result: { deltaH: -50 } });
    expect(getModuleProgress(state, STUDENT, 'M1').completed).toBe(1);
    state = act(state, 'SAVE_NOTE', { note: '  Pengamatan opsional.  ' });
    expect(getModuleRecord(state, STUDENT, 'M1').simulation.lastRunAt).toBe(first.lastRunAt);
    state = act(state, 'RUN_SIMULATION', { inputs: { productH: 35 } });
    expect(getModuleRecord(state, STUDENT, 'M1').simulation).toMatchObject({
      runs: 2, firstRunAt: first.firstRunAt, note: 'Pengamatan opsional.', result: { deltaH: 35 },
    });
    expect(getModuleProgress(state, STUDENT, 'M1').completed).toBe(1);
  });

  it('nilai nol tetap membuka modul setelah seluruh sembilan item selesai', () => {
    const state = finishModule(initial());
    expect(getModuleProgress(state, STUDENT, 'M1')).toMatchObject({
      completed: 9, percent: 100, isComplete: true, status: 'completed', firstScore: 0, latestScore: 0,
    });
    expect(getModuleProgress(state, STUDENT, 'M2').isLocked).toBe(false);
    expect(getModuleProgress(state, STUDENT, 'M3').isLocked).toBe(true);
  });

  it('nilai 100 tidak menggantikan aktivitas; penyelesaian aktivitas sesudah kuis langsung membuka modul', () => {
    let state = finishQuiz(finishOtherItems(initial(), 'M1', 'simulation'), 'M1', true);
    expect(getModuleProgress(state, STUDENT, 'M1')).toMatchObject({ completed: 8, firstScore: 100, isComplete: false });
    expect(getModuleProgress(state, STUDENT, 'M2').isLocked).toBe(true);
    state = act(state, 'RUN_SIMULATION', { inputs: simulationInputs.M1 });
    expect(getModuleProgress(state, STUDENT, 'M2').isLocked).toBe(false);
  });

  it('jawaban pertama terkunci, pengiriman ulang identik aman, dan kuis parsial belum bernilai', () => {
    const question = getModule('M1').questions[0];
    let state = act(initial(), 'START_QUIZ');
    expect(act(state, 'START_QUIZ')).toBe(state);
    state = act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: question.answerIndex });
    expect(act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: question.answerIndex })).toBe(state);
    expect(() => act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: (question.answerIndex + 1) % 4 })).toThrow(/terkunci/);
    expect(getModuleProgress(state, STUDENT, 'M1')).toMatchObject({
      completed: 0, answered: 1, firstScore: null, latestScore: null,
      activeAttempt: { score: null, status: 'active', completedAt: null },
    });
    expect(() => act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: -1 })).toThrow();
  });

  it('ulangan mempertahankan nilai pertama dan progres tanpa mengunci kembali modul', () => {
    let state = finishModule(initial());
    const firstAttempt = structuredClone(getModuleRecord(state, STUDENT, 'M1').attempts[0]);
    state = act(state, 'START_QUIZ');
    const partial = getModuleProgress(state, STUDENT, 'M1');
    expect(partial).toMatchObject({
      completed: 9, isComplete: true, firstScore: 0, latestScore: 0,
      activeAttempt: { number: 2, score: null },
    });
    expect(getModuleProgress(state, STUDENT, 'M2').isLocked).toBe(false);
    state = finishQuiz(state, 'M1', true);
    const final = getModuleProgress(state, STUDENT, 'M1');
    expect(final).toMatchObject({ firstScore: 0, latestScore: 100, activeAttempt: null, isComplete: true });
    expect(final.attempts[0]).toEqual(firstAttempt);
    expect(final.attempts).toHaveLength(2);
  });

  it('AC12: tiga jawaban benar dari lima menghasilkan nilai akhir 60', () => {
    let state = act(initial(), 'START_QUIZ');
    for (const [index, question] of getModule('M1').questions.entries()) {
      state = act(state, 'ANSWER_QUIZ', {
        questionId: question.id, optionIndex: index < 3 ? question.answerIndex : (question.answerIndex + 1) % 4,
      });
    }
    expect(getModuleProgress(state, STUDENT, 'M1')).toMatchObject({
      answered: 5, firstScore: 60, latestScore: 60, activeAttempt: null,
      lastAttempt: { status: 'completed', score: 60 },
    });
  });

  it('Hess selesai dengan satu konfigurasi valid meskipun target belum cocok', () => {
    let state = finishModule(finishModule(initial(), 'M1'), 'M2');
    state = act(state, 'RUN_SIMULATION', { moduleId: 'M3', inputs: simulationInputs.M3 });
    expect(getModuleRecord(state, STUDENT, 'M3').simulation).toMatchObject({
      runs: 1, note: '', result: { matchesTarget: false },
    });
    expect(getModuleProgress(state, STUDENT, 'M3').completed).toBe(1);
  });

  it('profil, mode guru, dan pemindahan kelas menjaga identitas serta riwayat siswa', () => {
    let state = finishModule(initial());
    const oldHistory = structuredClone(state.progress[STUDENT]);
    expect(() => act(state, 'START_QUIZ', { studentId: 'student-2' })).toThrow(/profil/);
    state = act(state, 'SELECT_PROFILE', { studentId: 'student-2' });
    expect(getOverallProgress(state, 'student-2').completed).toBe(0);
    expect(getOverallProgress(state, STUDENT).completed).toBe(9);
    expect(() => act(state, 'ADD_CLASS', { name: 'XI Baru' })).toThrow(/Guru/);
    state = act(state, 'SET_MODE', { mode: 'teacher' });
    expect(() => act(state, 'START_QUIZ', { studentId: 'student-2' })).toThrow(/profil/);
    expect(() => act(state, 'DELETE_CLASS', { classId: 'class-1' })).toThrow(/Pindahkan/);
    state = act(state, 'ADD_CLASS', { name: 'XI Baru' });
    const newClass = state.classes.find((entry) => entry.id !== 'class-1');
    state = act(state, 'UPDATE_STUDENT', { studentId: STUDENT, name: 'Alya Baru', classId: newClass.id });
    state = act(state, 'RENAME_CLASS', { classId: newClass.id, name: 'XI Sains' });
    expect(state.students.find((student) => student.id === STUDENT)).toMatchObject({ name: 'Alya Baru', classId: newClass.id });
    expect(state.progress[STUDENT]).toEqual(oldHistory);
    state = act(state, 'ADD_STUDENT', { name: 'Dara Demo', classId: newClass.id });
    expect(getOverallProgress(state, state.students.at(-1).id).completed).toBe(0);
    state = act(state, 'ADD_CLASS', { name: 'Kelas kosong' });
    const emptyId = state.classes.at(-1).id;
    state = act(state, 'DELETE_CLASS', { classId: emptyId });
    expect(state.classes.some((entry) => entry.id === emptyId)).toBe(false);
  });
});
