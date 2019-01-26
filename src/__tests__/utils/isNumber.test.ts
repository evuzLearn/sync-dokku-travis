import { isNumber } from '../../utils/isNumber';

describe('Util isNumber', () => {
  test('should return false', () => {
    expect(isNumber('One')).toEqual(false);
  });

  test('should return true', () => {
    expect(isNumber('01')).toEqual(true);
  });
});
