import { modules } from '../content/learningContent.js';
import {
  CONTENT_VERSION,
  SCHEMA_VERSION,
  calculateModuleSimulation,
  createInitialState,
  getModuleProgress,
} from '../domain/learning.js';

export const STORAGE_KEY = 'termokimia-xi:demo:v2';

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function date(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function text(value, maximum = 1000) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maximum;
}

function assert(condition) {
  if (!condition) throw new Error('Struktur data demo tidak valid.');
}

function validId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}$/.test(value);
}

function assertValidState(state) {
  assert(object(state));
  if (state.schemaVersion !== SCHEMA_VERSION || state.contentVersion !== CONTENT_VERSION) {
    throw new Error('Versi data atau konten belum didukung.');
  }
  assert(date(state.updatedAt) && ['student', 'teacher'].includes(state.mode));
  assert(Array.isArray(state.classes) && state.classes.length > 0);
  assert(Array.isArray(state.students) && state.students.length > 0);
  assert(object(state.progress));

  const classIds = new Set();
  for (const entry of state.classes) {
    assert(object(entry) && validId(entry.id) && text(entry.name, 100) && !classIds.has(entry.id));
    classIds.add(entry.id);
  }
  const studentIds = new Set();
  for (const student of state.students) {
    assert(object(student) && validId(student.id) && text(student.name, 100));
    assert(classIds.has(student.classId) && !studentIds.has(student.id));
    studentIds.add(student.id);
  }
  assert(studentIds.has(state.activeStudentId));

  for (const [studentId, studentProgress] of Object.entries(state.progress)) {
    assert(studentIds.has(studentId) && object(studentProgress));
    for (const [moduleId, record] of Object.entries(studentProgress)) {
      const module = modules.find((entry) => entry.id === moduleId);
      assert(module && object(record) && object(record.items) && Array.isArray(record.attempts));
      for (const [itemId, item] of Object.entries(record.items)) {
        assert(module.items.some((entry) => entry.id === itemId) && object(item) && date(item.completedAt));
      }

      const caseItem = module.items.find((entry) => entry.type === 'case');
      const simulationItem = module.items.find((entry) => entry.type === 'simulation');
      const quizItem = module.items.find((entry) => entry.type === 'quiz');
      assert(caseItem && simulationItem && quizItem);

      if (record.caseResponse !== null) {
        const response = record.caseResponse;
        assert(object(response) && Array.isArray(response.responses) && response.responses.length === 2);
        assert(response.responses.every((value) => text(value)));
        assert(date(response.completedAt) && date(response.updatedAt));
      }
      assert(Boolean(record.items[caseItem.id]) === Boolean(record.caseResponse));

      if (record.simulation !== null) {
        const simulation = record.simulation;
        assert(object(simulation) && Number.isInteger(simulation.runs) && simulation.runs >= 1);
        assert(date(simulation.firstRunAt) && date(simulation.lastRunAt));
        assert(!simulation.updatedAt || date(simulation.updatedAt));
        assert(typeof simulation.note === 'string' && simulation.note.trim().length <= 1000);
        assert(object(simulation.inputs) && object(simulation.result));
        const expected = calculateModuleSimulation(moduleId, simulation.inputs);
        assert(JSON.stringify(simulation.result) === JSON.stringify(expected));
      }
      assert(Boolean(record.items[simulationItem.id]) === Boolean(record.simulation));

      const attemptIds = new Set();
      let activeCount = 0;
      let completedCount = 0;
      for (const [index, attempt] of record.attempts.entries()) {
        assert(object(attempt) && validId(attempt.id) && !attemptIds.has(attempt.id));
        assert(attempt.number === index + 1 && date(attempt.startedAt) && object(attempt.answers));
        assert(['active', 'completed'].includes(attempt.status));
        attemptIds.add(attempt.id);
        for (const [questionId, answer] of Object.entries(attempt.answers)) {
          const question = module.questions.find((entry) => entry.id === questionId);
          assert(question && object(answer));
          assert(Number.isInteger(answer.optionIndex) && answer.optionIndex >= 0 && answer.optionIndex < question.options.length);
          assert(answer.correct === (answer.optionIndex === question.answerIndex) && date(answer.submittedAt));
        }
        const answered = Object.keys(attempt.answers).length;
        if (attempt.status === 'active') {
          activeCount += 1;
          assert(index === record.attempts.length - 1 && answered < module.questions.length);
          assert(attempt.score === null && attempt.completedAt === null);
        } else {
          completedCount += 1;
          assert(answered === module.questions.length && date(attempt.completedAt));
          const correct = Object.values(attempt.answers).filter((answer) => answer.correct).length;
          assert(attempt.score === 100 * correct / module.questions.length);
        }
      }
      assert(activeCount <= 1);
      assert(Boolean(record.items[quizItem.id]) === (completedCount > 0));
      const hasActivity = Object.keys(record.items).length > 0 || record.attempts.length > 0;
      if (hasActivity) assert(!getModuleProgress(state, studentId, moduleId).isLocked);
    }
  }
}

export function loadDemo(storage) {
  const fallback = createInitialState();
  try {
    if (!storage || typeof storage.getItem !== 'function') {
      return {
        state: fallback,
        error: 'Penyimpanan browser tidak tersedia. Data belum dapat disimpan.',
        blocked: true,
      };
    }
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return { state: fallback, error: null, blocked: false };
    let state;
    try {
      state = JSON.parse(raw);
      assertValidState(state);
    } catch (error) {
      return {
        state: fallback,
        error: 'Data lama tidak dapat dibaca: ' + error.message + ' Data lama tetap disimpan; gunakan reset hanya jika ingin memulai ulang.',
        blocked: true,
      };
    }
    return { state, error: null, blocked: false };
  } catch {
    return {
      state: fallback,
      error: 'Penyimpanan browser tidak dapat diakses. Data lama tidak diubah.',
      blocked: true,
    };
  }
}

export function saveDemo(storage, state) {
  try {
    if (!storage || typeof storage.setItem !== 'function') {
      return { ok: false, message: 'Belum tersimpan. Penyimpanan browser tidak tersedia.' };
    }
    try {
      assertValidState(state);
    } catch {
      return { ok: false, message: 'Belum tersimpan. Struktur atau versi data tidak valid.' };
    }
    const previous = loadDemo(storage);
    if (previous.blocked) {
      return { ok: false, message: 'Belum tersimpan. ' + previous.error };
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true, message: 'Perubahan tersimpan pada browser ini.' };
  } catch {
    return { ok: false, message: 'Belum tersimpan. Penyimpanan browser gagal; coba lagi.' };
  }
}

export function resetDemo(storage) {
  const state = createInitialState();
  try {
    if (!storage || typeof storage.setItem !== 'function') {
      return { ok: false, state: null, message: 'Reset gagal. Penyimpanan browser tidak tersedia.' };
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true, state, message: 'Data demonstrasi telah direset pada browser ini.' };
  } catch {
    return { ok: false, state: null, message: 'Reset gagal. Data lama tidak diubah.' };
  }
}
