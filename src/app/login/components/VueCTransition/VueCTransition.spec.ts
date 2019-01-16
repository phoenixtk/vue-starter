import { createLocalVue, mount } from '@vue/test-utils';
import VueCTransition                       from './VueCTransition.vue';

const localVue = createLocalVue();

describe('VueCTransition.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueCTransition,
                          {
                            localVue,
                          },
    );

    expect(wrapper.find('h1').text()).toBe('VueCTransition');
  });

});
