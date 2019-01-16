import { Module }                             from 'vuex';
import { StmoduleDefaultState, IStmoduleState } from './state';
import { StmoduleActions }                     from './actions';
import { StmoduleGetters }                     from './getters';
import { StmoduleMutations }                   from './mutations';
import { IState }                                                 from '../state';

export const StmoduleModule: Module<IStmoduleState, IState> = {
  namespaced: true,
  actions:    {
    ...StmoduleActions,
  },
  getters:    {
    ...StmoduleGetters,
  },
  state:      {
    ...StmoduleDefaultState(),
  },
  mutations:  {
    ...StmoduleMutations,
  },
};
