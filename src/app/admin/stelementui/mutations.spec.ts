import { StelementuiMutations }                   from './mutations';
import { StelementuiDefaultState, IStelementuiState } from './state';

describe('StelementuiMutations', () => {
  let testState: IStelementuiState;

  beforeEach(() => {
    testState = StelementuiDefaultState();
  });

  test('it should set the count', () => {
    StelementuiMutations.SET_COUNT(testState, 1337);
    expect(testState.count).toBe(1337);
  });

  test('it should set increment pending', () => {
    StelementuiMutations.SET_INCREMENT_PENDING(testState, true);
    expect(testState.incrementPending).toBe(true);
  });

  test('it should set decrement pending', () => {
    StelementuiMutations.SET_DECREMENT_PENDING(testState, true);
    expect(testState.decrementPending).toBe(true);
  });

});
