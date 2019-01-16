import { createLocalVue, mount } from '@vue/test-utils';
import VueInput                       from './VueInput.vue';

const localVue = createLocalVue();

describe('VueInput.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueInput,
                          {
                            localVue,
                          },
    );

    expect(wrapper.find('h1').text()).toBe('VueInput');
  });

});
