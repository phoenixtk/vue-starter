import { createLocalVue, mount }               from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import Stmodule                                 from './Stmodule.vue';
import { StmoduleGetters, IStmoduleGetters }     from '../getters';
import { StmoduleDefaultState, IStmoduleState }  from '../state';
import { StmoduleActions, IStmoduleActions }     from '../actions';
import { i18n }                                from '../../shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Stmodule.vue', () => {
  let store: Store<IStmoduleState>;
  let getters: GetterTree<IStmoduleState, IStmoduleGetters>;
  let actions: ActionTree<IStmoduleState, IStmoduleActions>;
  let state: IStmoduleState;

  beforeEach(() => {
    getters = {
      ...StmoduleGetters,
    };
    actions = {
      ...StmoduleActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...StmoduleDefaultState(),
    };

    store = new Vuex.Store({
                             modules: {
                               stmodule: {
                                 namespaced: true,
                                 getters,
                                 actions,
                                 state,
                               },
                             },
                           } as any);
  });

  test('renders component', () => {
    const wrapper = mount(Stmodule, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Stmodule');
  });

  test('should increment and decrement', () => {
    const wrapper: any = mount(Stmodule, {
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

    Stmodule.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`stmodule/increment`);
  });
});
