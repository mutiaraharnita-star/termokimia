import { useState } from 'react';
import { BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';
import { PageHeading } from './Common.jsx';

export default function ProfilePicker({ onStudentLogin, onStudentRegister, onTeacherLogin, initialView = 'student' }) {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerClass, setRegisterClass] = useState('');
  const [username, setUsername] = useState(initialView === 'teacher' ? 'admin' : '');
  const [password, setPassword] = useState('');
  const [studentMessage, setStudentMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [teacherMessage, setTeacherMessage] = useState('');

  const submitStudentLogin = (event) => {
    event.preventDefault();
    const result = onStudentLogin(studentName, studentClass);
    if (!result.ok) setStudentMessage(result.message);
  };
  const submitRegister = (event) => {
    event.preventDefault();
    const result = onStudentRegister(registerName, registerClass);
    if (!result.ok) setRegisterMessage(result.message);
  };
  const submitTeacher = (event) => {
    event.preventDefault();
    const result = onTeacherLogin(username, password);
    if (!result.ok) setTeacherMessage(result.message);
  };

  return <section className="page-shell workspace-page">
    <PageHeading eyebrow="MASUK" title="Masuk ke ruang belajarmu." description="Siswa menggunakan nama dan kelas. Guru menggunakan akun administrator yang sudah ditentukan." />
    <div className="role-grid">
      <article className="panel role-students">
        <div className="panel-icon"><BookOpen size={26} /></div>
        <h2>Masuk siswa</h2>
        <p>Masukkan nama dan kelas yang sama dengan saat akun siswa didaftarkan.</p>
        <form className="profile-list" onSubmit={submitStudentLogin}>
          <label htmlFor="student-login-name">Nama siswa<input id="student-login-name" autoComplete="username" value={studentName} maxLength={100} required onChange={event => { setStudentName(event.target.value); setStudentMessage(''); }} placeholder="Nama siswa" /></label>
          <label htmlFor="student-login-class">Kelas<input id="student-login-class" value={studentClass} maxLength={100} required onChange={event => { setStudentClass(event.target.value); setStudentMessage(''); }} placeholder="Contoh: XI IPA 1" /></label>
          {studentMessage && <p className="report-message" role="alert">{studentMessage}</p>}
          <button className="button button-primary" type="submit">Masuk siswa <ArrowUpRight size={18} /></button>
        </form>
        <hr />
        <h2>Daftar siswa</h2>
        <p>Belum punya akun? Daftarkan nama dan kelas. Setelah berhasil, kamu langsung masuk ke Ruang siswa.</p>
        <form className="profile-list" onSubmit={submitRegister}>
          <label htmlFor="student-register-name">Nama siswa<input id="student-register-name" value={registerName} maxLength={100} required onChange={event => { setRegisterName(event.target.value); setRegisterMessage(''); }} placeholder="Nama siswa" /></label>
          <label htmlFor="student-register-class">Kelas<input id="student-register-class" value={registerClass} maxLength={100} required onChange={event => { setRegisterClass(event.target.value); setRegisterMessage(''); }} placeholder="Contoh: XI IPA 1" /></label>
          {registerMessage && <p className="report-message" role="alert">{registerMessage}</p>}
          <button className="button button-secondary" type="submit">Daftar akun siswa <ArrowUpRight size={18} /></button>
        </form>
      </article>
      <article className="panel role-teacher">
        <div className="panel-icon"><GraduationCap size={28} /></div>
        <h2>Masuk guru</h2>
        <p>Gunakan akun guru untuk memantau siswa, mengelola kelas, dan mengunduh laporan belajar.</p>
        <form className="profile-list" onSubmit={submitTeacher}>
          <label htmlFor="teacher-username">Username<input id="teacher-username" autoComplete="username" value={username} maxLength={100} required onChange={event => { setUsername(event.target.value); setTeacherMessage(''); }} placeholder="Username" /></label>
          <label htmlFor="teacher-password">Password<input id="teacher-password" type="password" autoComplete="current-password" value={password} required onChange={event => { setPassword(event.target.value); setTeacherMessage(''); }} placeholder="Password" /></label>
          {teacherMessage && <p className="report-message" role="alert">{teacherMessage}</p>}
          <button className="button button-primary" type="submit">Masuk guru <ArrowUpRight size={18} /></button>
        </form>
      </article>
    </div>
    <p className="demo-note">Data akun siswa dan progres tersimpan pada browser serta alamat aplikasi yang sama.</p>
  </section>;
}
