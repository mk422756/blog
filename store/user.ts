import { ActionTree, MutationTree, GetterTree } from 'vuex'

export interface RootState {}

export interface UsersState {
  uid: string
}

export const state = () => ({
  uid: ''
})

export const actions: ActionTree<UsersState, RootState> = {
  setUID({ commit }, uid) {
    commit('setUID', uid)
  }
}

export const mutations: MutationTree<UsersState> = {
  setUID(state, uid) {
    state.uid = uid
  }
}

export const getters: GetterTree<UsersState, RootState> = {
  isLogin: (state): boolean => {
    return !!state.uid
  }
}
