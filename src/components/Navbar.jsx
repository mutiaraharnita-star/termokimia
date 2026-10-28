import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, FlaskConical, Menu, X } from 'lucide-react';
import { siteIdentity } from '../content/siteContent.js';

export default function Navbar({ onStart, onStudent, onTeacher, route = '/' }) {
  const [isOpen, setOpen] = useState(false);
  const navId = useId();
  const toggle = useRef(null);
  const isStudentPage = route === '/siswa' || route.startsWith('/belajar/');
  const isTeacherPage = route.startsWith('/guru') || route.startsWith('/tinjau/');

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  function act(action) {
    setOpen(false);
    action();
  }

  return (
    <header className="navbar navbar--adventure">
      <div className="navbar-inner">
        <a className="navbar-brand" href="#/" onClick={() => setOpen(false)} aria-label={siteIdentity.name + ', beranda'}>
          <span className="navbar-brand-mark"><FlaskConical size={25} strokeWidth={1.8} aria-hidden="true" /></span>
          <span className="navbar-brand-copy">
            <span className="navbar-brand-name">{siteIdentity.name}</span>
            <span className="navbar-brand-caption">Kimia · Kelas XI</span>
          </span>
        </a>
        <button
          type="button"
          className="navbar-toggle"
          ref={toggle}
          aria-controls={navId}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setOpen(open => !open)}
        >
          {isOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
        <nav id={navId} className={'navbar-navigation' + (isOpen ? ' is-open' : '')} aria-label="Navigasi utama">
          <div className="navbar-links">
            <a
              className={'navbar-link' + (route === '/' ? ' is-active' : '')}
              href="#/"
              aria-current={route === '/' ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >Beranda</a>
            <button
              type="button"
              className={'navbar-link nav-button' + (isStudentPage ? ' is-active' : '')}
              aria-current={isStudentPage ? 'page' : undefined}
              onClick={() => act(onStudent)}
            >Ruang siswa</button>
            <button
              type="button"
              className={'navbar-link nav-button' + (isTeacherPage ? ' is-active' : '')}
              aria-current={isTeacherPage ? 'page' : undefined}
              onClick={() => act(onTeacher)}
            >Ruang guru</button>
            <a
              className={'navbar-link' + (route === '/bantuan' ? ' is-active' : '')}
              href="#/bantuan"
              aria-current={route === '/bantuan' ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >Panduan</a>
          </div>
          <button type="button" className="button button-primary navbar-start" onClick={() => act(onStart)}>
            Masuk <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
