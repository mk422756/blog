import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navbar from '~/components/organisms/Navbar.vue'
import VueCompositionApi from '@vue/composition-api'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueCompositionApi)

describe('BlogEntry', (): void => {
  let store: any
  let state: any

  beforeEach(() => {
    state = {
      user: {
        uid: 'aaaaa'
      }
    }
    store = new Vuex.Store({
      state
    })
  })

  it('ログイン時は新規作成とログアウトが表示される', () => {
    const wrapper = shallowMount(Navbar, {
      store,
      localVue,
      stubs: ['n-link']
    })
    expect(wrapper.find('.create-post').exists()).toBeTruthy()
    expect(wrapper.find('.login').exists()).toBeFalsy()
    expect(wrapper.find('.logout').exists()).toBeTruthy()
  })

  it('非ログイン時はログインだけ表示される', () => {
    store.state.user.uid = ''
    const wrapper = shallowMount(Navbar, {
      store,
      localVue,
      stubs: ['n-link']
    })
    expect(wrapper.find('.create-post').exists()).toBeFalsy()
    expect(wrapper.find('.login').exists()).toBeTruthy()
    expect(wrapper.find('.logout').exists()).toBeFalsy()
  })
})
