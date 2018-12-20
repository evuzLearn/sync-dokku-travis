export function isNumber(value: string) {
  return value.match(/^[0-9]+(\.[0-9]*){0,1}$/g);
}
