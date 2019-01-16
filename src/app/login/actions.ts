import { ActionContext } from 'vuex';
import { ILoginState } from './state';
import { IState }        from '../state';
import { HttpService }   from '../shared/services/HttpService';
import { AxiosResponse } from 'axios';

export interface ILoginResponse {
  code: number;
  data: {
    id: number;
    nickname: string;
    secret: string;
    token: string;
    username: string;
  };
}

export interface ILoginActions {
  login(context: ActionContext<ILoginState, IState>, ha: PageInfo): Promise<any>;
}

interface PageInfo {
  username: string;
  password: string;
}

export const LoginActions: ILoginActions = {
  login({ commit, state }: ActionContext<ILoginState, IState>, page: PageInfo): Promise<any> {
    console.log(page);
    commit('SET_LOGIN_PENDING', true);
    return HttpService
    .post('/user/auth', page);
  },
};
