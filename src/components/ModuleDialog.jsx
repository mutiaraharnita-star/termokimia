import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Check, LockKeyhole, X } from 'lucide-react';

export default function ModuleDialog({ module, onClose, onExplore }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (module && !dialog.open) dialog.showModal();
    if (!module && dialog.open) dialog.close();
  }, [module]);

  return (
    <dialog className="module-dialog" ref={dialogRef} aria-labelledby="module-dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {module && <div className="dialog-content">
        <div className="dialog-topline"><span className="section-eyebrow">MODUL {module.number} · {module.prerequisite ? 'PRASYARAT' : 'PENGANTAR'}</span><button type="button" className="icon-button" aria-label="Tutup pengantar modul" onClick={onClose}><X size={22} aria-hidden="true" /></button></div>
        <span className="dialog-icon">{module.prerequisite ? <LockKeyhole size={28} aria-hidden="true" /> : <BookOpen size={28} aria-hidden="true" />}</span>
        <h2 id="module-dialog-title">{module.title}</h2>
        <p className="dialog-description">{module.description}</p>
        {module.prerequisite ? (
          <div className="prerequisite-message"><strong>Dimulai setelah Modul {module.prerequisite.slice(1)} selesai.</strong><p>Lengkapi materi, aktivitas, dan seluruh jawaban kuis pada modul sebelumnya. Tidak ada nilai minimum untuk melanjutkan.</p></div>
        ) : (
          <div className="intro-copy"><p><strong>Sistem</strong> adalah bagian yang kita pilih untuk diamati. <strong>Lingkungan</strong> adalah segala sesuatu di luar batas sistem. Kalor merupakan energi yang berpindah karena perbedaan suhu.</p><p>Pada model tekanan tetap dengan hanya kerja ekspansi atau kompresi, reaksi <strong>eksoterm</strong> melepaskan kalor dari sistem dan memiliki ΔH negatif. Reaksi <strong>endoterm</strong> menyerap kalor ke dalam sistem dan memiliki ΔH positif.</p><p className="intro-equation">ΔH = H<sub>produk</sub> − H<sub>reaktan</sub></p></div>
        )}
        <h3>Yang akan kamu pelajari</h3>
        <ul className="objectives-list">{module.objectives.map((objective) => <li key={objective}><Check size={17} aria-hidden="true" /><span>{objective}</span></li>)}</ul>
        <p className="scope-note">Pratinjau beranda: pengantar dan diagram dapat dicoba. Materi lengkap, aktivitas, serta kuis modul tersedia pada tahap pengembangan berikutnya.</p>
        <div className="dialog-actions">{module.prerequisite ? <button type="button" className="button button-primary" onClick={onClose}>Kembali ke modul</button> : <button type="button" className="button button-primary" onClick={onExplore}>Coba diagram entalpi <ArrowRight size={17} aria-hidden="true" /></button>}</div>
      </div>}
    </dialog>
  );
}

