import { StmoduleMutations }                   from './mutations';
import { StmoduleDefaultState, IStmoduleState } from './state';

describe('StmoduleMutations', () => {
  let testState: IStmoduleState;

  beforeEach(() => {
    testState = StmoduleDefaultState();
  });

  test('it should set the count', () => {
    StmoduleMutations.SET_COUNT(testState, 1337);
    expect(testState.count).toBe(1337);
  });

  test('it should set increment pending', () => {
    StmoduleMutations.SET_INCREMENT_PENDING(testState, true);
    expect(testState.incrementPending).toBe(true);
  });

  test('it should set decrement pending', () => {
    StmoduleMutations.SET_DECREMENT_PENDING(testState, true);
    expect(testState.decrementPending).toBe(true);
  });

});
