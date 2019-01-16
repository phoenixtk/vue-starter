import { ActionContext } from 'vuex';
import { IStmoduleState } from './state';
import { IState }        from '../state';
import { HttpService }   from '../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface IStmoduleResponse {
  count: number;
  msg: string;
}

export interface IStmoduleActions {
  increment(context: ActionContext<IStmoduleState, IState>): Promise<any>;

  decrement(context: ActionContext<IStmoduleState, IState>): Promise<any>;
}

export const StmoduleActions: IStmoduleActions = {
  increment({ commit, state }: ActionContext<IStmoduleState, IState>): Promise<any> {
    commit('SET_INCREMENT_PENDING', true);

    return HttpService
    .put('/counter/increment', { count: state.count }, { params: { userMock: true } })
    .then((res: AxiosResponse<IStmoduleResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_INCREMENT_PENDING', false);
    })
    .catch(() => {
      commit('SET_INCREMENT_PENDING', false);
    });
  },
  decrement({ commit, state }: ActionContext<IStmoduleState, IState>): Promise<any> {
    commit('SET_DECREMENT_PENDING', true);

    return HttpService
    .put('/counter/decrement', { count: state.count }, { params: { userMock: true } })
    .then((res: AxiosResponse<IStmoduleResponse>) => {
      commit('SET_COUNT', res.data.count);
      commit('SET_DECREMENT_PENDING', false);
    })
    .catch(() => commit('SET_DECREMENT_PENDING', false));
  },
};
