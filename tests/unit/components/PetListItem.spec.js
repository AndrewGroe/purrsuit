import { shallowMount } from '@vue/test-utils'
import PetListItem from '@/components/PetListItem.vue'

const factory = (propsData) => {
  return shallowMount(PetListItem, {
    propsData: {
      pet: {
        name: 'Sparky',
        species: 'dog',
        gender: 'male',
        breeds: { primary: 'German Shepherd' },
        age: 'puppy',
        contact: {
          address: {
            city: 'Orlando',
            state: 'FL'
          }
        },
        url: 'http://example.com',
        ...propsData
      }
    }
  })
}

describe('PetListItem.vue', () => {
  it('renders pet info', () => {
    const wrapper = factory()

    expect(wrapper.find('.pet__name').text()).toMatch(wrapper.vm.pet.name)
    expect(wrapper.find('.pet__species').text()).toMatch(wrapper.vm.pet.species)
    expect(wrapper.find('.pet__gender').text()).toMatch(wrapper.vm.pet.gender)
    expect(wrapper.find('.pet__breed').text()).toMatch(wrapper.vm.pet.breeds.primary)
    expect(wrapper.find('.pet__age').text()).toMatch(wrapper.vm.pet.age)
    expect(wrapper.find('.pet__location').text()).toMatch(`${wrapper.vm.pet.contact.address.city}, ${wrapper.vm.pet.contact.address.state}`)
    expect(wrapper.find('a').attributes('href')).toMatch(wrapper.vm.pet.url)
  })
})

describe('PetListItem.vue', () => {
  it('renders default image', () => {
    const wrapper = factory()

    expect(wrapper.find({ name: 'CardLayout' }).props('imgSrc')).toMatch('https://cdn.pixabay.com/photo/2014/04/03/00/42/footprints-309158_960_720.png')
  })
})

describe('PetListItem.vue', () => {
  it('renders provided image', () => {
    const wrapper = factory({ photos: [{ large: 'http://example.com' }] })

    expect(wrapper.find({ name: 'CardLayout' }).props('imgSrc')).toMatch('http://example.com')
  })
})
