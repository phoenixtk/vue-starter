import { createLocalVue, mount } from '@vue/test-utils';
import VueButton                       from './VueButton.vue';

const localVue = createLocalVue();

describe('VueButton.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueButton,
                          {
                            localVue,
                          },
    );

    expect(wrapper.find('h1').text()).toBe('VueButton');
  });

});
