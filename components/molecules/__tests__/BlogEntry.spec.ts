import { shallowMount } from '@vue/test-utils'
import BlogEntry from '../BlogEntry.vue'

describe('CompositionApi', () => {
  it('renders a message', () => {
    const date = new Date()
    const title = 'test title'
    const image = 'image'
    const wrapper = shallowMount(BlogEntry, {
      propsData: {
        title: title,
        image: image,
        createdAt: date
      }
    })

    expect(wrapper.find('.title').text()).toBe(title)
    expect(wrapper.find('.createdAt').text()).toBe(date.toString())
    expect(wrapper.find('.image').attributes('src')).toBe(image)
  })
})
