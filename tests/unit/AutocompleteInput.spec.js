import { enableAutoDestroy, shallowMount } from '@vue/test-utils'
import AutocompleteInput from '@/components/ui/AutocompleteInput.vue'

enableAutoDestroy(afterEach)

const factory = (props) => {
  return shallowMount(AutocompleteInput, {
    propsData: {
      ...props
    },
    attachToDocument: true
  })
}

describe('AutocompleteInput.vue', () => {
  it('renders text passed in props', () => {
    const wrapper = factory({ location: 'Orlando' })

    expect(wrapper.find('.autocomplete__input').element.value).toBe('Orlando')
  })
})

describe('AutocompleteInput.vue', () => {
  it('renders a list of suggestions', async () => {
    const wrapper = factory({ suggestions: ['1', '2', '3'] })

    wrapper.setData({ showSuggestions: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.autocomplete__suggestions').exists()).toBe(true)
  })
})
