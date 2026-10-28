import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FlaskConical, PlayCircle, ClipboardList, LockKeyhole } from 'lucide-react';
import { getModule, modules } from '../content/learningContent.js';
import { getModuleProgress, getModuleRecord } from '../domain/learning.js';
import { navigate } from '../hooks/useRoute.js';
import { EmptyState, ProgressBar, StatusBadge } from './Common.jsx';
import QuizPanel from './QuizPanel.jsx';
import SimulationPanel from './SimulationPanel.jsx';
const itemLabels = { material: 'Materi', example: 'Contoh soal', case: 'Studi kasus', simulation: 'Simulasi', video: 'Video & transkrip', quiz: 'Kuis konsep' };
const icons = { material: BookOpen, example: ClipboardList, case: ClipboardList, simulation: FlaskConical, video: PlayCircle, quiz: ClipboardList };

function CaseActivity({ item, record, moduleId, studentId, dispatch, preview }) {
  const [responses, setResponses] = useState(record.caseResponse?.responses || ['', '']);
  const saved = Boolean(record.caseResponse);
  const currentSaved = saved && responses.every((value, index) => value.trim() === record.caseResponse.responses[index]);
  return <div className="case-activity prose"><div className="case-scenario"><span className="section-eyebrow">KASUS KEHIDUPAN SEHARI-HARI</span><p>{item.scenario}</p></div>
    {!preview && <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'SAVE_CASE', studentId, moduleId, responses }); }}>
      {item.prompts.map((prompt, index) => <label className="case-question" key={prompt} htmlFor={item.id + '-' + index}><span>{index + 1}. {prompt}</span><textarea id={item.id + '-' + index} value={responses[index]} rows={4} required minLength={1} maxLength={1000} onChange={e => setResponses(responses.map((v, i) => i === index ? e.target.value : v))} placeholder="Tuliskan alasanmu dengan bahasamu sendiri." /><small>{responses[index].length}/1.000 karakter</small></label>)}
      <div className="lesson-actions"><button type="submit" className="button button-primary">{saved ? 'Simpan perubahan jawaban' : 'Kirim jawaban kasus'}<ArrowRight size={17} /></button>{currentSaved ? <span className="saved-label"><CheckCircle2 size={17} />Respons tersimpan</span> : saved ? <span className="caption">Perubahan respons belum tersimpan.</span> : null}</div></form>}
    {(saved || preview) && <div className="case-discussion"><h3>Contoh pembahasan</h3>{item.sampleAnswers.map((answer, i) => <div key={i}><strong>{i + 1}. {item.prompts[i]}</strong><p>{answer}</p></div>)}<p className="caption">Respons bebas dapat ditinjau guru. Ketepatan jawaban tidak menjadi pengunci modul.</p></div>}
  </div>;
}
function VideoActivity({ item, complete, onComplete, preview }) {
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  const asset = path => import.meta.env.BASE_URL + path.replace(/^\//, '');
  return <div className="video-activity"><p className="lesson-intro">Video penjelasan teks dan diagram tanpa suara. Kamu juga dapat mempelajari transkrip yang setara.</p><video controls playsInline preload="metadata" poster={asset(item.poster)} onPlaying={() => setOpened(true)} onError={() => setFailed(true)} aria-label={item.title}><source src={asset(item.videoSrc)} type="video/mp4" onError={() => setFailed(true)} /><track kind="captions" src={asset(item.videoSrc.replace('.mp4', '-id.vtt'))} srcLang="id" label="Bahasa Indonesia" />Browser ini belum mendukung pemutar video. Gunakan transkrip di bawah.</video>
    {failed && <p className="field-error" role="status">Video belum dapat diputar. Buka transkrip untuk melanjutkan kegiatan yang sama.</p>}
    <details className="transcript" onToggle={e => { if (e.currentTarget.open) setOpened(true); }}><summary>Buka transkrip video</summary><div className="prose">{item.transcript.map((p, i) => <p key={i}>{p}</p>)}</div></details>
    {!preview && <div className="lesson-actions"><button className="button button-primary" disabled={complete || !opened} onClick={onComplete}>{complete ? <CheckCircle2 size={18} /> : null}{complete ? 'Kegiatan selesai' : 'Tandai selesai'}</button>{!opened && !complete && <p className="caption">Putar video atau buka transkrip terlebih dahulu.</p>}</div>}
  </div>;
}
function ReadingActivity({ item, complete, onComplete, preview }) {
  return <div className="prose reading-activity">{item.type === 'example' ? <><div className="example-prompt"><span className="section-eyebrow">DARI DATA MENUJU MAKNA</span><p>{item.prompt}</p></div><ol className="worked-steps">{item.steps.map((step, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol><div className="concept-callout"><strong>Makna hasil</strong><p>{item.conclusion}</p></div></> : <>{item.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{item.formula && <p className="formula-box">{item.formula}</p>}{item.callout && <div className="concept-callout"><strong>Ingat konsepnya</strong><p>{item.callout}</p></div>}</>}
    {!preview && <div className="lesson-actions"><button className="button button-primary" disabled={complete} onClick={onComplete}>{complete ? <CheckCircle2 size={18} /> : null}{complete ? 'Kegiatan selesai' : 'Tandai selesai'}</button><p className="caption">Tandai setelah kamu mempelajari bagian ini.</p></div>}
  </div>;
}
export default function ModulePage({ moduleId, state, dispatch, preview = false }) {
  const module = getModule(moduleId);
  const [activeId, setActiveId] = useState(() => module?.items[0]?.id);
  const lessonTitle = useRef(null);
  useLayoutEffect(() => { lessonTitle.current?.focus(); }, [activeId]);
  if (!module) return <section className="page-shell workspace-page"><EmptyState title="Modul tidak ditemukan"><a className="button button-primary" href="#/siswa">Kembali ke ruang siswa</a></EmptyState></section>;
  const student = state.students.find(s => s.id === state.activeStudentId);
  if (!student) return <section className="page-shell workspace-page"><EmptyState title="Masuk siswa untuk belajar"><a className="button button-primary" href="#/demo">Masuk siswa</a></EmptyState></section>;
  const progress = getModuleProgress(state, student.id, module.id);
  const record = getModuleRecord(state, student.id, module.id);
  if (progress.isLocked && !preview) {
    const prerequisite = modules.find(m => m.number < module.number && !getModuleProgress(state, student.id, m.id).isComplete);
    const previousRecord = getModuleRecord(state, student.id, prerequisite.id);
    const remaining = prerequisite.items.filter(entry => !previousRecord.items[entry.id]);
    return <section className="page-shell workspace-page"><div className="locked-page"><LockKeyhole size={38} /><span className="section-eyebrow">BELAJAR BERURUTAN</span><h1>Modul ini belum terbuka.</h1><p>Selesaikan seluruh kegiatan dan semua soal kuis pada modul sebelumnya. Tidak ada nilai minimum.</p><div className="remaining-activities"><h2>Yang perlu diselesaikan di {prerequisite.id}</h2><ul>{remaining.map(entry => <li key={entry.id}>{itemLabels[entry.type]} · {entry.title}</li>)}</ul></div><button className="button button-primary" onClick={() => navigate('/belajar/' + prerequisite.id)}>Lanjutkan modul sebelumnya <ArrowRight size={17} /></button><a className="text-button" href="#/siswa">Lihat seluruh progres</a></div></section>;
  }
  const item = module.items.find(i => i.id === activeId) || module.items[0];
  const index = module.items.findIndex(i => i.id === item.id);
  const complete = Boolean(record.items[item.id]);
  const select = id => setActiveId(id);
  const onComplete = () => dispatch({ type: 'COMPLETE_ITEM', studentId: student.id, moduleId: module.id, itemId: item.id });
  return <section className="page-shell module-page">
    <div className="module-breadcrumb"><a href={preview ? '#/guru' : '#/siswa'}><ArrowLeft size={16} />{preview ? 'Ruang guru' : 'Ruang siswa'}</a><span>/</span><span>Modul {module.number}</span>{preview && <span className="pill">Tinjauan guru · tanpa mencatat progres</span>}</div>
    <div className="module-header"><div><p className="section-eyebrow">MODUL {String(module.number).padStart(2, '0')}</p><h1>{module.title}</h1><p>{module.description}</p></div>{!preview && <StatusBadge status={progress.status} />}</div>
    {progress.isComplete && !preview && <div className="module-finished" role="status"><CheckCircle2 size={23} /><div><strong>Seluruh kegiatan modul ini selesai.</strong><p>{module.id !== 'M3' ? 'Modul berikutnya sudah terbuka. Kamu juga dapat mengulang latihan.' : 'Kamu sudah menuntaskan seluruh jalur belajar termokimia.'}</p></div><a className="button button-primary" href={module.id !== 'M3' ? '#/belajar/M' + (Number(module.id.slice(1)) + 1) : '#/siswa'}>{module.id !== 'M3' ? 'Modul berikutnya' : 'Lihat progres'} <ArrowRight size={16} /></a></div>}
    <div className="module-layout"><aside className="lesson-sidebar"><div className="sidebar-heading"><h2>Isi modul</h2><span>9 kegiatan</span></div>{!preview && <ProgressBar value={progress.percent} label={progress.completed + '/9 kegiatan selesai'} />}<nav aria-label="Kegiatan dalam modul">{module.items.map((entry, i) => { const Icon = icons[entry.type]; const done = entry.type === 'case' ? Boolean(record.caseResponse) : entry.type === 'simulation' ? Boolean(record.simulation?.runs) : entry.type === 'quiz' ? record.attempts.some(a => a.status === 'completed') : Boolean(record.items[entry.id]); return <button key={entry.id} type="button" onClick={() => select(entry.id)} className={'lesson-nav-item' + (entry.id === item.id ? ' is-active' : '')} aria-current={entry.id === item.id ? 'step' : undefined}><span className={'lesson-nav-icon' + (done && !preview ? ' is-done' : '')}>{done && !preview ? <CheckCircle2 size={18} /> : <Icon size={18} />}</span><span><small>{String(i + 1).padStart(2, '0')} · {itemLabels[entry.type]}</small>{entry.title}</span></button>; })}</nav><details className="module-objectives"><summary>Tujuan pembelajaran</summary><ul>{module.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul></details></aside>
    <article className="lesson-body"><div className="lesson-title-row"><span className="pill">{itemLabels[item.type]}</span><span className="caption">{index + 1} dari 9 kegiatan</span></div><h2 id="lesson-title" ref={lessonTitle} tabIndex="-1">{item.title}</h2>
      <div key={item.id}>{['material', 'example'].includes(item.type) && <ReadingActivity item={item} complete={complete} onComplete={onComplete} preview={preview} />}{item.type === 'case' && <CaseActivity item={item} record={record} studentId={student.id} moduleId={module.id} dispatch={dispatch} preview={preview} />}{item.type === 'video' && <VideoActivity item={item} complete={complete} onComplete={onComplete} preview={preview} />}{item.type === 'simulation' && <SimulationPanel module={module} item={item} record={record} state={state} dispatch={dispatch} preview={preview} />}{item.type === 'quiz' && <QuizPanel module={module} state={state} dispatch={dispatch} preview={preview} />}</div>
      <div className="lesson-pagination"><button className="text-button" disabled={index === 0} onClick={() => select(module.items[index - 1].id)}><ArrowLeft size={17} />Kegiatan sebelumnya</button><button className="text-button" disabled={index === module.items.length - 1} onClick={() => select(module.items[index + 1].id)}>Kegiatan berikutnya <ArrowRight size={17} /></button></div><p className="lesson-source">Acuan konsep dan sumber media tersedia pada <a href="#/bantuan">Panduan & sumber ↗</a>.</p>
    </article></div>
  </section>;
}
