import { StmoduleGetters }      from './getters';
import { StmoduleDefaultState, IStmoduleState } from './state';

describe('StmoduleGetters', () => {
  let testState: IStmoduleState;

  beforeEach(() => {
    testState = StmoduleDefaultState();
  });

  test('it should get the count', () => {
    expect(StmoduleGetters.count(testState)).toBe(0);
  });

  test('it should get increment pending', () => {
    expect(StmoduleGetters.incrementPending(testState)).toBe(false);
  });

  test('it should get decrement pending', () => {
    expect(StmoduleGetters.decrementPending(testState)).toBe(false);
  });

});
