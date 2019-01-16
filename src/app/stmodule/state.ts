export interface IStmoduleState {
  incrementPending: boolean;
  decrementPending: boolean;
  count: number;
  msg: string;
}

export const StmoduleDefaultState = (): IStmoduleState => {
  return {
    incrementPending: false,
    decrementPending: false,
    count:            0,
    msg: '',
  };
};
