import { formatDate } from '../services/format.js';
import { ArrowLeft, CheckCircle2, Circle, ClipboardList } from 'lucide-react';
import { modules } from '../content/learningContent.js';
import { getModuleProgress, getModuleRecord, getOverallProgress } from '../domain/learning.js';
import { PageHeading, ProgressBar, StatusBadge, EmptyState } from './Common.jsx';
function isItemDone(item, record) {
  if (item.type === 'case') return Boolean(record.caseResponse);
  if (item.type === 'simulation') return Boolean(record.simulation?.runs);
  if (item.type === 'quiz') return record.attempts.some(a => a.status === 'completed');
  return Boolean(record.items[item.id]);
}
function SimulationSummary({ simulation }) {
  if (!simulation) return <p>Simulasi belum dijalankan.</p>;
  const { result } = simulation;
  const value = n => Number(n).toLocaleString('id-ID', { maximumFractionDigits: 3 });
  return <div className="simulation-summary"><p><strong>{simulation.runs} kali dijalankan</strong> · Pertama {formatDate(simulation.firstRunAt)} · Terakhir {formatDate(simulation.lastRunAt)} WIB</p>
    {result.type === 'enthalpy' && <p>ΔH {value(result.deltaH)} kJ · {result.label} · {result.heatDirection}</p>}
    {result.type === 'calorimetry' && <><p>Input terakhir: massa {value(result.mass)} g; suhu awal {value(result.initialTemp)} °C; jumlah reaksi {value(result.moles)} mol; ΔH molar {value(result.molarEnthalpy)} kJ/mol.</p><p>Hasil: q reaksi {value(result.qReaction)} J; q larutan {value(result.qSolution)} J; suhu akhir {value(result.finalTemp)} °C.</p></>}
    {result.type === 'hess' && <><p>{result.netEquation}</p><p>ΔH {value(result.deltaH)} kJ · {result.matchesTarget ? 'Sesuai target' : 'Belum sama dengan target'}</p><ul>{result.cards?.filter(c => c.included).map((c, i) => <li key={i}>{c.equation} · ΔH {value(c.deltaH)} kJ</li>)}</ul></>}
    <p><strong>Catatan pengamatan:</strong> {simulation.note || 'Tidak diisi'}</p><small>Ringkasan menampilkan hasil terakhir, bukan riwayat lengkap semua percobaan simulasi.</small></div>;
}
export default function StudentDetail({ state, studentId }) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return <section className="page-shell workspace-page"><EmptyState title="Profil siswa tidak ditemukan"><a href="#/guru">Kembali ke ruang guru</a></EmptyState></section>;
  const overall = getOverallProgress(state, studentId);
  return <section className="page-shell workspace-page student-detail"><a href="#/guru" className="text-button back-link"><ArrowLeft size={17} />Kembali ke ruang guru</a><PageHeading eyebrow="DETAIL PEMBELAJARAN" title={student.name} description={(state.classes.find(c => c.id === student.classId)?.name || '') + ' · Akun siswa'} /><div className="panel"><ProgressBar value={overall.percent} label={overall.completed + ' dari 27 kegiatan selesai'} /></div>
    {modules.map(module => { const p = getModuleProgress(state, studentId, module.id); const record = getModuleRecord(state, studentId, module.id); return <section className="detail-module panel" key={module.id}><div className="section-topline"><h2>{module.title}</h2><StatusBadge status={p.status} /></div><p className="score-line">Kegiatan {p.completed}/9 · Nilai pertama <strong>{p.firstScore ?? '—'}</strong> · Nilai terakhir <strong>{p.latestScore ?? '—'}</strong></p>
      <details className="detail-section"><summary>Kelengkapan kegiatan</summary><ul className="item-checklist">{module.items.map(item => <li key={item.id}>{isItemDone(item, record) ? <CheckCircle2 size={17} /> : <Circle size={17} />}<span>{item.title}</span><small>{isItemDone(item, record) ? 'Selesai' : 'Belum selesai'}</small></li>)}</ul></details>
      <details className="detail-section" open><summary><ClipboardList size={17} />Percobaan kuis ({record.attempts.length})</summary>{!record.attempts.length ? <p>Belum ada percobaan kuis.</p> : record.attempts.map(attempt => <div className="attempt-detail" key={attempt.id}><div className="attempt-title"><h3>Percobaan {attempt.number}</h3><span>{attempt.status === 'completed' ? 'Selesai · Nilai ' + attempt.score : 'Sedang dikerjakan · Nilai akhir belum tersedia'}</span></div><p className="caption">Mulai {formatDate(attempt.startedAt)} WIB{attempt.completedAt ? ' · Selesai ' + formatDate(attempt.completedAt) + ' WIB' : ''}</p><ol className="answer-detail-list">{module.questions.map(q => { const answer = attempt.answers[q.id]; return <li key={q.id}><h4>{q.prompt}</h4><p>Pilihan siswa: <strong>{answer ? String.fromCharCode(65 + answer.optionIndex) + '. ' + q.options[answer.optionIndex] : 'Belum dijawab'}</strong></p><p>Kunci: {String.fromCharCode(65 + q.answerIndex)}. {q.options[q.answerIndex]}</p><span className={'answer-status ' + (!answer ? 'answer-empty' : answer.correct ? 'answer-correct' : 'answer-wrong')}>{!answer ? 'Belum dijawab' : answer.correct ? 'Benar' : 'Salah'}</span>{answer && <small>{formatDate(answer.submittedAt)} WIB</small>}</li>; })}</ol></div>)}</details>
      <details className="detail-section"><summary>Jawaban studi kasus</summary>{record.caseResponse ? <div className="prose"><p className="caption">Disimpan {formatDate(record.caseResponse.updatedAt)} WIB</p>{module.items.find(i => i.type === 'case').prompts.map((prompt, i) => <div key={prompt}><h3>{prompt}</h3><p className="student-response">{record.caseResponse.responses[i]}</p></div>)}</div> : <p>Respons kasus belum dikirim.</p>}</details>
      <details className="detail-section"><summary>Hasil dan catatan simulasi</summary><SimulationSummary simulation={record.simulation} /></details>
    </section>; })}
  </section>;
}
