function numberInRange(value, label, minimum, maximum) {
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error(label + ' harus berupa angka.');
  }
  const text = typeof value === 'string' ? value.trim() : String(value);
  if (!text || !/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(text)) {
    throw new Error(label + ' harus berupa angka yang valid.');
  }
  const number = Number(text.replace(',', '.'));
  if (!Number.isFinite(number) || number < minimum || number > maximum) {
    throw new Error(label + ' harus antara ' + minimum + ' dan ' + maximum + '.');
  }
  return Object.is(number, -0) ? 0 : number;
}

function booleanValue(value, label) {
  if (typeof value !== 'boolean') throw new Error(label + ' harus berupa pilihan benar atau salah.');
  return value;
}

function classify(deltaH) {
  if (deltaH < 0) {
    return { kind: 'exothermic', label: 'Eksoterm', heatDirection: 'Kalor keluar dari sistem' };
  }
  if (deltaH > 0) {
    return { kind: 'endothermic', label: 'Endoterm', heatDirection: 'Kalor masuk ke sistem' };
  }
  return {
    kind: 'neutral',
    label: 'Tidak ada perubahan entalpi bersih',
    heatDirection: 'Tidak ada perpindahan kalor bersih pada model',
  };
}

function display(number) {
  return Number(number.toFixed(6)).toLocaleString('id-ID', { maximumFractionDigits: 6 });
}

export function calculateEnthalpy({ productH, reverse = false } = {}) {
  const inputProductH = numberInRange(productH, 'Entalpi relatif produk', -100, 100);
  booleanValue(reverse, 'Arah reaksi');
  const deltaH = (reverse ? -inputProductH : inputProductH) || 0;
  return {
    type: 'enthalpy',
    inputs: { productH: inputProductH, reverse },
    reactantH: 0,
    productH: deltaH,
    deltaH,
    ...classify(deltaH),
    explanation: reverse
      ? 'Reaksi dibalik sehingga tanda ΔH berubah. Acuan entalpi reaktan dinormalkan kembali menjadi 0 kJ; selisihnya tetap benar.'
      : 'ΔH = entalpi produk − entalpi reaktan. Model memakai tekanan tetap dan hanya kerja ekspansi atau kompresi.',
  };
}

export function calculateCalorimetry({ mass, initialTemp, moles, molarEnthalpy } = {}) {
  const normalizedMass = numberInRange(mass, 'Massa larutan (g)', 50, 250);
  const normalizedTemp = numberInRange(initialTemp, 'Suhu awal (°C)', 20, 35);
  const normalizedMoles = numberInRange(moles, 'Jumlah reaksi (mol)', 0.01, 0.05);
  const normalizedEnthalpy = numberInRange(molarEnthalpy, 'Entalpi molar model', -41.8, 41.8);
  if (normalizedEnthalpy !== -41.8 && normalizedEnthalpy !== 41.8) {
    throw new Error('Pilih entalpi molar model −41,8 atau +41,8 kJ/mol.');
  }
  const specificHeat = 4.18;
  const qReaction = 1000 * normalizedMoles * normalizedEnthalpy;
  const qSolution = -qReaction;
  const deltaT = qSolution / (normalizedMass * specificHeat);
  const finalTemp = normalizedTemp + deltaT;
  const inputs = {
    mass: normalizedMass,
    initialTemp: normalizedTemp,
    moles: normalizedMoles,
    molarEnthalpy: normalizedEnthalpy,
  };
  return {
    type: 'calorimetry',
    inputs,
    ...inputs,
    specificHeat,
    qReaction,
    qSolution,
    deltaT,
    finalTemp,
    ...classify(normalizedEnthalpy),
    steps: [
      'q reaksi = ' + display(normalizedMoles) + ' × ' + display(normalizedEnthalpy) + ' × 1.000 = ' + display(qReaction) + ' J.',
      'q larutan = −q reaksi = ' + display(qSolution) + ' J.',
      'ΔT = ' + display(qSolution) + ' / (' + display(normalizedMass) + ' × 4,18) = ' + display(deltaT) + ' °C.',
      'T akhir = ' + display(normalizedTemp) + ' + (' + display(deltaT) + ') = ' + display(finalTemp) + ' °C.',
    ],
    explanation: 'Data ilustrasi: tekanan tetap, hanya kerja ekspansi/kompresi, kalor wadah dan kehilangan kalor diabaikan, kalor jenis tetap, serta tidak ada perubahan fase. Massa yang digunakan adalah massa larutan.',
  };
}

