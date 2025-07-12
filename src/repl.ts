export function cleanInput(input: string): string[] {
  const result = input
    .trim()
    .replaceAll(" ", ",")
    .split(",")
    .filter((element) => element.length !== 0);
  return result;
}
