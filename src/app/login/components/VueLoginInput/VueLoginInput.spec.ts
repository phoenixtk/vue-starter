import { createLocalVue, mount } from '@vue/test-utils';
import VueLoginInput                       from './VueLoginInput.vue';

const localVue = createLocalVue();

describe('VueLoginInput.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueLoginInput,
                          {
                            localVue,
                          },
    );

    expect(wrapper.find('h1').text()).toBe('VueLoginInput');
  });

});
