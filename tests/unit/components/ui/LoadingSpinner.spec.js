import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

describe('LoadingSpinner.vue', () => {
  it('renders a message from prop', () => {
    const wrapper = shallowMount(LoadingSpinner, { propsData: { msg: 'testing' } })
    expect(wrapper.find('.loader__msg').text()).toBe('testing')
  })
})
