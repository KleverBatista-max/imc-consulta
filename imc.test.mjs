import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const script = html.match(/<script id="bmi">([\s\S]*?)<\/script>/);
assert.ok(script, 'El HTML debe incluir el script de cálculo');
const { calculateBMI, displayBMI } = runInNewContext(script[1] + '\n({ calculateBMI, displayBMI });');

test('calcula en kg y cm y admite coma, punto y espacios exteriores', () => {
  const result = calculateBMI('metric', ' 70,000 ', '175.0');
  assert.ok(Math.abs(result.bmi - 22.857142857142858) < 1e-12);
  assert.equal(result.category, 'Peso saludable');
  assert.match(displayBMI(result), /^22[.,]86$/);
});

test('calcula en libras y pulgadas con el factor 703', () => {
  const result = calculateBMI('imperial', '200', '68');
  assert.ok(Math.abs(result.bmi - 30.406574394463668) < 1e-12);
  assert.equal(result.category, 'Obesidad de clase 1');
});

test('clasifica justo por debajo, en y por encima de cada umbral', () => {
  const boundaries = [
    [18.5, 'Bajo peso', 'Peso saludable'],
    [25, 'Peso saludable', 'Sobrepeso'],
    [30, 'Sobrepeso', 'Obesidad de clase 1'],
    [35, 'Obesidad de clase 1', 'Obesidad de clase 2'],
    [40, 'Obesidad de clase 2', 'Obesidad de clase 3']
  ];
  for (const [threshold, below, at] of boundaries) {
    // Con 180 cm, cada peso de corte es representable con tres decimales.
    const weight = threshold * 3.24;
    const justBelow = calculateBMI('metric', (weight - 0.001).toFixed(3), '180');
    const exact = calculateBMI('metric', weight.toFixed(3), '180');
    const justAbove = calculateBMI('metric', (weight + 0.001).toFixed(3), '180');
    assert.equal(justBelow.category, below);
    assert.equal(exact.bmi, threshold);
    assert.equal(exact.category, at);
    assert.equal(justAbove.category, at);
    assert.equal(displayBMI(justBelow), '< ' + displayBMI(exact));
  }
});

test('acepta los extremos de entrada y rechaza valores fuera de rango', () => {
  for (const [system, minWeight, maxWeight, minHeight, maxHeight] of [
    ['metric', 1, 500, 50, 300],
    ['imperial', 2, 1100, 20, 120]
  ]) {
    assert.ok(Number.isFinite(calculateBMI(system, String(minWeight), String(maxHeight)).bmi));
    assert.ok(Number.isFinite(calculateBMI(system, String(maxWeight), String(minHeight)).bmi));
    for (const weight of [minWeight - 0.001, maxWeight + 0.001]) {
      assert.equal(calculateBMI(system, weight.toFixed(3), String(minHeight)).invalidWeight, true);
    }
    for (const height of [minHeight - 0.001, maxHeight + 0.001]) {
      assert.equal(calculateBMI(system, String(minWeight), height.toFixed(3)).invalidHeight, true);
    }
  }
});

test('rechaza entradas vacías, no numéricas o con precisión no admitida', () => {
  for (const invalid of ['', ' ', 'NaN', 'Infinity', '0', '-70', '7e1', '70 kg', '70.0001', '70,0.0']) {
    assert.equal(calculateBMI('metric', invalid, '175').invalidWeight, true, invalid);
    assert.equal(calculateBMI('metric', '70', invalid).invalidHeight, true, invalid);
  }
});