const SPECIES = ['C(s, grafit)', 'O₂(g)', 'CO(g)', 'CO₂(g)'];
const HESS_CARDS = [
  { id: 'R1', coefficients: [-1, -0.5, 1, 0], deltaH: -111 },
  { id: 'R2', coefficients: [0, -0.5, -1, 1], deltaH: -283 },
];
const TARGET = [-1, -1, 0, 1];

function coefficientLabel(value) {
  if (value === 1) return '';
  if (value === 0.5) return '½';
  if (value === 0.25) return '¼';
  return display(value);
}

function sideText(terms) {
  return terms.map((term) => coefficientLabel(term.coefficient) + term.species).join(' + ') || '0';
}

function termsFor(coefficients) {
  const reactants = [];
  const products = [];
  coefficients.forEach((coefficient, index) => {
    if (coefficient < 0) reactants.push({ species: SPECIES[index], coefficient: -coefficient });
    if (coefficient > 0) products.push({ species: SPECIES[index], coefficient });
  });
  return { reactants, products };
}

export function calculateHess({ cards } = {}) {
  if (!Array.isArray(cards) || cards.length !== 2) {
    throw new Error('Gunakan dua kartu data Hess yang tersedia.');
  }
  const normalized = cards.map((card, index) => {
    if (!card || typeof card !== 'object') throw new Error('Pilihan kartu Hess tidak valid.');
    const included = booleanValue(card.included, 'Pemilihan kartu ' + (index + 1));
    const reverse = booleanValue(card.reverse === undefined ? false : card.reverse, 'Arah kartu ' + (index + 1));
    const factor = numberInRange(card.factor === undefined ? 1 : card.factor, 'Faktor kartu ' + (index + 1), 0.5, 2);
    if (![0.5, 1, 2].includes(factor)) throw new Error('Faktor Hess harus ½, 1, atau 2.');
    return { included, reverse, factor };
  });
  if (!normalized.some((card) => card.included)) {
    throw new Error('Pilih sedikitnya satu kartu sebelum menjalankan simulasi.');
  }

  const coefficients = [0, 0, 0, 0];
  const beforeReactants = [0, 0, 0, 0];
  const beforeProducts = [0, 0, 0, 0];
  let deltaH = 0;
  const calculatedCards = normalized.map((input, index) => {
    const card = HESS_CARDS[index];
    const multiplier = input.factor * (input.reverse ? -1 : 1);
    const transformed = card.coefficients.map((value) => value * multiplier);
    const terms = termsFor(transformed);
    const energy = card.deltaH * multiplier;
    if (input.included) {
      deltaH += energy;
      transformed.forEach((value, speciesIndex) => {
        coefficients[speciesIndex] += value;
        if (value < 0) beforeReactants[speciesIndex] += -value;
        if (value > 0) beforeProducts[speciesIndex] += value;
      });
    }
    return {
      id: card.id,
      ...input,
      ...terms,
      equation: sideText(terms.reactants) + ' → ' + sideText(terms.products),
      deltaH: energy,
    };
  });
  const terms = termsFor(coefficients);
  const eliminated = SPECIES.flatMap((species, index) => {
    const coefficient = Math.min(beforeReactants[index], beforeProducts[index]);
    return coefficient ? [{ species, coefficient }] : [];
  });
  const matchesTarget = coefficients.every((value, index) => value === TARGET[index]);
  const netEquation = sideText(terms.reactants) + ' → ' + sideText(terms.products);
  return {
    type: 'hess',
    inputs: { cards: normalized },
    cards: calculatedCards,
    ...terms,
    netEquation,
    deltaH,
    ...classify(deltaH),
    matchesTarget,
    eliminated,
    steps: [
      'Ubah seluruh koefisien dan ΔH mengikuti arah serta faktor setiap kartu.',
      eliminated.length
        ? 'Eliminasi spesies yang sama pada kedua sisi: ' + sideText(eliminated) + '.'
        : 'Tidak ada spesies identik yang dapat dieliminasi pada susunan ini.',
      'Persamaan total: ' + netEquation + '.',
      'Jumlah ΔH kartu yang dipilih = ' + display(deltaH) + ' kJ.',
    ],
    explanation: matchesTarget
      ? 'Susunan tepat menghasilkan target C(s, grafit) + O₂(g) → CO₂(g), dengan ΔH = −394 kJ.'
      : 'Perhitungan valid, tetapi susunan atau basis jumlahnya belum sama dengan target. Aktivitas tetap selesai; kamu boleh mencoba susunan lain.',
  };
}
