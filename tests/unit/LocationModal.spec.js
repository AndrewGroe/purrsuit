import { enableAutoDestroy, shallowMount } from '@vue/test-utils'
import LocationModal from '@/components/LocationModal.vue'

// calls wrapper.destroy() after each test
enableAutoDestroy(afterEach)

const factory = (storeData) => {
  return shallowMount(LocationModal, {
    mocks: {
      $store: {
        state: {
          ...storeData
        }
      }
    },
    attachToDocument: true
  })
}

describe('LocationModal.vue', () => {
  it('renders an AutocompleteInput component', () => {
    const wrapper = factory()

    expect(wrapper.find({ name: 'AutocompleteInput' }).exists()).toBe(true)
  })
})

describe('LocationModal.vue', () => {
  it('emits event & payload on confirm-btn click', async () => {
    const wrapper = factory()
    const confirmButton = wrapper.find('.confirm-btn')

    wrapper.setData({ input: 'Orlando', selectedDistance: 10 })

    confirmButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('done')).toBeTruthy()
    expect(wrapper.emitted('done')[0][0]).toEqual({ 'input': 'Orlando', 'selectedDistance': 10 })
  })
})

describe('LocationModal.vue', () => {
  it('handles enter keypress', async () => {
    const wrapper = factory()
    const input = wrapper.find('.location__input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('done')).toBeTruthy()
  })
})

describe('LocationModal.vue', () => {
  it('handles distance selection', async () => {
    const wrapper = factory()
    const dropdown = wrapper.find('#distances')
    dropdown.setValue('5')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedDistance).toBe(5)
  })
})
