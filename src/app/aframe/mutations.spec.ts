import { AframeMutations }                   from './mutations';
import { AframeDefaultState, IAframeState } from './state';

describe('AframeMutations', () => {
  let testState: IAframeState;

  beforeEach(() => {
    testState = AframeDefaultState();
  });

  test('it should set the count', () => {
    AframeMutations.SET_COUNT(testState, 1337);
    expect(testState.count).toBe(1337);
  });

  test('it should set increment pending', () => {
    AframeMutations.SET_INCREMENT_PENDING(testState, true);
    expect(testState.incrementPending).toBe(true);
  });

  test('it should set decrement pending', () => {
    AframeMutations.SET_DECREMENT_PENDING(testState, true);
    expect(testState.decrementPending).toBe(true);
  });

});
