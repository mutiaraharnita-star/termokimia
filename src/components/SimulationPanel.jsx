import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Thermometer, ArrowRight } from 'lucide-react';
import { calculateEnthalpy, calculateCalorimetry, calculateHess } from '../domain/chemistry.js';
import { EnthalpyPlot } from './EnthalpyPreview.jsx';
const format = n => Number(n).toLocaleString('id-ID', { maximumFractionDigits: 3 });
const signed = n => (n > 0 ? '+' : '') + format(n);
const defaults = {
  enthalpy: { productH: -50, reverse: false },
  calorimetry: { mass: 100, initialTemp: 25, moles: 0.05, molarEnthalpy: -41.8 },
  hess: { cards: [{ included: true, reverse: false, factor: 1 }, { included: true, reverse: false, factor: 1 }] },
};
function NumberField({ id, label, value, onChange, min, max, step, unit }) {
  return <label className="number-field" htmlFor={id}><span>{label} <small>{unit}</small></span><input id={id} type="number" min={min} max={max} step={step} value={value} onChange={e => onChange(e.target.value)} /><small>Rentang {min}–{max} {unit}</small></label>;
}
export default function SimulationPanel({ module, item, record, state, dispatch, preview }) {
  const type = item.simulationType;
  const [inputs, setInputs] = useState(() => record.simulation?.inputs || structuredClone(defaults[type]));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [previewResult, setPreviewResult] = useState(null);
  const [note, setNote] = useState(record.simulation?.note || '');
  const [noteSaved, setNoteSaved] = useState(false);
  const saved = record.simulation;
  const result = preview ? previewResult : saved?.result;
  const update = (key, value) => { setInputs({ ...inputs, [key]: value }); setDirty(true); setError(''); };
  const updateCard = (index, key, value) => { setInputs({ cards: inputs.cards.map((c, i) => i === index ? { ...c, [key]: value } : c) }); setDirty(true); setError(''); };
  const run = () => {
    try {
      const calculate = type === 'enthalpy' ? calculateEnthalpy : type === 'calorimetry' ? calculateCalorimetry : calculateHess;
      const computed = calculate(inputs);
      if (preview) { setPreviewResult(computed); setDirty(false); setError(''); return; }
      if (dispatch({ type: 'RUN_SIMULATION', studentId: state.activeStudentId, moduleId: module.id, inputs })) { setDirty(false); setError(''); }
    } catch (e) { setError(e.message); setDirty(true); }
  };
  return <div className={'simulation-panel simulation-' + type}>
    <p className="lesson-intro">{item.description}</p>
    <div className="simulation-workbench">
      {type === 'enthalpy' && <><div className="simulation-visual"><EnthalpyPlot deltaH={(Number(inputs.productH) || 0) * (inputs.reverse ? -1 : 1)} /><p className="caption">Pratinjau diagram · Tekan Jalankan simulasi untuk menyimpan hasil.</p></div><div className="simulation-controls"><label className="slider-field" htmlFor="product-enthalpy">Entalpi produk pada arah awal <strong>{signed(inputs.productH)} kJ</strong><input id="product-enthalpy" type="range" min="-100" max="100" step="10" value={inputs.productH} onChange={e => update('productH', Number(e.target.value))} /><span className="range-labels"><span>−100 kJ</span><span>0</span><span>+100 kJ</span></span></label><button className="button button-secondary" type="button" aria-pressed={inputs.reverse} onClick={() => update('reverse', !inputs.reverse)}><RotateCcw size={16} />{inputs.reverse ? 'Kembali ke arah awal' : 'Balik arah reaksi'}</button><p className="caption">Acuan entalpi reaktan dinormalkan ke 0 kJ. Sumbu mendatar adalah kemajuan reaksi, bukan waktu.</p></div></>}
      {type === 'calorimetry' && <><div className="calorimeter-visual" aria-label="Model kalorimeter ideal"><div className="calorimeter-glass"><span className="thermometer-icon"><Thermometer size={58} strokeWidth={1.2} /></span><div className="calorimeter-liquid"><span>{format(inputs.mass || 0)} g</span><small>larutan</small></div></div><div><span className="section-eyebrow">KALORIMETER IDEAL</span><p>Kalor reaksi + kalor larutan = 0</p><strong>q reaksi = −q larutan</strong></div></div><div className="input-grid"><NumberField id="mass" label="Massa larutan" unit="g" value={inputs.mass} min={50} max={250} step={1} onChange={v => update('mass', v)} /><NumberField id="initial-temp" label="Suhu awal" unit="°C" value={inputs.initialTemp} min={20} max={35} step={0.5} onChange={v => update('initialTemp', v)} /><NumberField id="moles" label="Jumlah reaksi" unit="mol" value={inputs.moles} min={0.01} max={0.05} step={0.001} onChange={v => update('moles', v)} /><label className="number-field"><span>Model reaksi</span><select value={inputs.molarEnthalpy} onChange={e => update('molarEnthalpy', Number(e.target.value))}><option value={-41.8}>Eksoterm: −41,8 kJ/mol</option><option value={41.8}>Endoterm: +41,8 kJ/mol</option></select><small>Data ilustrasi · basis reaksi 1:1</small></label></div></>}
      {type === 'hess' && <><div className="target-equation"><span className="section-eyebrow">REAKSI TARGET</span><strong>C(grafit) + O₂(g) → CO₂(g)</strong><span>Gabungkan kartu dan amati ΔH total.</span></div><div className="hess-cards">{inputs.cards.map((card, i) => <article className={'hess-card' + (!card.included ? ' is-excluded' : '')} key={i}><label className="checkbox-row"><input type="checkbox" checked={card.included} onChange={e => updateCard(i, 'included', e.target.checked)} />Gunakan kartu {i + 1}</label><p className="chemical-equation">{i === 0 ? 'C(grafit) + ½O₂(g) → CO(g)' : 'CO(g) + ½O₂(g) → CO₂(g)'}</p><strong>ΔH = {i === 0 ? '−111' : '−283'} kJ</strong><div className="hess-card-controls"><button className="button button-secondary" aria-pressed={card.reverse} onClick={() => updateCard(i, 'reverse', !card.reverse)}><RotateCcw size={15} />{card.reverse ? 'Arah dibalik' : 'Arah semula'}</button><label>Faktor<select value={card.factor} onChange={e => updateCard(i, 'factor', Number(e.target.value))}><option value={0.5}>½</option><option value={1}>1</option><option value={2}>2</option></select></label></div></article>)}</div></>}
    </div>
    <div className="simulation-run"><button className="button button-primary" type="button" onClick={run}><Play size={17} />{preview ? 'Jalankan pratinjau' : 'Jalankan simulasi'}</button>{saved && !preview && <span className="saved-label"><CheckCircle2 size={17} />Simulasi selesai · {saved.runs} kali dijalankan</span>}</div>
    {error && <p className="field-error" role="alert">{error}</p>}
    {dirty && result && <p className="inline-note">Parameter berubah. Hasil di bawah adalah hasil terakhir yang tersimpan; jalankan kembali untuk memperbaruinya.</p>}
    {result && <div className="simulation-result" aria-live="polite"><p className="section-eyebrow">{preview ? 'HASIL PRATINJAU' : 'HASIL TERSIMPAN'}</p>
      {type === 'enthalpy' && <><h3>ΔH = {signed(result.deltaH)} kJ · {result.label}</h3><p>{result.heatDirection}</p><p>{result.explanation}</p></>}
      {type === 'calorimetry' && <><div className="result-metrics"><div><span>Kalor reaksi</span><strong>{signed(result.qReaction)} J</strong></div><div><span>Kalor larutan</span><strong>{signed(result.qSolution)} J</strong></div><div><span>Suhu akhir</span><strong>{format(result.finalTemp)} °C</strong></div></div><ol>{result.steps?.map((step, i) => <li key={i}>{step}</li>)}</ol><p>{result.explanation}</p></>}
      {type === 'hess' && <><h3>{result.netEquation}</h3><p className="result-equation">ΔH total = {signed(result.deltaH)} kJ</p><p className="match-label">{result.matchesTarget ? '✓ Susunan sesuai reaksi target.' : 'Susunan belum sama dengan target. Anda dapat mencoba lagi.'}</p>{result.steps?.map((step, i) => <p key={i}>{step}</p>)}<p>{result.explanation}</p></>}
    </div>}
    {!preview && saved && <form className="observation-form" onSubmit={e => { e.preventDefault(); if (dispatch({ type: 'SAVE_NOTE', studentId: state.activeStudentId, moduleId: module.id, note })) setNoteSaved(true); }}><label htmlFor="observation"><strong>Catatan pengamatan <span className="optional-label">opsional</span></strong><textarea id="observation" rows={3} maxLength={1000} placeholder="Apa hubungan variabel yang kamu amati?" value={note} onChange={e => { setNote(e.target.value); setNoteSaved(false); }} /></label><div className="lesson-actions"><button className="button button-secondary" type="submit">Simpan catatan <ArrowRight size={16} /></button>{noteSaved && <span className="saved-label"><CheckCircle2 size={16} />Catatan tersimpan</span>}</div></form>}
    <details className="assumption-box"><summary>Asumsi dan batas model</summary><p>{type === 'enthalpy' ? 'Data entalpi relatif ilustrasi untuk basis reaksi model yang sama. Pada tekanan tetap dan hanya kerja ekspansi/kompresi, qₚ = ΔH. Diagram tidak menunjukkan laju reaksi.' : type === 'calorimetry' ? 'Tekanan tetap; hanya kerja ekspansi/kompresi. Kalor wadah dan kehilangan ke luar diabaikan. Kalor jenis tetap 4,18 J g⁻¹ °C⁻¹; tidak ada perubahan fase. Massa adalah massa larutan. ΔH molar ±41,8 kJ/mol adalah data ilustrasi.' : 'Kartu menggunakan kondisi serta fase yang sama dan data pembulatan. Pembalikan mengubah tanda ΔH; pengalian mengubah seluruh koefisien serta ΔH. Spesies identik dieliminasi pada sisi berlawanan.'}</p></details>
  </div>;
}
