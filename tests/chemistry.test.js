import { describe, expect, it } from 'vitest';
import { calculateCalorimetry, calculateEnthalpy, calculateHess } from '../src/domain/chemistry.js';

const calorimetry = { mass: 100, initialTemp: 25, moles: 0.05, molarEnthalpy: -41.8 };
const hessCards = [
  { included: true, reverse: false, factor: 1 },
  { included: true, reverse: false, factor: 1 },
];

describe('perhitungan kimia dan validasi input', () => {
  it('KIM01: memakai selisih entalpi dan membalik tandanya dengan acuan yang sama', () => {
    expect(calculateEnthalpy({ productH: -50 })).toMatchObject({
      reactantH: 0, productH: -50, deltaH: -50, kind: 'exothermic',
    });
    expect(calculateEnthalpy({ productH: -50, reverse: true })).toMatchObject({
      reactantH: 0, productH: 50, deltaH: 50, kind: 'endothermic',
    });
    expect(calculateEnthalpy({ productH: 0, reverse: true })).toMatchObject({
      deltaH: 0, kind: 'neutral',
    });
  });

  it('KIM02: menghubungkan kalor reaksi dan larutan dengan suhu akhir', () => {
    const result = calculateCalorimetry(calorimetry);
    expect(result.qReaction).toBeCloseTo(-2090);
    expect(result.qSolution).toBeCloseTo(2090);
    expect(result.deltaT).toBeCloseTo(5);
    expect(result.finalTemp).toBeCloseTo(30);
    expect(result.qReaction + result.qSolution).toBe(0);
    expect(result.kind).toBe('exothermic');
  });

  it('KIM03: massa lebih besar mengurangi perubahan suhu; endoterm mendinginkan larutan', () => {
    expect(calculateCalorimetry({ ...calorimetry, mass: 200 }).finalTemp).toBeCloseTo(27.5);
    const endothermic = calculateCalorimetry({ ...calorimetry, molarEnthalpy: 41.8 });
    expect(endothermic.finalTemp).toBeCloseTo(20);
    expect(endothermic.qReaction).toBeCloseTo(2090);
    expect(endothermic.kind).toBe('endothermic');
  });

  it('KIM04: menjumlahkan, membalik, mengalikan, dan mengeliminasi spesies dalam Hukum Hess', () => {
    const standard = calculateHess({ cards: hessCards });
    expect(standard.deltaH).toBe(-394);
    expect(standard.matchesTarget).toBe(true);
    expect(standard.eliminated).toEqual([{ species: 'CO(g)', coefficient: 1 }]);
    expect(standard.reactants).toEqual([
      { species: 'C(s, grafit)', coefficient: 1 }, { species: 'O₂(g)', coefficient: 1 },
    ]);
    expect(standard.products).toEqual([{ species: 'CO₂(g)', coefficient: 1 }]);
    const reversed = calculateHess({ cards: hessCards.map((card) => ({ ...card, reverse: true })) });
    expect(reversed.deltaH).toBe(394);
    expect(reversed.reactants).toEqual(standard.products);
    expect(reversed.products).toEqual(standard.reactants);
    const doubled = calculateHess({ cards: hessCards.map((card) => ({ ...card, factor: 2 })) });
    expect(doubled.deltaH).toBe(-788);
    expect(doubled.products[0].coefficient).toBe(2);
    expect(doubled.matchesTarget).toBe(false);
  });

  it('menghitung konfigurasi Hess valid yang belum memenuhi target', () => {
    const result = calculateHess({
      cards: [{ included: true, reverse: false, factor: 0.5 }, { included: false, reverse: false, factor: 1 }],
    });
    expect(result.deltaH).toBe(-55.5);
    expect(result.matchesTarget).toBe(false);
    expect(result.eliminated).toEqual([]);
    expect(result.products).toEqual([{ species: 'CO(g)', coefficient: 0.5 }]);
  });

  it('menerima desimal koma dan titik dari kolom teks tanpa mengubah input asal', () => {
    const inputs = { mass: '100', initialTemp: '25.0', moles: '0,05', molarEnthalpy: '-41,8' };
    const result = calculateCalorimetry(inputs);
    expect(result.inputs).toEqual(calorimetry);
    expect(result.finalTemp).toBeCloseTo(30);
    expect(inputs.moles).toBe('0,05');
    expect(calculateEnthalpy({ productH: ' -50,5 ' }).deltaH).toBe(-50.5);
    expect(calculateHess({ cards: hessCards.map((card) => ({ ...card, factor: '0,5' })) }).deltaH).toBe(-197);
  });

  it.each(['', '   ', null, undefined, true, false, NaN, Infinity, '-Infinity', '1,2.3', '0x20', {}, []])(
    'menolak input angka tidak valid: %j',
    (value) => {
      expect(() => calculateEnthalpy({ productH: value })).toThrow();
      expect(() => calculateCalorimetry({ ...calorimetry, moles: value })).toThrow();
    },
  );

  it('menegakkan rentang model dan menolak pilihan Hess kosong atau faktor yang tidak didukung', () => {
    for (const inputs of [
      { mass: 49 }, { mass: 251 }, { initialTemp: 19 }, { initialTemp: 36 },
      { moles: 0 }, { moles: 0.051 }, { molarEnthalpy: 0 },
    ]) {
      expect(() => calculateCalorimetry({ ...calorimetry, ...inputs })).toThrow();
    }
    expect(() => calculateEnthalpy({ productH: 101 })).toThrow();
    expect(() => calculateEnthalpy({ productH: 50, reverse: 'false' })).toThrow();
    expect(() => calculateHess({ cards: hessCards.map((card) => ({ ...card, included: false })) })).toThrow();
    expect(() => calculateHess({ cards: hessCards.map((card) => ({ ...card, factor: 1.5 })) })).toThrow();
    expect(() => calculateHess({ cards: [] })).toThrow();
  });
});
