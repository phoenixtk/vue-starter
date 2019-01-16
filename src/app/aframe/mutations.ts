import { IAframeState } from './state';

export interface IAframeMutations {
  SET_INCREMENT_PENDING(state: IAframeState, pending: boolean): void;

  SET_DECREMENT_PENDING(state: IAframeState, pending: boolean): void;

  SET_COUNT(state: IAframeState, count: number): void;

  SET_MESSAGE(state: IAframeState, version: string): void;
}

export const AframeMutations: IAframeMutations = {
  SET_INCREMENT_PENDING: (state: IAframeState, pending: boolean) => {
    state.incrementPending = pending;
  },
  SET_DECREMENT_PENDING: (state: IAframeState, pending: boolean) => {
    state.decrementPending = pending;
  },
  SET_COUNT:             (state: IAframeState, count: number) => {
    state.count = count;
  },
  SET_MESSAGE: (state: IAframeState, version: string) => {
    state.message = version;
  },
};
