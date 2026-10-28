import { existsSync, readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getModule, modules, sources } from '../src/content/learningContent.js';

const prd = readFileSync(new URL('../PRD_Web_Termokimia_Kelas_XI.md', import.meta.url), 'utf8');
const item = (id) => getModule(id.slice(0, 2)).items.find((entry) => entry.id === id);
const number = (value) => Number(value.replace('−', '-').replace(',', '.'));
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;

describe('kelengkapan konten dan kesesuaian PRD versi 2.0', () => {
  it('mempunyai tiga modul berurutan dan tepat sembilan item ber-ID unik per modul', () => {
    expect(modules.map((module) => module.id)).toEqual(['M1', 'M2', 'M3']);
    const allIds = [];
    for (const [index, module] of modules.entries()) {
      expect(module.number).toBe(index + 1);
      expect(module.items).toHaveLength(9);
      const counts = {};
      for (const entry of module.items) {
        counts[entry.type] = (counts[entry.type] || 0) + 1;
        expect(entry.id.startsWith(module.id + '-')).toBe(true);
        expect(nonempty(entry.title)).toBe(true);
        allIds.push(entry.id);
      }
      expect(counts).toEqual({ material: 3, example: 2, case: 1, simulation: 1, video: 1, quiz: 1 });
      expect(getModule(module.id)).toBe(module);
    }
    expect(new Set(allIds).size).toBe(27);
  });

  it('materi, contoh, kasus, dan simulasi menyediakan data yang dibutuhkan komponen pembelajaran', () => {
    for (const module of modules) {
      expect(module.objectives.length).toBeGreaterThan(0);
      expect(module.objectives.every(nonempty)).toBe(true);
      for (const entry of module.items) {
        if (entry.type === 'material') {
          expect(entry.paragraphs.length).toBeGreaterThan(0);
          expect(entry.paragraphs.every(nonempty)).toBe(true);
        } else if (entry.type === 'example') {
          expect(nonempty(entry.prompt)).toBe(true);
          expect(entry.steps.length).toBeGreaterThan(1);
          expect(entry.steps.every(nonempty)).toBe(true);
          expect(nonempty(entry.conclusion)).toBe(true);
        } else if (entry.type === 'case') {
          expect(nonempty(entry.scenario)).toBe(true);
          expect(entry.prompts).toHaveLength(2);
          expect(entry.sampleAnswers).toHaveLength(2);
          expect([...entry.prompts, ...entry.sampleAnswers].every(nonempty)).toBe(true);
        } else if (entry.type === 'simulation') {
          expect(entry.simulationType).toBe({ M1: 'enthalpy', M2: 'calorimetry', M3: 'hess' }[module.id]);
        }
      }
    }
  });

  it('lima soal per modul memiliki empat opsi berbeda, satu kunci, serta pembahasan sesuai lampiran PRD', () => {
    const allQuestionIds = [];
    for (const module of modules) {
      expect(module.questions).toHaveLength(5);
      for (const question of module.questions) {
        expect(nonempty(question.prompt)).toBe(true);
        expect(nonempty(question.explanation)).toBe(true);
        expect(question.options).toHaveLength(4);
        expect(new Set(question.options).size).toBe(4);
        expect(question.options.every(nonempty)).toBe(true);
        expect(Number.isInteger(question.answerIndex)).toBe(true);
        expect(question.answerIndex).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex).toBeLessThan(4);
        const section = prd.split('##### ' + question.id + ' — ')[1]?.split('\n##### ')[0];
        expect(section, question.id + ' harus ada dalam PRD').toBeDefined();
        const key = section.match(/\*\*Kunci: ([ABCD])\*\*/)?.[1];
        expect(question.answerIndex, question.id + ' harus mengikuti kunci PRD').toBe(key.charCodeAt(0) - 65);
        for (const [index, option] of question.options.entries()) {
          const expected = section.match(new RegExp('^' + String.fromCharCode(65 + index) + '\\. (.+)$', 'm'))?.[1].trim();
          expect(option).toBe(expected);
        }
        allQuestionIds.push(question.id);
      }
    }
    expect(new Set(allQuestionIds).size).toBe(15);
  });

  it('menyediakan berkas video, poster, VTT, dan transkrip lokal yang selaras dengan konten aplikasi', () => {
    for (const module of modules) {
      const video = module.items.find((entry) => entry.type === 'video');
      expect(video.transcript.length).toBeGreaterThan(0);
      expect(video.transcript.every(nonempty)).toBe(true);
      for (const asset of [video.videoSrc, video.poster, video.videoSrc.replace('.mp4', '-id.vtt')]) {
        const path = new URL('../public' + asset, import.meta.url);
        expect(existsSync(path), asset).toBe(true);
        expect(statSync(path).size, asset).toBeGreaterThan(0);
      }
      const transcript = readFileSync(new URL('../public' + video.videoSrc.replace('.mp4', '-transcript.txt'), import.meta.url), 'utf8');
      expect(transcript.trim()).toBe(video.transcript.join('\n\n').trim());
    }
    // Ketersediaan aset tidak membuktikan pemutaran video atau keterbacaan pada browser.
  });

  it('mencatat identitas, penggunaan, status, dan URL rujukan ilmiah', () => {
    for (let index = 1; index <= 7; index += 1) {
      const source = sources.find((entry) => entry.id === 'R' + index);
      expect(source).toBeDefined();
      expect([source.title, source.author, source.usage, source.status].every(nonempty)).toBe(true);
      expect(new URL(source.url).protocol).toBe('https:');
    }
  });
});

