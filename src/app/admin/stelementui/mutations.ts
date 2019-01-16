import { IStelementuiState } from './state';

export interface IStelementuiMutations {
  SET_INCREMENT_PENDING(state: IStelementuiState, pending: boolean): void;

  SET_DECREMENT_PENDING(state: IStelementuiState, pending: boolean): void;

  SET_COUNT(state: IStelementuiState, count: number): void;
}

export const StelementuiMutations: IStelementuiMutations = {
  SET_INCREMENT_PENDING: (state: IStelementuiState, pending: boolean) => {
    state.incrementPending = pending;
  },
  SET_DECREMENT_PENDING: (state: IStelementuiState, pending: boolean) => {
    state.decrementPending = pending;
  },
  SET_COUNT:             (state: IStelementuiState, count: number) => {
    state.count = count;
  },
};
