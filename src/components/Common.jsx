import { Check, LockKeyhole } from 'lucide-react';
export function ProgressBar({ value, label }) {
  return <div className="progress-wrap"><div className="progress-label"><span>{label}</span><strong>{Math.round(value)}%</strong></div><progress max="100" value={value} aria-label={label} /></div>;
}
export function StatusBadge({ status }) {
  const labels = { locked: 'Terkunci', not_started: 'Belum dimulai', in_progress: 'Sedang dipelajari', completed: 'Selesai' };
  return <span className={'status-badge status-' + status}>{status === 'completed' ? <Check size={14} /> : status === 'locked' ? <LockKeyhole size={14} /> : <span className="status-dot" />}{labels[status] || status}</span>;
}
export function PageHeading({ eyebrow, title, description, children }) {
  return <div className="workspace-heading"><div><p className="section-eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</div>;
}
export function EmptyState({ title, children }) {
  return <div className="empty-state"><h2>{title}</h2><div>{children}</div></div>;
}
