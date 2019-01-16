export interface IStelementuiState {
  incrementPending: boolean;
  decrementPending: boolean;
  count: number;
}

export const StelementuiDefaultState = (): IStelementuiState => {
  return {
    incrementPending: false,
    decrementPending: false,
    count:            0,
  };
};
