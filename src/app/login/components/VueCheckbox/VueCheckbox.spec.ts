import { createLocalVue, mount } from '@vue/test-utils';
import VueCheckbox                       from './VueCheckbox.vue';

const localVue = createLocalVue();

describe('VueCheckbox.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueCheckbox,
                          {
                            localVue,
                          },
    );

    expect(wrapper.find('h1').text()).toBe('VueCheckbox');
  });

});
