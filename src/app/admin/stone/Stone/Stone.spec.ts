import { createLocalVue, mount }               from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import Stone                                 from './Stone.vue';
import { StoneGetters, IStoneGetters }     from '../getters';
import { StoneDefaultState, IStoneState }  from '../state';
import { StoneActions, IStoneActions }     from '../actions';
import { i18n }                                from '../../../shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Stone.vue', () => {
  let store: Store<IStoneState>;
  let getters: GetterTree<IStoneState, IStoneGetters>;
  let actions: ActionTree<IStoneState, IStoneActions>;
  let state: IStoneState;

  beforeEach(() => {
    getters = {
      ...StoneGetters,
    };
    actions = {
      ...StoneActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...StoneDefaultState(),
    };

    store = new Vuex.Store({
                             modules: {
                               stone: {
                                 namespaced: true,
                                 getters,
                                 actions,
                                 state,
                               },
                             },
                           } as any);
  });

  test('renders component', () => {
    const wrapper = mount(Stone, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Stone');
  });

  test('should increment and decrement', () => {
    const wrapper: any = mount(Stone, {
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

    Stone.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`stone/increment`);
  });

});
