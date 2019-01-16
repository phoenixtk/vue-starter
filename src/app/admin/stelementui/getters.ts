import { IStelementuiState } from './state';

export interface IStelementuiGetters {
  incrementPending(state: IStelementuiState): boolean;
  decrementPending(state: IStelementuiState): boolean;
  count(state: IStelementuiState): number;
}

export const StelementuiGetters: IStelementuiGetters = {
  incrementPending(state: IStelementuiState): boolean {
    return state.incrementPending;
  },
  decrementPending(state: IStelementuiState): boolean {
    return state.decrementPending;
  },
  count(state: IStelementuiState): number {
    return state.count;
  },
};
