import { IStmoduleState } from './state';

export interface IStmoduleMutations {
  SET_INCREMENT_PENDING(state: IStmoduleState, pending: boolean): void;

  SET_DECREMENT_PENDING(state: IStmoduleState, pending: boolean): void;

  SET_COUNT(state: IStmoduleState, count: number): void;

  ST_RENDER(state: IStmoduleState, msg: string): void;
}

export const StmoduleMutations: IStmoduleMutations = {
  SET_INCREMENT_PENDING: (state: IStmoduleState, pending: boolean) => {
    state.incrementPending = pending;
  },
  SET_DECREMENT_PENDING: (state: IStmoduleState, pending: boolean) => {
    state.decrementPending = pending;
  },
  SET_COUNT:             (state: IStmoduleState, count: number) => {
    state.count = count;
  },
  ST_RENDER:             (state: IStmoduleState, msg: string) => {
    state.msg = msg;
  },
};
