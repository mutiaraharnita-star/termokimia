import { describe, expect, it } from 'vitest';
import { applyAction, createInitialState } from '../src/domain/learning.js';
import { findStudentAccount, teacherCredentialsValid } from '../src/services/authStorage.js';

describe('autentikasi siswa dan guru', () => {
  it('menemukan akun siswa dari nama dan kelas tanpa peka kapitalisasi', () => {
    const state = createInitialState('2026-10-25T00:00:00.000Z');
    const student = findStudentAccount(state, ' alya demo ', 'xi demo');
    expect(student?.id).toBe('student-1');
  });

  it('menolak nama atau kelas siswa yang tidak cocok', () => {
    const state = createInitialState('2026-10-25T00:00:00.000Z');
    expect(findStudentAccount(state, 'Alya Demo', 'XI Tidak Ada')).toBeNull();
    expect(findStudentAccount(state, 'Nama Lain', 'XI Demo')).toBeNull();
  });

  it('mendaftarkan siswa baru dan membuat kelas baru bila diperlukan', () => {
    const initial = createInitialState('2026-10-25T00:00:00.000Z');
    const next = applyAction(initial, {
      type: 'REGISTER_STUDENT',
      name: 'Dina',
      className: 'XI IPA 2',
      at: '2026-10-25T00:00:01.000Z',
    });
    const student = findStudentAccount(next, 'Dina', 'XI IPA 2');
    expect(student).toBeTruthy();
    expect(next.activeStudentId).toBe(student.id);
    expect(next.mode).toBe('student');
    expect(next.progress[student.id]).toEqual({});
  });

  it('menolak pendaftaran ganda pada kombinasi nama dan kelas yang sama', () => {
    const initial = createInitialState('2026-10-25T00:00:00.000Z');
    expect(() => applyAction(initial, {
      type: 'REGISTER_STUDENT',
      name: 'Alya Demo',
      className: 'XI Demo',
      at: '2026-10-25T00:00:01.000Z',
    })).toThrow(/sudah terdaftar/i);
  });

  it('menerima hanya kredensial guru admin / Fisika31', () => {
    expect(teacherCredentialsValid('admin', 'Fisika31')).toBe(true);
    expect(teacherCredentialsValid('ADMIN', 'Fisika31')).toBe(false);
    expect(teacherCredentialsValid('admin', 'fisika31')).toBe(false);
    expect(teacherCredentialsValid('guru', 'Fisika31')).toBe(false);
  });
});
