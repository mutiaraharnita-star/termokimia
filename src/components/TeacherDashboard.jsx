import { formatDate } from '../services/format.js';
import { useState } from 'react';
import { Download, Eye, Plus, RefreshCw, Users, School, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { modules } from '../content/learningContent.js';
import { getModuleProgress, getOverallProgress } from '../domain/learning.js';
import { downloadReport } from '../services/reports.js';
import { PageHeading, StatusBadge, ProgressBar } from './Common.jsx';
function StudentEditor({ student, classes, dispatch }) {
  const [name, setName] = useState(student.name);
  const [classId, setClassId] = useState(student.classId);
  const [saved, setSaved] = useState(false);
  return <form className="student-edit-row" onSubmit={e => { e.preventDefault(); if (dispatch({ type: 'UPDATE_STUDENT', studentId: student.id, name, classId })) setSaved(true); }}><label>Nama fiktif<input value={name} maxLength={80} required onChange={e => { setName(e.target.value); setSaved(false); }} /></label><label>Kelas<select value={classId} onChange={e => { setClassId(e.target.value); setSaved(false); }}>{classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><button className="button button-secondary" type="submit"><Pencil size={15} />{saved ? 'Tersimpan' : 'Simpan profil'}</button></form>;
}
function ClassManager({ state, classId, dispatch, onSelect }) {
  const current = state.classes.find(c => c.id === classId);
  const [newClass, setNewClass] = useState('');
  const [rename, setRename] = useState(current?.name || '');
  const [studentName, setStudentName] = useState('');
  const [feedback, setFeedback] = useState('');
  return <details className="class-manager"><summary><School size={20} /><span>Kelola kelas dan akun siswa</span><Plus size={17} /></summary><div className="class-manager-content">
    <div className="management-grid"><form onSubmit={e => { e.preventDefault(); if (dispatch({ type: 'ADD_CLASS', name: newClass })) { setNewClass(''); setFeedback('Kelas baru ditambahkan. Pilih melalui daftar kelas.'); } }}><label htmlFor="new-class">Buat kelas baru<input id="new-class" value={newClass} maxLength={80} required onChange={e => setNewClass(e.target.value)} placeholder="Contoh: XI B Demo" /></label><button className="button button-secondary" type="submit"><Plus size={16} />Tambah kelas</button></form>
    {current && <form onSubmit={e => { e.preventDefault(); if (dispatch({ type: 'RENAME_CLASS', classId, name: rename })) setFeedback('Nama kelas diperbarui.'); }}><label htmlFor="rename-class">Nama kelas terpilih<input id="rename-class" value={rename} maxLength={80} required onChange={e => setRename(e.target.value)} /></label><button className="button button-secondary" type="submit"><Pencil size={15} />Ubah nama kelas</button></form>}
    {current && <form onSubmit={e => { e.preventDefault(); if (dispatch({ type: 'ADD_STUDENT', name: studentName, classId })) { setStudentName(''); setFeedback('Akun siswa ditambahkan.'); } }}><label htmlFor="new-student">Tambah siswa ke kelas ini<input id="new-student" value={studentName} maxLength={80} required onChange={e => setStudentName(e.target.value)} placeholder="Nama siswa" /></label><button className="button button-secondary" type="submit"><Plus size={16} />Tambah siswa</button></form>}</div>
    {feedback && <p className="saved-label" role="status">{feedback}</p>}
    {state.students.filter(s => s.classId === classId).map(s => <StudentEditor key={s.id} student={s} classes={state.classes} dispatch={dispatch} />)}
    {current && <div className="delete-class-row"><p>Pindahkan semua siswa sebelum menghapus kelas. Riwayat belajar mengikuti profil siswa.</p><button className="button button-danger" disabled={state.students.some(s => s.classId === classId)} onClick={() => { if (window.confirm('Hapus kelas kosong ' + current.name + '?') && dispatch({ type: 'DELETE_CLASS', classId })) onSelect(''); }}><Trash2 size={15} />Hapus kelas kosong</button></div>}
  </div></details>;
}
export default function TeacherDashboard({ state, dispatch, onRefresh }) {
  const [selected, setSelected] = useState(state.classes[0]?.id || '');
  const [message, setMessage] = useState('');
  const classId = state.classes.some(c => c.id === selected) ? selected : state.classes[0]?.id || '';
  const students = state.students.filter(s => s.classId === classId);
  const doneModules = students.reduce((n, s) => n + getOverallProgress(state, s.id).completedModules, 0);
  const mean = students.length ? Math.round(students.reduce((n, s) => n + getOverallProgress(state, s.id).percent, 0) / students.length) : 0;
  const currentClass = state.classes.find(c => c.id === classId);
  const exportReport = type => {
    try { downloadReport(type, state, classId); setMessage('Laporan ' + currentClass?.name + ' siap diunduh.'); }
    catch (e) { setMessage(e.message); }
  };
  return <section className="page-shell workspace-page teacher-page">
    <PageHeading eyebrow="RUANG GURU" title="Lihat proses, pahami kemajuannya." description="Pantau kegiatan setiap siswa dan gunakan hasilnya untuk mendampingi pembelajaran."><button className="button button-secondary" onClick={() => { const ok = onRefresh(); setMessage(ok ? 'Data dimuat ulang dari browser ini.' : 'Data belum dapat dimuat ulang. Periksa pesan penyimpanan.'); }}><RefreshCw size={17} />Perbarui</button></PageHeading>
    <div className="teacher-toolbar"><label htmlFor="selected-class"><School size={18} />Kelas<select id="selected-class" value={classId} onChange={e => { const nextClass = e.target.value; const ok = onRefresh(); setSelected(nextClass); setMessage(ok ? '' : 'Data belum dapat dimuat ulang. Periksa pesan penyimpanan.'); }}>{state.classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><span>Diperbarui {formatDate(state.updatedAt)} WIB</span></div>
    <div className="teacher-stats"><article><Users size={22} /><span>Profil siswa</span><strong>{students.length}</strong></article><article><BookIcon /><span>Modul selesai</span><strong>{doneModules}<small> / {students.length * 3}</small></strong></article><article><RefreshCw size={22} /><span>Rata-rata progres kegiatan</span><strong>{mean}<small>%</small></strong></article></div>
    <section className="teacher-results"><div className="section-topline"><h2>Perkembangan siswa</h2><span>{currentClass?.name || 'Belum ada kelas'}</span></div>
      {students.length ? <div className="student-records">{students.map(student => { const overall = getOverallProgress(state, student.id); return <article className="student-record" key={student.id}><div className="student-record-heading"><div className="student-name"><span className="avatar">{student.name[0]}</span><div><h3>{student.name}</h3><span>{currentClass.name}</span></div></div><a href={'#/guru/siswa/' + student.id} className="text-button">Lihat detail <ArrowUpRight size={17} /></a></div><div className="student-module-grid">{modules.map(m => { const p = getModuleProgress(state, student.id, m.id); return <div className="student-module-cell" key={m.id}><span className="section-eyebrow">{m.id} · {m.title}</span><StatusBadge status={p.status} /><ProgressBar value={p.percent} label={p.completed + '/9 kegiatan'} /><p>Nilai pertama <strong>{p.firstScore ?? '—'}</strong> · terakhir <strong>{p.latestScore ?? '—'}</strong></p><small>{p.activeAttempt ? p.answered + '/5 soal pada kuis aktif' : 'Tidak ada kuis aktif'}</small></div>; })}</div><div className="student-record-footer"><span>Progres keseluruhan</span><strong>{overall.completed}/27 kegiatan · {Math.round(overall.percent)}%</strong></div></article>; })}</div> : <div className="empty-state"><h3>Belum ada siswa di kelas ini.</h3><p>Tambahkan akun siswa melalui Kelola kelas di bawah.</p></div>}
    </section>
    <section className="report-section"><div className="section-topline"><h2>Unduh laporan kelas</h2><span>Cakupan: {currentClass?.name || 'Pilih kelas'}</span></div><div className="report-grid">{[{ type: 'summary', title: 'Rekap belajar', description: 'Nama, kelas, progres, dan nilai tiap modul.' }, { type: 'answers', title: 'Rincian jawaban kuis', description: 'Setiap percobaan, jawaban, kunci, dan status benar/salah.' }, { type: 'activities', title: 'Catatan aktivitas', description: 'Respons kasus, hasil simulasi terakhir, dan catatan opsional.' }].map(report => <article className="report-card" key={report.type}><Download size={23} /><h3>{report.title}</h3><p>{report.description}</p><button className="button button-secondary" disabled={!classId} onClick={() => exportReport(report.type)}>Unduh CSV <Download size={16} /></button></article>)}</div>{message && <p className="report-message" role="status">{message}</p>}</section>
    <ClassManager key={classId} state={state} classId={classId} dispatch={dispatch} onSelect={setSelected} />
    <section className="teacher-preview"><h2>Tinjau materi pembelajaran</h2><p>Buka semua modul tanpa mencatat progres siswa.</p><div>{modules.map(m => <a href={'#/tinjau/' + m.id} key={m.id} className="button button-secondary"><Eye size={17} />{m.title}</a>)}</div></section>
  </section>;
}
function BookIcon() { return <span className="stat-symbol" aria-hidden="true">ΔH</span>; }
