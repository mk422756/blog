import { mount, createLocalVue } from '@vue/test-utils'
import Sidebar from '~/components/organisms/Sidebar.vue'
import VueCompositionApi from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('Sidebar', (): void => {
  it('表示される', () => {
    const wrapper = mount(Sidebar, { localVue })
    expect(wrapper.exists()).toBeTruthy()
  })
})
