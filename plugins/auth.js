import { auth } from '~/plugins/firebase'
export default ({ store }) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      store.dispatch('user/setUID', user.uid)
    }
  })
}
