import { StelementuiGetters }      from './getters';
import { StelementuiDefaultState, IStelementuiState } from './state';

describe('StelementuiGetters', () => {
  let testState: IStelementuiState;

  beforeEach(() => {
    testState = StelementuiDefaultState();
  });

  test('it should get the count', () => {
    expect(StelementuiGetters.count(testState)).toBe(0);
  });

  test('it should get increment pending', () => {
    expect(StelementuiGetters.incrementPending(testState)).toBe(false);
  });

  test('it should get decrement pending', () => {
    expect(StelementuiGetters.decrementPending(testState)).toBe(false);
  });

});
