import { createLocalVue, mount }               from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import Aframe                                 from './Aframe.vue';
import { AframeGetters, IAframeGetters }     from '../getters';
import { AframeDefaultState, IAframeState }  from '../state';
import { AframeActions, IAframeActions }     from '../actions';
import { i18n }                                from '../../shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Aframe.vue', () => {
  let store: Store<IAframeState>;
  let getters: GetterTree<IAframeState, IAframeGetters>;
  let actions: ActionTree<IAframeState, IAframeActions>;
  let state: IAframeState;

  beforeEach(() => {
    getters = {
      ...AframeGetters,
    };
    actions = {
      // ...AframeActions,
      // increment: jest.fn(),
      // decrement: jest.fn(),
    };
    state = {
      ...AframeDefaultState(),
    };

    store = new Vuex.Store({
                             modules: {
                               aframe: {
                                 namespaced: true,
                                 getters,
                                 actions,
                                 state,
                               },
                             },
                           } as any);
  });

  test('renders component', () => {
    const wrapper = mount(Aframe, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Aframe');
  });

  test('should increment and decrement', () => {
    const wrapper: any = mount(Aframe, {
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

    Aframe.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`aframe/increment`);
  });

});
