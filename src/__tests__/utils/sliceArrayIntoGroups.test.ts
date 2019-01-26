import { sliceArrayIntoGroups } from '../../utils/sliceArrayIntoGroups';

describe('Util sliceArrayIntoGroups', () => {
  test('should return four five-element arrays', () => {
    const size = 4;
    const length = 20;
    const array = Array.from({ length }).map((_, i) => i);
    const grouped = sliceArrayIntoGroups(array, size);
    expect(grouped.length).toBe(length / size);
    grouped.forEach(el => {
      expect(el.length).toBe(size);
    });
  });

  test('should return last unfulfilled item', () => {
    const size = 4;
    const length = 22;
    const array = Array.from({ length }).map((_, i) => i);
    const grouped = sliceArrayIntoGroups(array, size);
    expect(grouped.length).toBe(Math.ceil(length / size));
    expect(grouped[grouped.length - 1].length).not.toBe(size);
  });
});
