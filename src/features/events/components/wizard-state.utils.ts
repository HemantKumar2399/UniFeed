export function calculateNextStep(current: number, max: number): number {
  return Math.min(current + 1, max);
}
export function calculatePrevStep(current: number, min: number): number {
  return Math.max(current - 1, min);
}
