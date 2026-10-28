import { useEffect, useState } from 'react';
import { FlaskConical, AlertCircle, X } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import ProfilePicker from './components/ProfilePicker.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import ModulePage from './components/ModulePage.jsx';
import TeacherDashboard from './components/TeacherDashboard.jsx';
import StudentDetail from './components/StudentDetail.jsx';
import HelpPage from './components/HelpPage.jsx';
import { EmptyState } from './components/Common.jsx';
import useDemo from './hooks/useDemo.js';
import useRoute, { navigate } from './hooks/useRoute.js';
import { siteIdentity } from './content/siteContent.js';
import {
  clearAuth,
  findStudentAccount,
  loadAuth,
  saveAuth,
  teacherCredentialsValid,
} from './services/authStorage.js';

function browserStorage() {
  try { return window.localStorage; } catch { return null; }
}

export default function App() {
  const demo = useDemo();
  const route = useRoute();
  const { state, dispatch } = demo;
  const [auth, setAuth] = useState(() => loadAuth(browserStorage(), state));
  const [entryRole, setEntryRole] = useState('student');

  const studentAuthorized = auth?.role === 'student' && state.students.some(student => student.id === auth.studentId);
  const teacherAuthorized = auth?.role === 'teacher';
  const studentRoute = route === '/siswa' || route.startsWith('/belajar/');
  const teacherRoute = route.startsWith('/guru') || route.startsWith('/tinjau/');

  useEffect(() => {
    if (auth?.role === 'student' && !state.students.some(student => student.id === auth.studentId)) {
      clearAuth(browserStorage());
      setAuth(null);
      return;
    }
    if (studentRoute && studentAuthorized) {
      if (state.mode !== 'student') dispatch({ type: 'SET_MODE', mode: 'student' });
      if (state.activeStudentId !== auth.studentId) dispatch({ type: 'SELECT_PROFILE', studentId: auth.studentId });
    } else if (teacherRoute && teacherAuthorized && state.mode !== 'teacher') {
      dispatch({ type: 'SET_MODE', mode: 'teacher' });
    }
  }, [auth, state.students, state.mode, state.activeStudentId, studentRoute, teacherRoute, studentAuthorized, teacherAuthorized, dispatch]);

  const start = () => {
    setEntryRole('student');
    navigate('/demo');
  };

  const studentLogin = (name, className) => {
    const student = findStudentAccount(state, name, className);
    if (!student) return { ok: false, message: 'Akun siswa tidak ditemukan. Periksa nama dan kelas atau daftar akun baru.' };
    if (!dispatch({ type: 'SET_MODE', mode: 'student' }) || !dispatch({ type: 'SELECT_PROFILE', studentId: student.id })) {
      return { ok: false, message: 'Akun ditemukan, tetapi data belajar belum dapat dibuka.' };
    }
    const session = { role: 'student', studentId: student.id };
    saveAuth(browserStorage(), session);
    setAuth(session);
    navigate('/siswa');
    return { ok: true };
  };

  const studentRegister = (name, className) => {
    const result = demo.registerStudent(name, className);
    if (!result.ok) return { ok: false, message: result.message };
    const session = { role: 'student', studentId: result.studentId };
    saveAuth(browserStorage(), session);
    setAuth(session);
    navigate('/siswa');
    return { ok: true };
  };

  const teacherLogin = (username, password) => {
    if (!teacherCredentialsValid(username, password)) {
      return { ok: false, message: 'Username atau password guru salah.' };
    }
    if (!demo.reload() || !dispatch({ type: 'SET_MODE', mode: 'teacher' })) {
      return { ok: false, message: 'Akun benar, tetapi data guru belum dapat dimuat.' };
    }
    const session = { role: 'teacher' };
    saveAuth(browserStorage(), session);
    setAuth(session);
    navigate('/guru');
    return { ok: true };
  };

  const toStudent = () => {
    if (!studentAuthorized) {
      setEntryRole('student');
      navigate('/demo');
      return;
    }
    if (dispatch({ type: 'SET_MODE', mode: 'student' }) && dispatch({ type: 'SELECT_PROFILE', studentId: auth.studentId })) navigate('/siswa');
  };

  const toTeacher = () => {
    if (!teacherAuthorized) {
      setEntryRole('teacher');
      navigate('/demo');
      return;
    }
    if (demo.reload() && dispatch({ type: 'SET_MODE', mode: 'teacher' })) navigate('/guru');
  };

  const openModule = id => {
    if (!studentAuthorized) {
      setEntryRole('student');
      navigate('/demo');
      return;
    }
    if (dispatch({ type: 'SET_MODE', mode: 'student' }) && dispatch({ type: 'SELECT_PROFILE', studentId: auth.studentId })) navigate('/belajar/' + id);
  };

  const reset = () => {
    if (window.confirm('Reset akan menghapus seluruh progres, jawaban, kelas, dan akun siswa pada browser ini. Lanjutkan?') && demo.reset()) {
      clearAuth(browserStorage());
      setAuth(null);
      navigate('/demo');
    }
  };

  const loginPage = <ProfilePicker onStudentLogin={studentLogin} onStudentRegister={studentRegister} onTeacherLogin={teacherLogin} initialView={entryRole} />;

  let page;
  if (demo.blocked && route !== '/' && route !== '/bantuan') page = <section className="page-shell workspace-page"><EmptyState title="Data belajar belum dapat dimuat"><p>Data yang tersimpan belum dapat dibaca dengan aman. Data lama tetap dipertahankan; progres kosong tidak ditampilkan sebagai penggantinya.</p><button className="button button-primary" onClick={demo.reload}>Coba muat ulang data</button><p><a href="#/bantuan">Buka panduan pemulihan dan reset demo</a></p></EmptyState></section>;
  else if (route === '/') page = <HomePage state={demo.blocked || !studentAuthorized ? null : state} onStart={start} onOpenModule={openModule} />;
  else if (route === '/demo') page = loginPage;
  else if (studentRoute && !studentAuthorized) page = loginPage;
  else if (teacherRoute && !teacherAuthorized) page = <ProfilePicker onStudentLogin={studentLogin} onStudentRegister={studentRegister} onTeacherLogin={teacherLogin} initialView="teacher" />;
  else if (route === '/siswa') page = <StudentDashboard state={state} onOpenModule={openModule} onChangeProfile={start} />;
  else if (route.startsWith('/belajar/') || route.startsWith('/tinjau/')) page = <ModulePage key={route} moduleId={route.split('/')[2]} preview={route.startsWith('/tinjau/')} state={state} dispatch={dispatch} />;
  else if (route === '/guru') page = <TeacherDashboard state={state} dispatch={dispatch} onRefresh={demo.reload} />;
  else if (route.startsWith('/guru/siswa/')) page = <StudentDetail state={state} studentId={route.split('/')[3]} />;
  else if (route === '/bantuan') page = <HelpPage onReset={reset} />;
  else page = <section className="page-shell workspace-page"><EmptyState title="Halaman tidak ditemukan"><a className="button button-primary" href="#/">Kembali ke beranda</a></EmptyState></section>;

  return <div className="app-shell app-shell--adventure">
    <a className="skip-link" href="#konten" onClick={e => { e.preventDefault(); document.getElementById('konten')?.focus(); document.getElementById('konten')?.scrollIntoView(); }}>Langsung ke konten</a>
    <Navbar route={route} onStart={start} onStudent={toStudent} onTeacher={toTeacher} />
    <div className="demo-strip"><div className="page-shell"><span><span className="status-dot" /> DATA DEMONSTRASI</span><span>{demo.blocked ? 'Data belum dapat dimuat' : demo.error ? 'Ada perubahan belum tersimpan' : 'Progres disimpan pada browser ini'}</span></div></div>
    {demo.error && <div className="save-alert" role="alert"><AlertCircle size={22} /><div><strong>{demo.blocked ? 'Data belum dapat dimuat' : 'Belum tersimpan'}</strong><p>{typeof demo.error === 'string' ? demo.error : demo.error.message}</p><p>{demo.blocked ? 'Data lama tetap dipertahankan. Anda dapat mencoba memuat ulang atau menggunakan reset di Panduan.' : 'Isian tetap tersedia. Ulangi tombol simpan atau kirim pada kegiatan yang sama.'}</p><button className="text-button" onClick={demo.reload}>Coba muat ulang data</button></div>{!demo.blocked && <button className="icon-button" aria-label="Tutup pesan" onClick={demo.clearError}><X size={18} /></button>}</div>}
    <main id="konten" tabIndex="-1">{page}</main>
    <footer className="site-footer"><div className="page-shell footer-main"><a href="#/" className="footer-brand"><FlaskConical size={23} />{siteIdentity.name}</a><p>Kimia Kelas XI · Kurikulum Merdeka</p><a className="footer-source-button" href="#/bantuan">Panduan & sumber ↗</a></div><div className="page-shell footer-bottom"><span>Ruang untuk mencoba, memahami, dan menghubungkan.</span><span>Prototipe pembelajaran · 2026</span>{(siteIdentity.school || siteIdentity.author) && <span>{[siteIdentity.school, siteIdentity.author].filter(Boolean).join(' · ')}</span>}</div></footer>
  </div>;
}