describe('KIM05 dan KIM06: memeriksa angka dari contoh yang benar-benar ditampilkan', () => {
  // Data diverifikasi langsung pada OpenStax Chemistry 2e:
  // 5.3, Check Your Learning sesudah Example 5.11; dan 7.5, Table 7.2 serta contoh HCl.
  it('KIM05: koefisien dua HCl(g) menghasilkan −184,6 kJ dari data pembentukan per mol', () => {
    const example = item('M3-EX01');
    const reaction = example.prompt.match(/H₂\(g\) \+ Cl₂\(g\) → (\d+)HCl\(g\)/);
    expect(reaction).not.toBeNull();
    const coefficient = Number(reaction[1]);
    const enthalpyHCl = number(example.prompt.match(/HCl\(g\) = ([−-]?\d+,\d+)/)[1]);
    const enthalpyH2 = number(example.prompt.match(/H₂\(g\) = (\d+)/)[1]);
    const enthalpyCl2 = number(example.prompt.match(/Cl₂\(g\) = (\d+)/)[1]);
    expect({ coefficient, enthalpyHCl, enthalpyH2, enthalpyCl2 }).toEqual({
      coefficient: 2, enthalpyHCl: -92.3, enthalpyH2: 0, enthalpyCl2: 0,
    });
    const calculated = coefficient * enthalpyHCl - (enthalpyH2 + enthalpyCl2);
    const displayed = number(example.conclusion.match(/ΔH = ([−-]?\d+,\d+) kJ/)[1]);
    expect(calculated).toBeCloseTo(-184.6);
    expect(displayed).toBeCloseTo(calculated);
    expect(example.conclusion).toContain('per mol HCl');
    const question = getModule('M3').questions.find((entry) => entry.id === 'M3-Q04');
    expect(question.options[question.answerIndex]).toContain('2 mol HCl');
  });

  it('KIM06: satu H–H dan Cl–Cl diputus, dua H–Cl dibentuk, dan hasil dilabeli estimasi fase gas', () => {
    const example = item('M3-EX02');
    const bondEnergy = (bond) => Number(example.prompt.match(new RegExp(bond + ' = (\\d+)'))[1]);
    const data = { HH: bondEnergy('H–H'), ClCl: bondEnergy('Cl–Cl'), HCl: bondEnergy('H–Cl') };
    expect(data).toEqual({ HH: 436, ClCl: 243, HCl: 432 });
    const coefficient = Number(example.prompt.match(/H₂\(g\) \+ Cl₂\(g\) → (\d+)HCl\(g\)/)[1]);
    const broken = data.HH + data.ClCl;
    const formed = coefficient * data.HCl;
    expect(broken).toBe(679);
    expect(formed).toBe(864);
    expect(broken - formed).toBe(-185);
    const displayed = number(example.conclusion.match(/ΔH ≈ ([−-]?\d+) kJ/)[1]);
    expect(displayed).toBe(broken - formed);
    expect(example.steps.join(' ')).toContain('679 − 864 = −185');
    expect(example.prompt).toContain('fase gas');
    expect(example.conclusion).toContain('estimasi');
    const question = getModule('M3').questions.find((entry) => entry.id === 'M3-Q05');
    expect(question.options[question.answerIndex]).toContain('estimasi');
    expect(question.options[question.answerIndex]).toContain('fase gas');
  });
});
