export interface IAframeState {
  incrementPending: boolean;
  decrementPending: boolean;
  count: number;
  message: string;
}

export const AframeDefaultState = (): IAframeState => {
  return {
    incrementPending: false,
    decrementPending: false,
    count:            0,
    message:              '111',
  };
};
