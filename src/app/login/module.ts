import { Module }                             from 'vuex';
import { LoginDefaultState, ILoginState }     from './state';
import { LoginActions }                     from './actions';
import { LoginGetters }                     from './getters';
import { LoginMutations }                   from './mutations';
import { IState }                           from '../state';

export const LoginModule: Module<ILoginState, IState> = {
  namespaced: true,
  actions:    {
    ...LoginActions,
  },
  getters:    {
    ...LoginGetters,
  },
  state:      {
    ...LoginDefaultState(),
  },
  mutations:  {
    ...LoginMutations,
  },
};
