import { modules, getModule } from '../content/learningContent.js';
import { calculateCalorimetry, calculateEnthalpy, calculateHess } from './chemistry.js';

export const SCHEMA_VERSION = 2;
export const CONTENT_VERSION = '2.0';

function emptyRecord() {
  return { items: {}, caseResponse: null, simulation: null, attempts: [] };
}

function isoTime(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error('Waktu perubahan tidak valid.');
  return date.toISOString();
}

export function createInitialState(at = new Date().toISOString()) {
  return {
    schemaVersion: SCHEMA_VERSION,
    contentVersion: CONTENT_VERSION,
    classes: [{ id: 'class-1', name: 'XI Demo' }],
    students: [
      { id: 'student-1', name: 'Alya Demo', classId: 'class-1' },
      { id: 'student-2', name: 'Bima Demo', classId: 'class-1' },
      { id: 'student-3', name: 'Citra Demo', classId: 'class-1' },
    ],
    activeStudentId: 'student-1',
    mode: 'student',
    updatedAt: isoTime(at),
    progress: { 'student-1': {}, 'student-2': {}, 'student-3': {} },
  };
}

function requireModule(moduleId) {
  const module = getModule(moduleId);
  if (!module) throw new Error('Modul tidak ditemukan.');
  return module;
}

function requireStudent(state, studentId) {
  const student = state.students.find((entry) => entry.id === studentId);
  if (!student) throw new Error('Profil siswa tidak ditemukan.');
  return student;
}

function requireClass(state, classId) {
  const item = state.classes.find((entry) => entry.id === classId);
  if (!item) throw new Error('Kelas tidak ditemukan.');
  return item;
}

function validText(value, label, maximum) {
  if (typeof value !== 'string') throw new Error(label + ' harus berupa teks.');
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maximum) {
    throw new Error(label + ' harus berisi 1–' + maximum + ' karakter.');
  }
  return trimmed;
}

function normalizedKey(value) {
  return String(value).trim().replace(/\s+/g, ' ').toLocaleLowerCase('id-ID');
}

export function getModuleRecord(state, studentId, moduleId) {
  requireStudent(state, studentId);
  requireModule(moduleId);
  return state.progress[studentId]?.[moduleId] || emptyRecord();
}

function basicProgress(state, studentId, module) {
  const record = getModuleRecord(state, studentId, module.id);
  const completedAttempts = record.attempts.filter((attempt) => attempt.status === 'completed');
  const completed = module.items.filter((item) => {
    if (item.type === 'quiz') return completedAttempts.length > 0;
    if (item.type === 'case') return Boolean(record.caseResponse?.completedAt);
    if (item.type === 'simulation') return Boolean(record.simulation?.runs >= 1);
    return Boolean(record.items[item.id]?.completedAt);
  }).length;
  const activeAttempt = record.attempts.find((attempt) => attempt.status === 'active') || null;
  const lastAttempt = record.attempts.at(-1) || null;
  const shownAttempt = activeAttempt || lastAttempt;
  return {
    completed,
    total: module.items.length,
    percent: Number((100 * completed / module.items.length).toFixed(1)),
    isComplete: completed === module.items.length,
    answered: shownAttempt ? Object.keys(shownAttempt.answers).length : 0,
    firstScore: completedAttempts[0]?.score ?? null,
    latestScore: completedAttempts.at(-1)?.score ?? null,
    activeAttempt,
    lastAttempt,
    attempts: record.attempts,
    started: completed > 0 || record.attempts.length > 0,
  };
}

export function getModuleProgress(state, studentId, moduleId) {
  const module = requireModule(moduleId);
  requireStudent(state, studentId);
  const progress = basicProgress(state, studentId, module);
  const moduleIndex = modules.findIndex((entry) => entry.id === module.id);
  const isLocked = modules.slice(0, moduleIndex).some((earlier) => !basicProgress(state, studentId, earlier).isComplete);
  return {
    ...progress,
    isLocked,
    status: isLocked ? 'locked' : progress.isComplete ? 'completed' : progress.started ? 'in_progress' : 'not_started',
  };
}

export function getOverallProgress(state, studentId) {
  requireStudent(state, studentId);
  const parts = modules.map((module) => basicProgress(state, studentId, module));
  const completed = parts.reduce((total, part) => total + part.completed, 0);
  const total = parts.reduce((sum, part) => sum + part.total, 0);
  return {
    completed,
    total,
    percent: Number((100 * completed / total).toFixed(1)),
    completedModules: parts.filter((part) => part.isComplete).length,
    totalModules: modules.length,
    isComplete: completed === total,
  };
}

export function calculateModuleSimulation(moduleId, inputs) {
  if (moduleId === 'M1') return calculateEnthalpy(inputs);
  if (moduleId === 'M2') return calculateCalorimetry(inputs);
  if (moduleId === 'M3') return calculateHess(inputs);
  throw new Error('Simulasi tidak ditemukan.');
}

