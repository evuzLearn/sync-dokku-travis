export function sliceArrayIntoGroups(arr, size) {
  let step = 0;
  const sliceArr = [];
  const len = arr.length;
  while (step < len) {
    const start = step;
    step = step + size;
    sliceArr.push(arr.slice(start, step));
  }
  return sliceArr;
}
