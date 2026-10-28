export const AUTH_STORAGE_KEY = 'termokimia-xi:auth:v1';
export const TEACHER_USERNAME = 'admin';
export const TEACHER_PASSWORD = 'Fisika31';

function normalize(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('id-ID');
}

export function loadAuth(storage, state) {
  try {
    if (!storage || typeof storage.getItem !== 'function') return null;
    const raw = storage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session?.role === 'teacher') return { role: 'teacher' };
    if (session?.role === 'student' && state?.students?.some(student => student.id === session.studentId)) {
      return { role: 'student', studentId: session.studentId };
    }
    storage.removeItem(AUTH_STORAGE_KEY);
    return null;
  } catch {
    return null;
  }
}

export function saveAuth(storage, session) {
  try {
    if (!storage || typeof storage.setItem !== 'function') return false;
    const safe = session?.role === 'teacher'
      ? { role: 'teacher' }
      : session?.role === 'student' && session.studentId
        ? { role: 'student', studentId: session.studentId }
        : null;
    if (!safe) return false;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safe));
    return true;
  } catch {
    return false;
  }
}

export function clearAuth(storage) {
  try {
    storage?.removeItem?.(AUTH_STORAGE_KEY);
  } catch {
    // Session lokal boleh gagal dihapus tanpa menyentuh data belajar.
  }
}

export function findStudentAccount(state, name, className) {
  const wantedName = normalize(name);
  const wantedClass = normalize(className);
  if (!wantedName || !wantedClass) return null;
  const classEntry = state.classes.find(entry => normalize(entry.name) === wantedClass);
  if (!classEntry) return null;
  return state.students.find(student => student.classId === classEntry.id && normalize(student.name) === wantedName) || null;
}

export function teacherCredentialsValid(username, password) {
  return String(username ?? '').trim() === TEACHER_USERNAME && String(password ?? '') === TEACHER_PASSWORD;
}
