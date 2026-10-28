import { ArrowRight, BookOpen, FlaskConical, PencilLine, Sparkles } from 'lucide-react';
import HeroSection from './HeroSection.jsx';
import TopicCards from './TopicCards.jsx';
import JourneySidebar from './JourneySidebar.jsx';
import EnthalpyPreview from './EnthalpyPreview.jsx';
import { modules } from '../content/learningContent.js';
import { getModuleProgress, getOverallProgress } from '../domain/learning.js';

export default function HomePage({ state, onStart, onOpenModule }) {
  const student = state?.students.find(profile => profile.id === state.activeStudentId);
  const profile = student ? {
    name: student.name,
    className: state.classes.find(group => group.id === student.classId)?.name,
  } : null;
  const progressById = student
    ? Object.fromEntries(modules.map(module => [module.id, getModuleProgress(state, student.id, module.id)]))
    : null;
  const overall = student ? getOverallProgress(state, student.id) : null;
  const openModule = moduleId => student ? onOpenModule(moduleId) : onStart();

  return (
    <div className="home-page">
      <div className="page-shell adventure-shell">
        <div className="adventure-topline"><span><span className="pixel-spark" aria-hidden="true" /> SELAMAT DATANG, PENJELAJAH!</span><span>KURIKULUM MERDEKA</span></div>
        <div className="adventure-layout">
          <HeroSection onStart={onStart} modules={modules} progressById={progressById} onOpenModule={openModule} />
          <JourneySidebar profile={profile} overall={overall} modules={modules} progressById={progressById} onStart={onStart} onOpenModule={openModule} />
          <div className="quest-paper module-paper">
            <span className="paper-tab" aria-hidden="true">CATATAN MISI</span>
            <TopicCards
              modules={modules}
              progressById={progressById}
              profile={profile}
              onChangeProfile={onStart}
              onOpenModule={module => openModule(module.id)}
            />
          </div>
          <section className="discovery-section quest-paper" aria-labelledby="discovery-title">
            <span className="paper-tab" aria-hidden="true">BEKAL PENJELAJAH</span>
            <div className="discovery-copy">
              <p className="quest-eyebrow">AMATI · COBA · PAHAMI</p>
              <h2 id="discovery-title">Rasa ingin tahu adalah awalnya.</h2>
              <p>Coba model sederhana ini. Perhatikan apa yang terjadi ketika arah reaksi berubah.</p>
              <ol className="adventure-guide">
                <li><BookOpen size={21} aria-hidden="true" /><div><h3>Kenali konsepnya</h3><p>Mulai dari fenomena di sekitarmu.</p></div></li>
                <li><FlaskConical size={21} aria-hidden="true" /><div><h3>Ubah dan amati</h3><p>Hubungkan variabel dengan hasilnya.</p></div></li>
                <li><PencilLine size={21} aria-hidden="true" /><div><h3>Pelajari alasannya</h3><p>Setiap jawaban kuis langsung disertai pembahasan.</p></div></li>
              </ol>
            </div>
            <EnthalpyPreview />
          </section>
        </div>
        <section className="adventure-closing" aria-label="Mulai pembelajaran">
          <Sparkles size={26} aria-hidden="true" />
          <p>Tidak perlu langsung tahu semua jawaban.<br /><strong>Mulai dengan satu pertanyaan.</strong></p>
          <button type="button" className="button quest-primary" onClick={onStart}>Masuk / Daftar <ArrowRight size={18} aria-hidden="true" /></button>
        </section>
      </div>
    </div>
  );
}
