import { IStmoduleState } from './state';

export interface IStmoduleGetters {
  incrementPending(state: IStmoduleState): boolean;
  decrementPending(state: IStmoduleState): boolean;
  count(state: IStmoduleState): number;
  msg(state: IStmoduleState): string;
}

export const StmoduleGetters: IStmoduleGetters = {
  incrementPending(state: IStmoduleState): boolean {
    return state.incrementPending;
  },
  decrementPending(state: IStmoduleState): boolean {
    return state.decrementPending;
  },
  count(state: IStmoduleState): number {
    return state.count;
  },
  msg(state: IStmoduleState): string {
    return state.msg;
  },
};
