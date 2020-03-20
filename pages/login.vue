<template>
  <div class="column is-one-third">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="state.email" />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="state.password" />
      </div>
    </div>
    <button class="button is-primary" @click="submit">Submit</button>
    <p v-if="state.errMsg" class="has-text-danger">{{ state.errMsg }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'
import { auth } from '~/plugins/firebase'

export default defineComponent({
  setup(props, ctx) {
    const state = reactive<{ email: string; password: string; errMsg: string }>(
      {
        email: '',
        password: '',
        errMsg: ''
      }
    )

    async function submit() {
      try {
        const cred = await auth.signInWithEmailAndPassword(
          state.email,
          state.password
        )

        if (!cred.user) {
          throw new Error()
        }

        ctx.root.$router.push('/')
      } catch (e) {
        if (e.code === 'auth/invalid-email') {
          state.errMsg = 'メールアドレスの形式が正しくありません'
        } else if (
          e.code === 'auth/user-not-found' ||
          e.code === 'auth/wrong-password'
        ) {
          state.errMsg = 'パスワードが違います'
        } else {
          state.errMsg = 'エラーが発生しました。もう一度やり直してください'
        }
        console.log(e)
        console.log(e.code, e.message)
      }
    }
    return {
      state,
      submit
    }
  }
})
</script>
