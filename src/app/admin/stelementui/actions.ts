import { ActionContext } from 'vuex';
import { IStelementuiState } from './state';
import { IState }        from '../../state';
import { HttpService }   from '../../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface IStelementuiResponse {
  count: number;
}

export interface IStelementuiActions {
  increment(context: ActionContext<IStelementuiState, IState>): Promise<any>;

  decrement(context: ActionContext<IStelementuiState, IState>): Promise<any>;
}

export const StelementuiActions: IStelementuiActions = {
  increment({ commit, state }: ActionContext<IStelementuiState, IState>): Promise<any> {
    commit('SET_INCREMENT_PENDING', true);

    return HttpService
    .put('/counter/increment', { count: state.count })
    .then((res: AxiosResponse<IStelementuiResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_INCREMENT_PENDING', false);
    })
    .catch(() => {
      commit('SET_INCREMENT_PENDING', false);
    });
  },
  decrement({ commit, state }: ActionContext<IStelementuiState, IState>): Promise<any> {
    commit('SET_DECREMENT_PENDING', true);

    return HttpService
    .put('/counter/decrement', { count: state.count })
    .then((res: AxiosResponse<IStelementuiResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_DECREMENT_PENDING', false);
    })
    .catch(() => commit('SET_DECREMENT_PENDING', false));
  },
};
