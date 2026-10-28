import { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { getModuleProgress } from '../domain/learning.js';
import { ProgressBar } from './Common.jsx';
export default function QuizPanel({ module, state, dispatch, preview }) {
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState({});
  const progress = getModuleProgress(state, state.activeStudentId, module.id);
  const attempt = progress.activeAttempt || progress.lastAttempt;
  const questions = module.questions;
  const question = questions[index];
  const answer = attempt?.answers?.[question.id];
  const choice = answer?.optionIndex ?? drafts[question.id];
  const base = { studentId: state.activeStudentId, moduleId: module.id };
  const start = () => { if (dispatch({ type: 'START_QUIZ', ...base })) { setIndex(0); setDrafts({}); } };
  if (preview) return <div className="prose"><p className="inline-note">Tinjauan guru: kunci dan pembahasan ditampilkan tanpa mencatat jawaban siswa.</p>{questions.map((q, i) => <article className="preview-question" key={q.id}><h3>{i + 1}. {q.prompt}</h3><ol type="A">{q.options.map((option, j) => <li key={option}>{option}{j === q.answerIndex && <strong> — Jawaban benar</strong>}</li>)}</ol><p>{q.explanation}</p></article>)}</div>;
  if (!attempt) return <div className="quiz-intro"><span className="large-symbol">?</span><h2>Uji pemahaman, pelajari alasannya.</h2><p>Lima soal dengan pembahasan langsung. Pilihan dapat diubah sebelum dikirim. Jawab semua soal untuk menyelesaikan kuis; tidak ada nilai minimum.</p><button className="button button-primary" onClick={start}>Mulai kuis <ArrowRight size={18} /></button></div>;
  const done = attempt.status === 'completed';
  const answered = Object.keys(attempt.answers).length;
  return <div className="quiz-panel">
    {done && <div className="quiz-score"><div><span>Percobaan {attempt.number} selesai</span><strong>{attempt.score}<small>/100</small></strong></div><p>Seluruh soal sudah dijawab. Pelajari kembali alasan setiap jawaban; lengkapi kegiatan lain untuk membuka modul selanjutnya.</p><button className="button button-secondary" onClick={start}><RotateCcw size={16} /> Ulangi kuis</button></div>}
    <div className="quiz-meta"><span>Percobaan {attempt.number}</span><span>{answered}/5 soal terjawab</span></div>
    <ProgressBar value={answered / questions.length * 100} label="Kelengkapan jawaban" />
    <div className="question-nav" aria-label="Pilih soal">{questions.map((q, i) => <button type="button" key={q.id} aria-label={'Soal ' + (i + 1) + (attempt.answers[q.id] ? ', sudah dijawab' : ', belum dijawab')} aria-current={index === i ? 'step' : undefined} className={(index === i ? 'is-current ' : '') + (attempt.answers[q.id] ? 'is-answered' : '')} onClick={() => setIndex(i)}>{attempt.answers[q.id] ? <CheckCircle2 size={16} /> : null}{i + 1}</button>)}</div>
    <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'ANSWER_QUIZ', ...base, questionId: question.id, optionIndex: choice }); }}>
      <fieldset disabled={Boolean(answer)}><legend><span className="section-eyebrow">SOAL {index + 1} DARI 5</span>{question.prompt}</legend><div className="quiz-options">{question.options.map((option, i) => <label key={option} className={'quiz-option' + (choice === i ? ' is-selected' : '') + (answer && i === question.answerIndex ? ' is-correct' : '')}><input type="radio" name={question.id} value={i} checked={choice === i} onChange={() => setDrafts({ ...drafts, [question.id]: i })} /><span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{answer && i === question.answerIndex && <CheckCircle2 size={18} />}</label>)}</div></fieldset>
      {!answer && <button className="button button-primary" disabled={choice === undefined} type="submit">Periksa jawaban <ArrowRight size={17} /></button>}
    </form>
    {answer && <div className={'answer-feedback ' + (answer.correct ? 'feedback-correct' : 'feedback-review')} role="status"><h3>{answer.correct ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}{answer.correct ? 'Jawaban tepat.' : 'Belum tepat. Mari pahami alasannya.'}</h3><p><strong>Jawaban: {String.fromCharCode(65 + question.answerIndex)}. {question.options[question.answerIndex]}</strong></p><p>{question.explanation}</p><small>Jawaban ini tersimpan dan dikunci untuk percobaan ini.</small></div>}
    <div className="lesson-actions"><button className="button button-secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>Soal sebelumnya</button><button className="button button-secondary" disabled={index === questions.length - 1} onClick={() => setIndex(index + 1)}>Soal berikutnya <ArrowRight size={16} /></button></div>
  </div>;
}
