import { ActionContext } from 'vuex';
import { IStoneState } from './state';
import { IState }        from '../../state';
import { HttpService }   from '../../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface IStoneResponse {
  count: number;
}

export interface IStoneActions {
  getUserList(context: ActionContext<IStoneState, IState>): Promise<any>;
}

export const StoneActions: IStoneActions = {
  getUserList({ commit, state }: ActionContext<IStoneState, IState>): Promise<any> {
    console.log('getuserlist in');
    return HttpService
    .put('/user/list', {
      page: 1,
      size: 10,
    })
    .then((res: AxiosResponse<IStoneResponse>) => {
      commit('SET_USERLIST', res.data);
    })
    .catch(() => {
      // no next
    });
  },
};
