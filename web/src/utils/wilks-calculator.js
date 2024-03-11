export const calculateWilksCoefficient = (weight, gender, amountLifted) => {
  const a = gender === 'M' ? -216.0475144 : 594.31747775582
  const b = gender === 'M' ? 16.2606339 : -27.23842536447
  const c = gender === 'M' ? -0.002388645 : 0.82112226871
  const d = gender === 'M' ? -0.00113732 : -0.00930733913
  const e = gender === 'M' ? 7.01863e-6 : 4.731582e-5
  const f = gender === 'M' ? -1.291e-8 : -9.054e-8

  const sum =
    a +
    b * weight +
    c * Math.pow(weight, 2) +
    d * Math.pow(weight, 3) +
    e * Math.pow(weight, 4) +
    f * Math.pow(weight, 5)

  const coefficient = 500 / sum

  return coefficient * amountLifted
}
