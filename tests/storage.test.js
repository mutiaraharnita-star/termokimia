import { describe, expect, it, vi } from 'vitest';
import { getModule } from '../src/content/learningContent.js';
import { applyAction, createInitialState, getModuleProgress, getModuleRecord } from '../src/domain/learning.js';
import { loadDemo, resetDemo, saveDemo, STORAGE_KEY } from '../src/services/demoStorage.js';

const initial = () => createInitialState('2026-10-20T00:00:00.000Z');
const act = (state, type, extra = {}) => applyAction(state, { type, studentId: 'student-1', moduleId: 'M1', ...extra });

function memoryStorage(raw = null) {
  const data = new Map();
  if (raw !== null) data.set(STORAGE_KEY, raw);
  return {
    getItem: vi.fn((key) => data.get(key) ?? null),
    setItem: vi.fn((key, value) => data.set(key, String(value))),
  };
}

function partialQuiz(count = 1) {
  let state = act(initial(), 'START_QUIZ');
  for (const question of getModule('M1').questions.slice(0, count)) {
    state = act(state, 'ANSWER_QUIZ', { questionId: question.id, optionIndex: question.answerIndex });
  }
  return state;
}

describe('penyimpanan demo lokal yang gagal secara aman', () => {
  it('membaca penyimpanan kosong tanpa membuat data atau progres palsu', () => {
    const storage = memoryStorage();
    const loaded = loadDemo(storage);
    expect(loaded).toMatchObject({ error: null, blocked: false });
    expect(loaded.state.schemaVersion).toBe(2);
    expect(getModuleProgress(loaded.state, 'student-1', 'M1').completed).toBe(0);
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('menyimpan dan melanjutkan kuis parsial beserta jawaban terkunci setelah muat ulang', () => {
    const storage = memoryStorage();
    const state = partialQuiz(3);
    expect(saveDemo(storage, state).ok).toBe(true);
    const loaded = loadDemo(storage);
    expect(loaded).toMatchObject({ error: null, blocked: false });
    expect(loaded.state).toEqual(state);
    expect(getModuleProgress(loaded.state, 'student-1', 'M1')).toMatchObject({
      answered: 3, firstScore: null, activeAttempt: { score: null, number: 1 },
    });
    const question = getModule('M1').questions[0];
    expect(() => act(loaded.state, 'ANSWER_QUIZ', {
      questionId: question.id, optionIndex: (question.answerIndex + 1) % 4,
    })).toThrow(/terkunci/);
  });

  it.each([
    '{json rusak',
    'null',
    JSON.stringify({ ...createInitialState(), schemaVersion: 99 }),
    JSON.stringify({ ...createInitialState(), contentVersion: '3.0' }),
    JSON.stringify({ ...createInitialState(), activeStudentId: 'tidak-ada' }),
  ])('memblokir data tidak valid tanpa menimpa data asal: %s', (raw) => {
    const storage = memoryStorage(raw);
    expect(loadDemo(storage)).toMatchObject({ blocked: true, error: expect.any(String) });
    expect(saveDemo(storage, initial()).ok).toBe(false);
    expect(storage.getItem(STORAGE_KEY)).toBe(raw);
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('menolak nilai kuis dan hasil simulasi yang berubah tanpa perhitungan yang sah', () => {
    const alteredQuiz = partialQuiz();
    const answer = Object.values(getModuleRecord(alteredQuiz, 'student-1', 'M1').attempts[0].answers)[0];
    answer.correct = false;
    const alteredSimulation = act(initial(), 'RUN_SIMULATION', { inputs: { productH: -50 } });
    getModuleRecord(alteredSimulation, 'student-1', 'M1').simulation.result.deltaH = 999;
    const missingMember = initial();
    missingMember.students[0].classId = 'kelas-hilang';
    const skippedUnlock = partialQuiz();
    skippedUnlock.progress['student-1'].M2 = {
      items: { 'M2-MAT01': { completedAt: skippedUnlock.updatedAt } },
      caseResponse: null, simulation: null, attempts: [],
    };
    for (const state of [alteredQuiz, alteredSimulation, missingMember, skippedUnlock]) {
      const storage = memoryStorage(JSON.stringify(state));
      expect(loadDemo(storage).blocked).toBe(true);
      expect(saveDemo(memoryStorage(), state).ok).toBe(false);
    }
  });

  it('menyimpan ulang hasil simulasi dan catatan opsional secara konsisten', () => {
    const storage = memoryStorage();
    let state = act(initial(), 'RUN_SIMULATION', { inputs: { productH: '-50,5' } });
    state = act(state, 'SAVE_NOTE', { note: '' });
    state = act(state, 'SAVE_CASE', { responses: ['Sistem reaksi.', 'Kalor dilepaskan.'] });
    expect(saveDemo(storage, state).ok).toBe(true);
    expect(loadDemo(storage).state).toEqual(state);
  });

  it('kegagalan baca, tulis, dan akses properti storage tidak merusak data lama atau melempar ke UI', () => {
    const state = initial();
    const raw = JSON.stringify(state);
    const failedRead = { getItem() { throw new Error('SecurityError'); }, setItem: vi.fn() };
    expect(loadDemo(failedRead).blocked).toBe(true);
    expect(saveDemo(failedRead, state).ok).toBe(false);
    expect(failedRead.setItem).not.toHaveBeenCalled();
    const failedWrite = memoryStorage(raw);
    failedWrite.setItem.mockImplementation(() => { throw new Error('QuotaExceededError'); });
    expect(saveDemo(failedWrite, partialQuiz()).ok).toBe(false);
    expect(failedWrite.getItem(STORAGE_KEY)).toBe(raw);
    const getterThrows = {
      get getItem() { throw new Error('SecurityError'); },
      get setItem() { throw new Error('SecurityError'); },
    };
    expect(loadDemo(getterThrows).blocked).toBe(true);
    expect(saveDemo(getterThrows, state).ok).toBe(false);
    expect(resetDemo(getterThrows).ok).toBe(false);
    expect(loadDemo(null).blocked).toBe(true);
    expect(saveDemo(null, state).ok).toBe(false);
  });

  it('reset eksplisit memulihkan data rusak, sedangkan reset gagal mempertahankan data lama', () => {
    const storage = memoryStorage('{rusak');
    const reset = resetDemo(storage);
    expect(reset).toMatchObject({ ok: true, state: { schemaVersion: 2, contentVersion: '2.0' } });
    expect(loadDemo(storage).blocked).toBe(false);
    expect(loadDemo(storage).state).toEqual(reset.state);
    const failed = memoryStorage('{rusak');
    failed.setItem.mockImplementation(() => { throw new Error('disk penuh'); });
    expect(resetDemo(failed)).toMatchObject({ ok: false, state: null });
    expect(failed.getItem(STORAGE_KEY)).toBe('{rusak');
  });
});
