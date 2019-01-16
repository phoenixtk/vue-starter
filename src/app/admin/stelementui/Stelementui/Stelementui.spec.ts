import { createLocalVue, mount }               from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import Stelementui                                 from './Stelementui.vue';
import { StelementuiGetters, IStelementuiGetters }     from '../getters';
import { StelementuiDefaultState, IStelementuiState }  from '../state';
import { StelementuiActions, IStelementuiActions }     from '../actions';
import { i18n }                                from '../../../shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Stelementui.vue', () => {
  let store: Store<IStelementuiState>;
  let getters: GetterTree<IStelementuiState, IStelementuiGetters>;
  let actions: ActionTree<IStelementuiState, IStelementuiActions>;
  let state: IStelementuiState;

  beforeEach(() => {
    getters = {
      ...StelementuiGetters,
    };
    actions = {
      ...StelementuiActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...StelementuiDefaultState(),
    };

    store = new Vuex.Store({
                             modules: {
                               stelementui: {
                                 namespaced: true,
                                 getters,
                                 actions,
                                 state,
                               },
                             },
                           } as any);
  });

  test('renders component', () => {
    const wrapper = mount(Stelementui, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Stelementui');
  });

  test('should increment and decrement', () => {
    const wrapper: any = mount(Stelementui, {
      store,
      localVue,
      i18n,
    });

    wrapper.vm.increment();
    expect(actions.increment).toHaveBeenCalled();

    wrapper.vm.decrement();
    expect(actions.decrement).toHaveBeenCalled();
  });

  test('dispatches action on the server', () => {
    store.dispatch = jest.fn();

    Stelementui.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`stelementui/increment`);
  });

});
