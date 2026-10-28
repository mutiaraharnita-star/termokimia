import { describe, expect, it, vi } from 'vitest';
import {
  getEnthalpyState,
  reverseReaction,
} from '../src/domain/enthalpy.js';
import {
  EXPLORATION_KEY,
  loadExploration,
  saveExploration,
} from '../src/services/explorationStorage.js';

function memoryStorage(initialValue = null) {
  const data = new Map();
  if (initialValue !== null) data.set(EXPLORATION_KEY, initialValue);

  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)),
  };
}

describe('Makna perubahan entalpi', () => {
  it('menghubungkan ΔH negatif dengan eksoterm dan kalor keluar sistem', () => {
    expect(getEnthalpyState(-50)).toMatchObject({
      deltaH: -50,
      kind: 'exothermic',
      label: 'Eksoterm',
      heatDirection: 'Keluar dari sistem',
    });
  });

  it('menghubungkan ΔH positif dengan endoterm dan kalor masuk sistem', () => {
    expect(getEnthalpyState(50)).toMatchObject({
      deltaH: 50,
      kind: 'endothermic',
      label: 'Endoterm',
      heatDirection: 'Masuk ke sistem',
    });
  });

  it('memperlakukan nol tanpa kalor bersih dan menormalkan nol negatif', () => {
    for (const value of [0, -0]) {
      const state = getEnthalpyState(value);
      expect(state.kind).toBe('neutral');
      expect(state.heatDirection).toBe('Tidak ada perpindahan kalor bersih');
      expect(Object.is(state.deltaH, -0)).toBe(false);
    }
  });

  it('menerima kedua batas rentang dan angka pecahan tanpa membulatkan', () => {
    for (const value of [-100, -12.5, 0.125, 100]) {
      expect(getEnthalpyState(value).deltaH).toBe(value);
    }
  });

  it('menolak input bukan bilangan berhingga atau di luar rentang model', () => {
    const invalidValues = [
      -100.001,
      100.001,
      Number.NaN,
      Infinity,
      -Infinity,
      '-50',
      '',
      null,
      undefined,
      false,
      {},
    ];

    for (const value of invalidValues) {
      expect(() => getEnthalpyState(value)).toThrow(RangeError);
      expect(() => reverseReaction(value)).toThrow(RangeError);
    }
  });

  it('membalik tanda tanpa mengubah besar ΔH dan memulihkan reaksi asal', () => {
    expect(reverseReaction(-50)).toBe(50);
    expect(reverseReaction(50)).toBe(-50);
    for (const value of [-100, -12.5, 0, 12.5, 100]) {
      expect(reverseReaction(reverseReaction(value))).toBe(value);
    }
    expect(Object.is(reverseReaction(0), -0)).toBe(false);
    expect(Object.is(reverseReaction(-0), -0)).toBe(false);
  });
});

describe('Penyimpanan eksplorasi anonim', () => {
  it('memulihkan eksplorasi tersimpan dan hanya menulis skema anonim', () => {
    const storage = memoryStorage();
    const result = saveExploration(storage, { deltaH: 25, extra: 'abaikan' });

    expect(result.ok).toBe(true);
    expect(JSON.parse(storage.getItem(EXPLORATION_KEY))).toEqual({
      version: 1,
      deltaH: 25,
    });
    expect(loadExploration(storage)).toEqual({ deltaH: 25 });
  });

  it('memberikan keadaan awal ketika penyimpanan kosong atau tidak tersedia', () => {
    for (const storage of [undefined, null, {}, memoryStorage()]) {
      expect(loadExploration(storage)).toEqual({ deltaH: -50 });
    }

    const fallback = loadExploration();
    fallback.deltaH = 30;
    expect(loadExploration()).toEqual({ deltaH: -50 });
  });

  it('mengabaikan JSON rusak, versi asing, dan data entalpi tidak valid', () => {
    const invalidRecords = [
      '{rusak',
      'null',
      '[]',
      'false',
      JSON.stringify({ version: 2, deltaH: 20 }),
      JSON.stringify({ version: '1', deltaH: 20 }),
      JSON.stringify({ deltaH: 20 }),
      JSON.stringify({ version: 1, deltaH: '20' }),
      JSON.stringify({ version: 1, deltaH: 101 }),
      JSON.stringify({ version: 1, deltaH: -101 }),
      JSON.stringify({ version: 1, deltaH: null }),
      JSON.stringify({ version: 1 }),
    ];

    for (const record of invalidRecords) {
      expect(loadExploration(memoryStorage(record))).toEqual({ deltaH: -50 });
    }
  });

  it('tetap dapat dimulai ketika akses baca browser ditolak', () => {
    const storage = {
      getItem() {
        throw new Error('Akses ditolak');
      },
    };

    expect(loadExploration(storage)).toEqual({ deltaH: -50 });
    const blockedProperty = Object.defineProperty({}, 'getItem', {
      get() {
        throw new Error('Penyimpanan tidak tersedia');
      },
    });
    expect(loadExploration(blockedProperty)).toEqual({ deltaH: -50 });
  });

  it('melaporkan gagal simpan ketika API tidak tersedia atau penulisan ditolak', () => {
    const failingStorage = {
      setItem() {
        throw new Error('Kuota penyimpanan penuh');
      },
    };

    for (const storage of [undefined, null, {}, failingStorage]) {
      const result = saveExploration(storage, { deltaH: 50 });
      expect(result.ok).toBe(false);
      expect(result.message).toMatch(/^Belum tersimpan\./);
    }
  });

  it('menolak menyimpan nilai tidak valid tanpa menimpa eksplorasi sebelumnya', () => {
    const storage = memoryStorage(JSON.stringify({ version: 1, deltaH: -25 }));
    const setItem = vi.spyOn(storage, 'setItem');
    for (const exploration of [undefined, null, {}, { deltaH: 101 }, { deltaH: '' }]) {
      expect(saveExploration(storage, exploration).ok).toBe(false);
    }

    expect(setItem).not.toHaveBeenCalled();
    expect(loadExploration(storage)).toEqual({ deltaH: -25 });
  });
});
