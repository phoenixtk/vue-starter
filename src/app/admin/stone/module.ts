import { Module }                             from 'vuex';
import { StoneDefaultState, IStoneState } from './state';
import { StoneActions }                     from './actions';
import { StoneGetters }                     from './getters';
import { StoneMutations }                   from './mutations';
import { IState }                                                 from '../../state';

export const StoneModule: Module<IStoneState, IState> = {
  namespaced: true,
  actions:    {
    ...StoneActions,
  },
  getters:    {
    ...StoneGetters,
  },
  state:      {
    ...StoneDefaultState(),
  },
  mutations:  {
    ...StoneMutations,
  },
};
