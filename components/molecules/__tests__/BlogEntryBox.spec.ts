import { shallowMount, createLocalVue } from '@vue/test-utils'
import BlogEntryBox from '../BlogEntryBox.vue'
import BlogEntryImage from '~/components/atoms/BlogEntryImage.vue'
import VueCompositionApi from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('BlogEntry', () => {
  it('正常に表示される', () => {
    const dateStr = '2013/01/23 12:34:56'
    const date = new Date(dateStr)
    const id = 'aaaaa'
    const title = 'test title'
    const image = 'image'
    const wrapper = shallowMount(BlogEntryBox, {
      localVue,
      propsData: {
        id: id,
        title: title,
        image: image,
        createdAt: date
      },
      stubs: ['n-link']
    })
    expect(wrapper.find('.title').text()).toBe(title)
    expect(wrapper.find('.created-at').text()).toBe(dateStr)
    expect(wrapper.find(BlogEntryImage)).toBeTruthy()
  })
})
