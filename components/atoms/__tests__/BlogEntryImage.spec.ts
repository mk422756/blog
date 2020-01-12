import { shallowMount, createLocalVue } from '@vue/test-utils'
import BlogEntryImage from '../BlogEntryImage.vue'
import VueCompositionApi from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('BlogEntryImage', () => {
  it('propsでURLが渡された時に画像に表示される', () => {
    const image = 'image'
    const wrapper = shallowMount(BlogEntryImage, {
      propsData: {
        image: image
      },
      localVue
    })
    expect(wrapper.find('.image').attributes('src')).toBe(image)
  })
  it('propsでURLが渡されなかった時にデフォルト画像に表示される', () => {
    const image = 'image'
    const wrapper = shallowMount(BlogEntryImage, {
      localVue
    })
    // TODO　デフォルト画像が決まったら変更する
    expect(wrapper.find('.image')).toBeTruthy()
  })
})
