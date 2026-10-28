function validateDeltaH(deltaH) {
  if (
    typeof deltaH !== 'number' ||
    !Number.isFinite(deltaH) ||
    deltaH < -100 ||
    deltaH > 100
  ) {
    throw new RangeError(
      'Nilai ΔH harus berupa angka antara −100 dan +100 kJ.',
    );
  }

  return deltaH === 0 ? 0 : deltaH;
}

export function getEnthalpyState(deltaH) {
  const value = validateDeltaH(deltaH);

  if (value < 0) {
    return {
      deltaH: value,
      kind: 'exothermic',
      label: 'Eksoterm',
      heatDirection: 'Keluar dari sistem',
      description:
        'Entalpi produk lebih rendah daripada reaktan. Pada tekanan tetap dan hanya kerja ekspansi atau kompresi, sistem melepaskan kalor ke lingkungan.',
    };
  }

  if (value > 0) {
    return {
      deltaH: value,
      kind: 'endothermic',
      label: 'Endoterm',
      heatDirection: 'Masuk ke sistem',
      description:
        'Entalpi produk lebih tinggi daripada reaktan. Pada tekanan tetap dan hanya kerja ekspansi atau kompresi, sistem menyerap kalor dari lingkungan.',
    };
  }

  return {
    deltaH: 0,
    kind: 'neutral',
    label: 'ΔH nol',
    heatDirection: 'Tidak ada perpindahan kalor bersih',
    description:
      'Entalpi produk sama dengan reaktan. Pada tekanan tetap dan hanya kerja ekspansi atau kompresi, tidak ada perpindahan kalor bersih pada model ini.',
  };
}

export function reverseReaction(deltaH) {
  const value = validateDeltaH(deltaH);
  return value === 0 ? 0 : -value;
}