function recordForWrite(state, studentId, moduleId) {
  state.progress[studentId] ||= {};
  state.progress[studentId][moduleId] ||= emptyRecord();
  return state.progress[studentId][moduleId];
}

function completeItem(record, itemId, at) {
  record.items[itemId] ||= { completedAt: at };
}

function itemByType(module, type) {
  const item = module.items.find((entry) => entry.type === type);
  if (!item) throw new Error('Kegiatan modul belum tersedia.');
  return item;
}

function requireTeacher(state) {
  if (state.mode !== 'teacher') throw new Error('Gunakan mode Guru untuk mengelola kelas.');
}

function actionTime(state, action) {
  const proposed = new Date(action.at ?? Date.now()).getTime();
  if (!Number.isFinite(proposed)) throw new Error('Waktu perubahan tidak valid.');
  return new Date(Math.max(proposed, Date.parse(state.updatedAt) + 1)).toISOString();
}

function newId(prefix, at, existing) {
  const stem = prefix + '-' + at.replace(/\D/g, '');
  let id = stem;
  let suffix = 1;
  while (existing.some((item) => item.id === id)) id = stem + '-' + suffix++;
  return id;
}

export function applyAction(state, action) {
  if (!state || state.schemaVersion !== SCHEMA_VERSION || state.contentVersion !== CONTENT_VERSION) {
    throw new Error('Versi data demo tidak didukung.');
  }
  if (!action || typeof action.type !== 'string') throw new Error('Tindakan tidak valid.');

  if (action.type === 'REGISTER_STUDENT') {
    const at = actionTime(state, action);
    const name = validText(action.name, 'Nama siswa', 100);
    const className = validText(action.className, 'Nama kelas', 100);
    const normalizedName = normalizedKey(name);
    const normalizedClass = normalizedKey(className);
    const existingClass = state.classes.find((entry) => normalizedKey(entry.name) === normalizedClass);
    if (existingClass && state.students.some((student) => student.classId === existingClass.id && normalizedKey(student.name) === normalizedName)) {
      throw new Error('Akun siswa dengan nama dan kelas tersebut sudah terdaftar. Gunakan Masuk siswa.');
    }
    const next = structuredClone(state);
    let classId = existingClass?.id;
    if (!classId) {
      classId = newId('class', at, state.classes);
      next.classes.push({ id: classId, name: className });
    }
    const id = newId('student', at, state.students);
    next.students.push({ id, name, classId });
    next.progress[id] = {};
    next.activeStudentId = id;
    next.mode = 'student';
    next.updatedAt = at;
    return next;
  }
  if (action.type === 'SELECT_PROFILE') {
    requireStudent(state, action.studentId);
    if (state.activeStudentId === action.studentId) return state;
    return { ...state, activeStudentId: action.studentId, updatedAt: actionTime(state, action) };
  }
  if (action.type === 'SET_MODE') {
    if (!['student', 'teacher'].includes(action.mode)) throw new Error('Mode demo tidak valid.');
    if (state.mode === action.mode) return state;
    return { ...state, mode: action.mode, updatedAt: actionTime(state, action) };
  }

  const administrativeActions = ['ADD_CLASS', 'RENAME_CLASS', 'DELETE_CLASS', 'ADD_STUDENT', 'UPDATE_STUDENT'];
  if (administrativeActions.includes(action.type)) {
    requireTeacher(state);
    const at = actionTime(state, action);
    const next = structuredClone(state);
    if (action.type === 'ADD_CLASS') {
      const name = validText(action.name, 'Nama kelas', 100);
      if (state.classes.some((entry) => normalizedKey(entry.name) === normalizedKey(name))) throw new Error('Nama kelas sudah digunakan.');
      next.classes.push({ id: newId('class', at, state.classes), name });
    } else if (action.type === 'RENAME_CLASS') {
      requireClass(state, action.classId);
      const name = validText(action.name, 'Nama kelas', 100);
      if (state.classes.some((entry) => entry.id !== action.classId && normalizedKey(entry.name) === normalizedKey(name))) throw new Error('Nama kelas sudah digunakan.');
      next.classes.find((item) => item.id === action.classId).name = name;
    } else if (action.type === 'DELETE_CLASS') {
      requireClass(state, action.classId);
      if (state.students.some((student) => student.classId === action.classId)) {
        throw new Error('Pindahkan semua siswa sebelum menghapus kelas ini.');
      }
      next.classes = next.classes.filter((item) => item.id !== action.classId);
    } else if (action.type === 'ADD_STUDENT') {
      requireClass(state, action.classId);
      const name = validText(action.name, 'Nama siswa', 100);
      if (state.students.some((student) => student.classId === action.classId && normalizedKey(student.name) === normalizedKey(name))) {
        throw new Error('Akun siswa dengan nama tersebut sudah ada di kelas ini.');
      }
      const id = newId('student', at, state.students);
      next.students.push({ id, name, classId: action.classId });
      next.progress[id] = {};
    } else {
      const original = requireStudent(state, action.studentId);
      const name = validText(action.name ?? original.name, 'Nama siswa', 100);
      const classId = action.classId ?? original.classId;
      requireClass(state, classId);
      if (state.students.some((student) => student.id !== original.id && student.classId === classId && normalizedKey(student.name) === normalizedKey(name))) {
        throw new Error('Akun siswa dengan nama tersebut sudah ada di kelas ini.');
      }
      Object.assign(next.students.find((student) => student.id === original.id), { name, classId });
    }
    next.updatedAt = at;
    return next;
  }

  const learningActions = ['COMPLETE_ITEM', 'SAVE_CASE', 'RUN_SIMULATION', 'SAVE_NOTE', 'START_QUIZ', 'ANSWER_QUIZ'];
  if (!learningActions.includes(action.type)) throw new Error('Tindakan belum dikenal.');
  requireStudent(state, action.studentId);
  if (state.mode !== 'student' || state.activeStudentId !== action.studentId) {
    throw new Error('Pilih profil siswa yang sesuai untuk menyimpan kegiatan belajar.');
  }
  const module = requireModule(action.moduleId);
  if (getModuleProgress(state, action.studentId, action.moduleId).isLocked) {
    throw new Error('Modul masih terkunci. Selesaikan seluruh kegiatan modul sebelumnya.');
  }
  const original = getModuleRecord(state, action.studentId, action.moduleId);
  const at = actionTime(state, action);
  const next = structuredClone(state);
  const record = recordForWrite(next, action.studentId, action.moduleId);

  if (action.type === 'COMPLETE_ITEM') {
    const item = module.items.find((entry) => entry.id === action.itemId);
    if (!item || !['material', 'example', 'video'].includes(item.type)) {
      throw new Error('Item ini harus diselesaikan melalui aktivitasnya.');
    }
    if (original.items[item.id]?.completedAt) return state;
    completeItem(record, item.id, at);
  } else if (action.type === 'SAVE_CASE') {
    if (!Array.isArray(action.responses) || action.responses.length !== 2) {
      throw new Error('Jawab kedua pertanyaan kasus.');
    }
    const responses = action.responses.map((value, index) => validText(value, 'Jawaban ' + (index + 1), 1000));
    record.caseResponse = {
      responses,
      completedAt: original.caseResponse?.completedAt || at,
      updatedAt: at,
    };
    completeItem(record, itemByType(module, 'case').id, at);
  } else if (action.type === 'RUN_SIMULATION') {
    const result = calculateModuleSimulation(module.id, action.inputs);
    record.simulation = {
      runs: (original.simulation?.runs || 0) + 1,
      firstRunAt: original.simulation?.firstRunAt || at,
      lastRunAt: at,
      updatedAt: at,
      inputs: result.inputs,
      result,
      note: original.simulation?.note || '',
    };
    completeItem(record, itemByType(module, 'simulation').id, at);
  } else if (action.type === 'SAVE_NOTE') {
    if (!original.simulation?.runs) throw new Error('Jalankan simulasi sebelum menyimpan catatan.');
    if (typeof action.note !== 'string' || action.note.trim().length > 1000) {
      throw new Error('Catatan dapat dikosongkan atau diisi maksimal 1.000 karakter.');
    }
    record.simulation.note = action.note.trim();
    record.simulation.updatedAt = at;
  } else if (action.type === 'START_QUIZ') {
    if (original.attempts.some((attempt) => attempt.status === 'active')) return state;
    const number = original.attempts.length + 1;
    record.attempts.push({
      id: action.studentId + '-' + module.id + '-attempt-' + number,
      number,
      status: 'active',
      answers: {},
      score: null,
      startedAt: at,
      completedAt: null,
    });
  } else {
    const question = module.questions.find((entry) => entry.id === action.questionId);
    if (!question) throw new Error('Soal tidak ditemukan pada modul ini.');
    if (!Number.isInteger(action.optionIndex) || action.optionIndex < 0 || action.optionIndex >= question.options.length) {
      throw new Error('Pilih salah satu jawaban yang tersedia.');
    }
    const active = record.attempts.find((attempt) => attempt.status === 'active');
    if (!active) {
      const lastAnswer = original.attempts.at(-1)?.answers[action.questionId];
      if (lastAnswer && lastAnswer.optionIndex === action.optionIndex) return state;
      throw new Error('Mulai atau ulangi kuis sebelum mengirim jawaban.');
    }
    const previous = active.answers[question.id];
    if (previous) {
      if (previous.optionIndex === action.optionIndex) return state;
      throw new Error('Jawaban telah diperiksa dan terkunci untuk percobaan ini.');
    }
    active.answers[question.id] = {
      optionIndex: action.optionIndex,
      correct: action.optionIndex === question.answerIndex,
      submittedAt: at,
    };
    if (module.questions.every((entry) => active.answers[entry.id])) {
      active.status = 'completed';
      active.score = 100 * Object.values(active.answers).filter((answer) => answer.correct).length / module.questions.length;
      active.completedAt = at;
      completeItem(record, itemByType(module, 'quiz').id, at);
    }
  }
  next.updatedAt = at;
  return next;
}
