import { describe, it, expect } from 'vitest';

function calculateScaledQuantity(baseAmount: number, initialServings: number, targetServings: number): number {
  if (targetServings <= 0) return 0;
  return (baseAmount / initialServings) * targetServings;
}

describe('Recipe Serving Scaler', () => {
  it('correctly scales 2 servings to 4 servings', () => {
    expect(calculateScaledQuantity(200, 2, 4)).toBe(400);
  });

  it('correctly scales 2 servings to 1 serving', () => {
    expect(calculateScaledQuantity(150, 2, 1)).toBe(75);
  });

  it('handles zero target servings safely', () => {
    expect(calculateScaledQuantity(100, 2, 0)).toBe(0);
  });
});
