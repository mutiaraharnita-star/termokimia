import { useEffect, useState } from 'react';
const read = () => window.location.hash.startsWith('#/') ? window.location.hash.slice(1).split('?')[0] : '/';
export const navigate = (path) => { window.location.hash = path; };
export default function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('konten')?.focus({ preventScroll: true });
  }, [route]);
  return route;
}
