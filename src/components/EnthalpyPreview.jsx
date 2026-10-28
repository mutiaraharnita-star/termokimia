import { useId, useState } from 'react';
import { MoveDown, MoveUp, RotateCcw } from 'lucide-react';
import { getEnthalpyState, reverseReaction } from '../domain/enthalpy.js';

function signedEnergy(value) {
  if (value === 0) return '0';
  return value > 0 ? '+' + value : '−' + Math.abs(value);
}

export function EnthalpyPlot({ deltaH }) {
  const titleId = useId();
  const arrowId = useId().replace(/:/g, '');
  const productY = 142 - deltaH * 0.73;
  const isExo = deltaH < 0;
  const color = deltaH === 0 ? '#52675c' : isExo ? '#bc5a36' : '#3d6e9b';
  return (
    <svg className="enthalpy-plot" viewBox="0 0 460 292" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Diagram entalpi relatif. Reaktan 0 kilojoule, produk {deltaH} kilojoule. Perubahan entalpi {deltaH} kilojoule.</title>
      <defs>
        <marker id={arrowId} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0L6 3.5L0 7" fill="none" stroke={color} strokeWidth="1.6" />
        </marker>
      </defs>
      {[69,105,142,178,215].map((y) => <line key={y} x1="55" y1={y} x2="425" y2={y} className="plot-grid" />)}
      <path d="M52 35V250H428" fill="none" stroke="#bac8b9" strokeWidth="1.5" />
      <text transform="translate(19 154) rotate(-90)" textAnchor="middle" className="plot-axis-label">Entalpi relatif (kJ)</text>
      <text x="275" y="279" textAnchor="middle" className="plot-axis-label">Kemajuan reaksi →</text>
      <text x="41" y="146" textAnchor="end" className="plot-tick">0</text>
      <line x1="55" y1="142" x2="425" y2="142" stroke="#98a995" strokeDasharray="4 5" strokeWidth="1" />
      <line x1="90" y1="142" x2="198" y2="142" stroke="#284f42" strokeWidth="4" strokeLinecap="round" />
      <text x="140" y="127" textAnchor="middle" className="plot-molecule">Reaktan</text>
      <line x1="292" y1={productY} x2="400" y2={productY} stroke={color} strokeWidth="4" strokeLinecap="round" />
      <text x="345" y={productY - 15} textAnchor="middle" className="plot-molecule">Produk</text>
      {deltaH !== 0 && <>
        <line x1="198" y1="142" x2="243" y2="142" stroke={color} strokeDasharray="3 4" />
        <line x1="243" y1="142" x2="243" y2={productY - (isExo ? 5 : -5)} stroke={color} strokeWidth="2" markerEnd={'url(#' + arrowId + ')'} />
        <line x1="246" y1={productY} x2="292" y2={productY} stroke={color} strokeDasharray="3 4" />
      </>}
      <rect x="196.5" y={deltaH < 0 ? 84 : 207} width="100" height="30" rx="15" fill={deltaH === 0 ? '#e4e9e1' : isExo ? '#f4e3d8' : '#e0eaf2'} />
      <text x="246.5" y={deltaH < 0 ? 104 : 227} textAnchor="middle" className="plot-energy" fill={color}>ΔH {signedEnergy(deltaH)}</text>
    </svg>
  );
}

export default function EnthalpyPreview() {
  const [deltaH, setDeltaH] = useState(-50);
  const rangeId = useId();
  const state = getEnthalpyState(deltaH);
  const heatIcon = deltaH < 0 ? <MoveDown size={15} /> : deltaH > 0 ? <MoveUp size={15} /> : <span aria-hidden="true">=</span>;

  function updateEnergy(nextValue) {
    const value = Number(nextValue);
    getEnthalpyState(value);
    setDeltaH(value);
  }

  return (
      <div className="hero-lab-wrap">
        <div className="lab-label"><span /> LAB MINI · PRATINJAU KONSEP</div>
        <div className={'hero-lab hero-lab--' + state.kind} id="eksplorasi">
          <div className="lab-heading">
            <div><p className="lab-kicker">01 / EKSPLORASI KONSEP</p><h2 tabIndex="-1" id="lab-title">Ke mana kalor berpindah?</h2></div>
            <span className="lab-symbol" aria-hidden="true">ΔH</span>
          </div>
          <div className="reaction-tabs" role="group" aria-label="Pilih contoh reaksi">
            <button type="button" className={deltaH < 0 ? 'is-selected' : ''} aria-pressed={deltaH < 0} onClick={() => updateEnergy(-50)}>Eksoterm <span>−</span></button>
            <button type="button" className={deltaH > 0 ? 'is-selected' : ''} aria-pressed={deltaH > 0} onClick={() => updateEnergy(50)}>Endoterm <span>+</span></button>
          </div>
          <EnthalpyPlot deltaH={deltaH} />
          <div className="lab-control">
            <label htmlFor={rangeId}>Ubah ΔH reaksi <output htmlFor={rangeId}>{signedEnergy(deltaH)} <span>kJ</span></output></label>
            <input id={rangeId} type="range" min="-100" max="100" step="10" value={deltaH} aria-valuetext={signedEnergy(deltaH) + ' kilojoule, ' + state.label} onChange={(event) => updateEnergy(event.target.value)} />
            <div className="range-labels"><span>−100 kJ</span><span>0</span><span>+100 kJ</span></div>
          </div>
          <div className="lab-result" aria-live="polite" aria-atomic="true">
            <span className="heat-direction">{heatIcon}{state.heatDirection}</span>
            <button type="button" className="reverse-button" onClick={() => updateEnergy(reverseReaction(deltaH))}><RotateCcw size={14} aria-hidden="true" /> Balik reaksi</button>
          </div>
          <details className="model-details">
            <summary>Tentang model ini</summary>
            <p>Data ilustrasi untuk basis reaksi model yang sama, pada tekanan tetap dan hanya kerja ekspansi atau kompresi. ΔH = H produk − H reaktan. Setiap tampilan memakai entalpi reaktan sebagai acuan 0 kJ; pembalikan menormalkan ulang acuan tersebut.</p>
            <p>Tinggi diagram menunjukkan entalpi relatif. Sumbu mendatar menunjukkan kemajuan reaksi, bukan waktu. Pada ΔH = 0, tidak ada perubahan entalpi bersih pada model.</p>
            <p><a href="https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy" target="_blank" rel="noreferrer">Sumber konsep: OpenStax Chemistry 2e ↗</a></p>
          </details>
        </div>
        <p className="lab-caption">Pratinjau untuk mencoba konsep. Progres dicatat di dalam modul.</p>
      </div>
  );
}
