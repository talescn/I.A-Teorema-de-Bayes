export function calculateBayesTheorem(
  priorProbability: number,
  sensitivity: number,
  falsePositiveRate: number
) {
  // P(¬A) = 1 - P(A)
  const notA = 1 - priorProbability;

  // Numerator = P(B|A) * P(A)
  const numerator = sensitivity * priorProbability;

  // Denominator = P(B|A) * P(A) + P(B|¬A) * P(¬A)
  const denominator = (sensitivity * priorProbability) + (falsePositiveRate * notA);

  // P(A|B) = Numerator / Denominator
  const posteriorProbability = numerator / denominator;

  return {
    notA,
    numerator,
    denominator,
    posteriorProbability
  };
}