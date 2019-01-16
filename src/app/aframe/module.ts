import { Module }                             from 'vuex';
import { AframeDefaultState, IAframeState } from './state';
import { AframeActions }                     from './actions';
import { AframeGetters }                     from './getters';
import { AframeMutations }                   from './mutations';
import { IState }                            from '../state';

export const AframeModule: Module<IAframeState, IState> = {
  namespaced: true,
  actions:    {
    ...AframeActions,
  },
  getters:    {
    ...AframeGetters,
  },
  state:      {
    ...AframeDefaultState(),
  },
  mutations:  {
    ...AframeMutations,
  },
};
