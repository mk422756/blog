<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <n-link class="navbar-item" to="/">
        <img
          src="~/assets/images/logo.png"
          width="112"
          height="28"
          alt="テクニカルパレード"
        />
      </n-link>

      <a
        v-if="$store.state.user.uid"
        class="navbar-item create-post"
        @click="createPost"
        >新規作成</a
      >
      <n-link
        v-if="!$store.state.user.uid"
        class="navbar-item login"
        to="/login"
        >ログイン</n-link
      >
      <p v-else class="navbar-item">ログイン中: {{ $store.state.user.uid }}</p>
      <n-link
        v-if="$store.state.user.uid"
        class="navbar-item logout"
        to="myposts"
        >マイ記事一覧</n-link
      >
      <a v-if="$store.state.user.uid" class="navbar-item logout" @click="logout"
        >ログアウト</a
      >
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { auth } from '~/plugins/firebase'
import PostApplicationService from '~/application/posts/postApplicationService'

export default defineComponent({
  setup(props, ctx) {
    const service = new PostApplicationService()
    async function createPost() {
      const post = await service.create(
        '',
        '',
        '',
        ctx.root.$store.state.user.uid
      )

      ctx.root.$router.push(`/posts/${post.id.value}/edit`)
    }

    async function logout() {
      try {
        await auth.signOut()
        ctx.root.$store.dispatch('user/setUID', '')
      } catch (e) {
        console.log(e)
        console.log(e.code, e.message)
      }
    }

    return { createPost, logout }
  }
})
</script>
