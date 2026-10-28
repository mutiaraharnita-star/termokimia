import { getEnthalpyState } from '../domain/enthalpy.js';

export const EXPLORATION_KEY = 'thermokimia:v1:exploration';

function defaultExploration() {
  return { deltaH: -50 };
}

export function loadExploration(storage) {
  try {
    if (!storage || typeof storage.getItem !== 'function') {
      return defaultExploration();
    }

    const payload = JSON.parse(storage.getItem(EXPLORATION_KEY));
    if (!payload || Array.isArray(payload) || payload.version !== 1) {
      return defaultExploration();
    }

    return { deltaH: getEnthalpyState(payload.deltaH).deltaH };
  } catch {
    return defaultExploration();
  }
}

export function saveExploration(storage, exploration) {
  let deltaH;

  try {
    deltaH = getEnthalpyState(exploration?.deltaH).deltaH;
  } catch {
    return {
      ok: false,
      message:
        'Belum tersimpan. Masukkan nilai ΔH antara −100 dan +100 kJ.',
    };
  }

  try {
    if (!storage || typeof storage.setItem !== 'function') {
      return {
        ok: false,
        message: 'Belum tersimpan. Penyimpanan browser tidak tersedia.',
      };
    }

    storage.setItem(
      EXPLORATION_KEY,
      JSON.stringify({ version: 1, deltaH }),
    );

    return {
      ok: true,
      message: 'Tersimpan pada browser ini.',
    };
  } catch {
    return {
      ok: false,
      message: 'Belum tersimpan. Penyimpanan browser gagal. Coba lagi.',
    };
  }
}
