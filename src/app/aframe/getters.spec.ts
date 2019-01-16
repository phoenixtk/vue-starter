import { AframeGetters }      from './getters';
import { AframeDefaultState, IAframeState } from './state';

describe('AframeGetters', () => {
  let testState: IAframeState;

  beforeEach(() => {
    testState = AframeDefaultState();
  });

  test('it should get the count', () => {
    expect(AframeGetters.count(testState)).toBe(0);
  });

  test('it should get increment pending', () => {
    expect(AframeGetters.incrementPending(testState)).toBe(false);
  });

  test('it should get decrement pending', () => {
    expect(AframeGetters.decrementPending(testState)).toBe(false);
  });

});
