import { ILoginState } from './state';
import { PersistLocalStorage } from '../shared/plugins/vuex-persist/PersistLocalStorage';

export interface ILoginGetters {
  loginPending(state: ILoginState): boolean;
  getToken(): string;
}

export const LoginGetters: ILoginGetters = {
  loginPending(state: ILoginState): boolean {
    return state.loginPending;
  },
  getToken(): string {
    return new PersistLocalStorage().getItem('token');
  },
};
