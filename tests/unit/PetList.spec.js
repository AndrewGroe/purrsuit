import { shallowMount } from '@vue/test-utils'
import PetList from '@/components/PetList.vue'

const factory = (storeData) => {
  return shallowMount(PetList, {
    mocks: {
      $store: {
        state: {
          ...storeData
        }
      }
    },
    stubs: ['router-link']
  })
}

describe('PetList.vue', () => {
  it('renders a list of pets', () => {
    const wrapper = factory({ pets: [{}, {}, {}] })

    expect(wrapper.findAll({ name: 'PetListItem' }).length).toBe(3)
  })
})

describe('PetList.vue', () => {
  it('renders a loading spinner', () => {
    const wrapper = factory({ pets: [], loading: true })

    expect(wrapper.find({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })
})

describe('PetList.vue', () => {
  it('renders a location modal', async () => {
    const wrapper = factory({ pets: [], loading: false })
    wrapper.setData({ showModal: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find({ name: 'LocationModal' }).exists()).toBe(true)
  })
})

describe('PetList.vue', () => {
  it('renders pagination controls', () => {
    const wrapper = factory({ pets: [{}, {}, {}], loading: false })

    expect(wrapper.find('.pagination').exists()).toBe(true)
  })
})
