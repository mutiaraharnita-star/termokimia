import { ArrowDown, ArrowRight, Check, LockKeyhole, Play } from 'lucide-react';
import PixelJourneyScene from './PixelJourneyScene.jsx';

const shortTitles = { M1: 'Konsep dasar', M2: 'Kalorimetri', M3: 'Penentuan ΔH' };

export default function HeroSection({ onStart, modules = [], progressById, onOpenModule }) {
  function focusModules(event) {
    const title = document.getElementById('topic-section-title');
    if (!title) return;
    event.preventDefault();
    title.focus({ preventScroll: true });
    title.scrollIntoView({ block: 'start' });
  }

  return (
    <section className="adventure-hero quest-panel" id="beranda" aria-labelledby="hero-title">
      <div className="adventure-hero-copy">
        <p className="quest-eyebrow"><span className="pixel-spark" aria-hidden="true" /> DUNIA SAINS · KIMIA KELAS XI</p>
        <h1 id="hero-title">Petualangan<br /><span>energi.</span></h1>
        <p className="adventure-hero-description">Setiap reaksi punya cerita. Jelajahi arah kalor, pecahkan teka-teki entalpi, dan temukan hubungan di balik rumusnya.</p>
        <div className="adventure-hero-actions">
          <button type="button" className="button quest-primary" onClick={onStart}>
            <Play size={16} fill="currentColor" aria-hidden="true" /> Mulai Belajar <ArrowRight size={18} aria-hidden="true" />
          </button>
          <a className="quest-text-link" href="#modul" onClick={focusModules}>Lihat modul <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <ul className="adventure-facts" aria-label="Tentang pembelajaran">
          <li>03 MODUL</li><li>27 KEGIATAN</li><li>UNTUK PEMULA</li>
        </ul>
      </div>
      <div className="adventure-map">
        <PixelJourneyScene />
        <div className="map-caption"><span>PETA PERJALANAN</span><span>Mulai dari pos pertama <ArrowRight size={13} aria-hidden="true" /></span></div>
      </div>
      <ol className="map-stations" aria-label="Pilih pos belajar">
        {modules.map(module => {
          const progress = progressById?.[module.id];
          const statusText = progress?.isComplete ? 'Selesai' : progress?.isLocked ? 'Terkunci, lihat prasyarat' : progress ? 'Tersedia' : 'Masuk siswa untuk melihat status';
          return (
            <li key={module.id}>
              <button
                type="button"
                className={'map-station' + (progress?.isComplete ? ' is-complete' : progress?.isLocked ? ' is-locked' : '')}
                aria-label={'Pos ' + module.number + ': ' + module.title + '. ' + statusText}
                onClick={() => progress ? onOpenModule(module.id) : onStart()}
              >
                <span className="map-station-number">{progress?.isComplete ? <Check size={16} aria-hidden="true" /> : String(module.number).padStart(2, '0')}</span>
                <span>{shortTitles[module.id] || module.title}</span>
                {progress?.isLocked && <LockKeyhole size={14} aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

