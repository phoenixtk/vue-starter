import { ActionContext } from 'vuex';
import { IAframeState }  from './state';
import { IState }        from '../state';
import { HttpService }   from '../shared/services/HttpService';
import { AxiosResponse } from 'axios';
import {IAppState}       from '../app/state';

export interface IAframeResponse {
  count: number;
}

export interface IAframeActions {
  increment(context: ActionContext<IAframeState, IState>): Promise<any>;

  decrement(context: ActionContext<IAframeState, IState>): Promise<any>;

  setAMessage(context: ActionContext<IAframeState, IAppState>, version: string): Promise<any>;
}

export const AframeActions: IAframeActions = {
  increment({ commit, state }: ActionContext<IAframeState, IState>): Promise<any> {
    commit('SET_INCREMENT_PENDING', true);

    return HttpService
    .put('/counter/increment', { count: state.count })
    .then((res: AxiosResponse<IAframeResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_INCREMENT_PENDING', false);
    })
    .catch(() => {
      commit('SET_INCREMENT_PENDING', false);
    });
  },
  decrement({ commit, state }: ActionContext<IAframeState, IState>): Promise<any> {
    commit('SET_DECREMENT_PENDING', true);

    return HttpService
    .put('/counter/decrement', { count: state.count })
    .then((res: AxiosResponse<IAframeResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_DECREMENT_PENDING', false);
    })
    .catch(() => commit('SET_DECREMENT_PENDING', false));
  },
  setAMessage({ commit, state }: ActionContext<IAframeState, IAppState>, message: string): Promise<any> {
    commit('SET_MESSAGE', message);
    return HttpService
      .put('/counter/decrement', { count: state.message });
  },
};
