import { ArrowRight, FlaskConical, Lightbulb } from 'lucide-react';
import { ProgressBar } from './Common.jsx';

const statusLabels = {
  locked: 'Terkunci',
  in_progress: 'Sedang dipelajari',
  completed: 'Selesai',
  not_started: 'Belum dimulai',
};

function prerequisiteLabel(modules, index) {
  if (index === 0) return 'Tanpa modul prasyarat.';
  const earlierNumbers = modules.slice(0, index).map(module => module.number);
  return 'Prasyarat: Modul ' + earlierNumbers.join(' dan ') + ' selesai.';
}

export default function JourneySidebar({
  profile,
  overall,
  modules,
  progressById,
  onStart,
  onOpenModule,
}) {
  const hasProfile = Boolean(profile);

  return (
    <aside className="journey-sidebar" aria-label="Ringkasan perjalanan belajar">
      <section className="quest-panel journey-profile">
        <p className="journey-panel-label">PROFIL PENJELAJAH</p>
        <div className="journey-profile-heading">
          <span className="journey-avatar" aria-hidden="true">
            <FlaskConical size={28} strokeWidth={1.8} />
          </span>
          <div>
            <h2>{hasProfile ? profile.name : 'Siap menjelajah?'}</h2>
            <p>{hasProfile
              ? [profile.className, 'Akun siswa'].filter(Boolean).join(' · ')
              : 'Masuk atau daftar sebagai siswa untuk memulai perjalanan belajar.'}</p>
          </div>
        </div>

        {hasProfile && overall && (
          <div className="journey-progress">
            <ProgressBar
              value={overall.percent}
              label={overall.completed + '/' + overall.total + ' kegiatan selesai'}
            />
            <p className="journey-module-count">
              <strong>{overall.completedModules}/3</strong> modul selesai
            </p>
          </div>
        )}

        <button type="button" className="text-button" onClick={onStart}>
          {hasProfile ? 'Ganti akun' : 'Masuk siswa'}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>

      <section className="quest-panel journey-route">
        <h2 className="journey-panel-label">JEJAK BELAJAR</h2>
        <ol className="journey-route-list">
          {modules.map((module, index) => {
            const progress = hasProfile ? progressById?.[module.id] : null;
            const status = progress ? statusLabels[progress.status] : null;
            const description = status || prerequisiteLabel(modules, index);
            const action = !progress
              ? 'Masuk siswa untuk mempelajari'
              : progress.isLocked ? 'Lihat prasyarat' : 'Buka';

            return (
              <li key={module.id}>
                <button
                  type="button"
                  className="journey-stop"
                  data-status={progress?.status}
                  aria-label={action + ' Modul ' + module.number + ': ' + module.title + '. ' + description}
                  onClick={() => {
                    if (progress) onOpenModule(module.id);
                    else onStart();
                  }}
                >
                  <span className="journey-stop-number" aria-hidden="true">
                    {String(module.number).padStart(2, '0')}
                  </span>
                  <span className="journey-stop-copy">
                    <strong>{module.title}</strong>
                    <small>{description}</small>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="journey-route-note">
          Selesaikan seluruh kegiatan untuk membuka modul berikutnya. Tidak ada nilai minimum.
        </p>
      </section>

      <section className="quest-panel journey-hint">
        <h2 className="journey-panel-label">
          <Lightbulb size={18} aria-hidden="true" />
          CATATAN BELAJAR
        </h2>
        <p>
          Tentukan sistem dan lingkungannya terlebih dahulu. Setelah itu, amati apakah kalor masuk
          ke sistem atau keluar dari sistem.
        </p>
      </section>
    </aside>
  );
}
