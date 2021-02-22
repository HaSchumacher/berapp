export function divide<T>(
  array: T[],
  number: number,
  initialValue: T[][] = []
): T[][] {
  if (array.length === 0) return initialValue;
  else {
    initialValue.push(array.splice(0, number));
    return divide(array, number, initialValue);
  }
}

export function flatten<T>(array: T[][]): T[] {
  return array.reduce((out, next) => out.concat(next));
}
