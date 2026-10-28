import { useId } from 'react';
import { ArrowRight, BookOpen, Flame, LockKeyhole, Route, Thermometer, Waypoints } from 'lucide-react';
import { ProgressBar, StatusBadge } from './Common.jsx';

const moduleIcons = { M1: Flame, M2: Thermometer, M3: Waypoints };

function actionLabel(progress) {
  if (!progress) return 'Masuk siswa';
  if (progress.isLocked) return 'Lihat prasyarat';
  if (progress.isComplete) return 'Pelajari kembali';
  if (progress.started) return 'Lanjutkan modul';
  return 'Mulai modul';
}

export default function TopicCards({ modules, onOpenModule, progressById, profile, onChangeProfile }) {
  const cardId = useId();

  return (
    <section className="topic-section" id="modul" aria-labelledby="topic-section-title">
      <div className="topic-section-heading">
        <div>
          <p className="topic-eyebrow">JALUR BELAJAR</p>
          <h2 className="topic-section-title" id="topic-section-title" tabIndex={-1}>
            Tiga langkah memahami termokimia.
          </h2>
          <p className="topic-section-intro">Mulai dari konsep, lanjutkan ke perhitungan, lalu hubungkan semuanya.</p>
        </div>
        <span className="topic-sequence-note"><Route size={17} aria-hidden="true" /> Belajar berurutan</span>
      </div>

      {profile && (
        <div className="topic-profile">
          <p><span>Akun siswa aktif</span><strong>{profile.name}</strong><span>{profile.className}</span></p>
          <button type="button" className="text-button" onClick={onChangeProfile}>
            Ganti akun <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      {!progressById && (
        <p className="topic-data-note">
          Masuk sebagai siswa untuk melihat status dan progres belajarmu.
        </p>
      )}

      <div className="topic-grid">
        {modules.map((module, index) => {
          const Icon = moduleIcons[module.id] || BookOpen;
          const progress = progressById?.[module.id];
          const label = actionLabel(progress);
          const titleId = cardId + '-' + module.id;
          const requirementId = titleId + '-requirement';
          const previousModule = modules[index - 1];
          const prerequisite = previousModule
            ? 'Terbuka setelah seluruh kegiatan Modul ' + previousModule.number + ' selesai.'
            : 'Mulai di sini. Tidak memerlukan modul prasyarat.';
          const stateClass = progress?.isLocked ? 'topic-card--upcoming' : progress ? 'topic-card--active' : '';

          return (
            <article
              key={module.id}
              className={'topic-card topic-card--' + module.number + ' ' + stateClass}
              aria-labelledby={titleId}
            >
              <div className="topic-card-top">
                <span className="topic-icon"><Icon size={26} strokeWidth={1.7} aria-hidden="true" /></span>
                <span className="topic-number" aria-label={'Modul ' + module.number}>
                  {String(module.number).padStart(2, '0')}
                </span>
              </div>
              {progress && <StatusBadge status={progress.status} />}
              <h3 className="topic-title" id={titleId}>{module.title}</h3>
              <p className="topic-description">{module.description}</p>
              <ul className="topic-tags" aria-label={'Topik ' + module.title}>
                {module.topics.map(topic => <li key={topic} className="topic-tag">{topic}</li>)}
              </ul>
              <div className="topic-card-bottom">
                {progress && (
                  <ProgressBar value={progress.percent} label={progress.completed + '/' + progress.total + ' kegiatan'} />
                )}
                {progress?.activeAttempt && (
                  <p className="topic-quiz-progress">Kuis berjalan: {progress.answered}/{module.questions.length} soal dijawab.</p>
                )}
                <p className="topic-meta"><BookOpen size={16} aria-hidden="true" /> Materi · Simulasi · {module.questions.length} soal kuis</p>
                <p className="topic-prerequisite" id={requirementId}>
                  {progress && !progress.isLocked ? 'Modul tersedia untuk dipelajari.' : prerequisite}
                </p>
                <button
                  type="button"
                  className={'button topic-open ' + (progress?.isLocked ? 'button-secondary' : 'button-primary')}
                  aria-label={label + ': ' + module.title}
                  aria-describedby={requirementId}
                  onClick={() => onOpenModule(module)}
                >
                  {label}
                  {progress?.isLocked
                    ? <LockKeyhole size={17} aria-hidden="true" />
                    : <ArrowRight size={17} aria-hidden="true" />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="topic-completion-note">
        Selesaikan materi dan aktivitas, lalu jawab seluruh soal kuis. <strong>Tidak ada nilai minimum</strong> untuk membuka modul berikutnya.
      </p>
    </section>
  );
}
