import { Module }                             from 'vuex';
import { StelementuiDefaultState, IStelementuiState } from './state';
import { StelementuiActions }                     from './actions';
import { StelementuiGetters }                     from './getters';
import { StelementuiMutations }                   from './mutations';
import { IState }                                                 from '../../state';

export const StelementuiModule: Module<IStelementuiState, IState> = {
  namespaced: true,
  actions:    {
    ...StelementuiActions,
  },
  getters:    {
    ...StelementuiGetters,
  },
  state:      {
    ...StelementuiDefaultState(),
  },
  mutations:  {
    ...StelementuiMutations,
  },
};
