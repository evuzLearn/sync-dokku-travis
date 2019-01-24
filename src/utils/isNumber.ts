export function isNumber(value: string): boolean {
  return !!value.match(/^[0-9]+(\.[0-9]*){0,1}$/g);
}
