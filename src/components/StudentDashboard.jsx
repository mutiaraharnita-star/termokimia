import { ArrowRight, CheckCircle2, Layers, BookOpen } from 'lucide-react';
import { modules } from '../content/learningContent.js';
import { getModuleProgress, getOverallProgress } from '../domain/learning.js';
import TopicCards from './TopicCards.jsx';
import { PageHeading, ProgressBar } from './Common.jsx';
export default function StudentDashboard({ state, onOpenModule, onChangeProfile }) {
  const student = state.students.find(s => s.id === state.activeStudentId);
  if (!student) return <section className="page-shell workspace-page"><button className="button button-primary" onClick={onChangeProfile}>Masuk siswa</button></section>;
  const overall = getOverallProgress(state, student.id);
  const progressById = Object.fromEntries(modules.map(m => [m.id, getModuleProgress(state, student.id, m.id)]));
  const nextModule = modules.find(m => !progressById[m.id].isLocked && !progressById[m.id].isComplete) || modules[0];
  return <section className="page-shell workspace-page">
    <PageHeading eyebrow="RUANG SISWA" title={'Halo, ' + student.name + '.'} description="Belajar bertahap. Setiap kegiatan membantumu menghubungkan konsep dengan perhitungan."><button className="button button-secondary" onClick={onChangeProfile}>Ganti profil</button></PageHeading>
    <div className="student-overview"><div className="overview-main"><div className="overview-top"><span className="pill">{state.classes.find(c => c.id === student.classId)?.name} · Akun siswa</span><BookOpen size={24} /></div><h2>{overall.completed === 27 ? 'Seluruh kegiatan sudah selesai.' : 'Satu langkah lebih memahami energi.'}</h2><ProgressBar value={overall.percent} label={overall.completed + ' dari 27 kegiatan selesai'} /><button className="button button-light" onClick={() => onOpenModule(nextModule.id)}>{overall.completed === 27 ? 'Ulangi pembelajaran' : 'Lanjutkan belajar'} <ArrowRight size={18} /></button></div><div className="overview-stats"><div><Layers size={22} /><strong>{overall.completedModules}<small>/ 3</small></strong><span>modul selesai</span></div><div><CheckCircle2 size={22} /><strong>{overall.completed}<small>/ 27</small></strong><span>kegiatan selesai</span></div></div></div>
    <TopicCards modules={modules} progressById={progressById} onOpenModule={m => onOpenModule(m.id)} />
    <div className="inline-note"><strong>Yang menentukan progres adalah kelengkapan kegiatan.</strong><p>Jawab seluruh soal kuis dan selesaikan aktivitas wajib. Tidak ada nilai minimum untuk membuka modul berikutnya.</p></div>
  </section>;
}
