import { shallowMount } from '@vue/test-utils'
import PetCategories from '@/components/PetCategories.vue'

const factory = (storeData) => {
  return shallowMount(PetCategories, {
    mocks: {
      $store: {
        state: {
          ...storeData
        }
      }
    }
  })
}
describe('PetCategories.vue', () => {
  it('renders a list of categories', () => {
    const wrapper = factory({ categories: ['dog', 'cat', 'fish'] })
    expect(wrapper.findAll('.categories__item').length).toBe(3)
  })
})

describe('PetCategories.vue', () => {
  it('renders a loading spinner', () => {
    const wrapper = factory({ loading: true })

    expect(wrapper.find({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })
})

describe('PetCategories.vue', () => {
  it('renders a location modal', () => {
    const wrapper = factory({ userLocation: '' })

    expect(wrapper.find({ name: 'LocationModal' }).exists()).toBe(true)
  })
})
