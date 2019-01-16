import { IAframeState } from './state';
import {IAppState} from '../app/state';

export interface IAframeGetters {
  incrementPending(state: IAframeState): boolean;
  decrementPending(state: IAframeState): boolean;
  count(state: IAframeState): number;
  getMessage(state: IAframeState): string;
}

export const AframeGetters: IAframeGetters = {
  incrementPending(state: IAframeState): boolean {
    return state.incrementPending;
  },
  decrementPending(state: IAframeState): boolean {
    return state.decrementPending;
  },
  count(state: IAframeState): number {
    return state.count;
  },
  getMessage(state: IAframeState): string {
    return state.message;
  },
};
