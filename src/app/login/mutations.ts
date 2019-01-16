import { ILoginState } from './state';
import {PersistLocalStorage} from '../shared/plugins/vuex-persist/PersistLocalStorage';

export interface ILoginMutations {
  SET_LOGIN_PENDING(state: ILoginState, pending: boolean): void;
  SET_TOKEN(state: ILoginState, token: string): void;
}

export const LoginMutations: ILoginMutations = {
  SET_LOGIN_PENDING: (state: ILoginState, pending: boolean) => {
    state.loginPending = pending;
  },
  SET_TOKEN: (state: ILoginState, token: string) => {
    state.token = token;
    new PersistLocalStorage().setItem('token', token);
  },
};
