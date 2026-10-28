import { useCallback, useRef, useState } from 'react';
import { applyAction } from '../domain/learning.js';
import { loadDemo, saveDemo, resetDemo } from '../services/demoStorage.js';

function browserStorage() {
  try { return window.localStorage; } catch { return null; }
}
export default function useDemo() {
  const [initial] = useState(() => loadDemo(browserStorage()));
  const [state, setState] = useState(initial.state);
  const [error, setError] = useState(initial.error || '');
  const [blocked, setBlocked] = useState(Boolean(initial.blocked));
  const ref = useRef({ state: initial.state, blocked: Boolean(initial.blocked) });

  const commit = useCallback((action) => {
    if (ref.current.blocked) {
      const message = 'Data belum dapat digunakan. Pulihkan penyimpanan atau reset demo secara eksplisit.';
      setError(message);
      return { ok: false, message };
    }
    try {
      const next = applyAction(ref.current.state, action);
      const saved = saveDemo(browserStorage(), next);
      if (!saved.ok) {
        const message = saved.message || 'Belum tersimpan. Silakan coba lagi.';
        setError(message);
        return { ok: false, message };
      }
      ref.current.state = next;
      setState(next);
      setError('');
      return { ok: true, state: next };
    } catch (e) {
      const message = e.message || 'Perubahan belum tersimpan.';
      setError(message);
      return { ok: false, message };
    }
  }, []);

  const dispatch = useCallback((action) => commit(action).ok, [commit]);

  const registerStudent = useCallback((name, className) => {
    const before = new Set(ref.current.state.students.map(student => student.id));
    const result = commit({ type: 'REGISTER_STUDENT', name, className });
    if (!result.ok) return result;
    const student = result.state.students.find(entry => !before.has(entry.id));
    if (!student) return { ok: false, message: 'Akun siswa belum dapat dibuat.' };
    return { ok: true, studentId: student.id };
  }, [commit]);

  const reload = useCallback(() => {
    const loaded = loadDemo(browserStorage());
    ref.current = { state: loaded.state, blocked: Boolean(loaded.blocked) };
    setState(loaded.state); setBlocked(Boolean(loaded.blocked)); setError(loaded.error || '');
    return !loaded.blocked;
  }, []);
  const reset = useCallback(() => {
    const result = resetDemo(browserStorage());
    if (!result.ok) { setError(result.message); return false; }
    ref.current = { state: result.state, blocked: false };
    setState(result.state); setBlocked(false); setError('');
    return true;
  }, []);
  return { state, error, blocked, dispatch, registerStudent, reload, reset, clearError: () => setError('') };
}
