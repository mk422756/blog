<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <n-link class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </n-link>

      <a class="navbar-item" @click="createPost">新規作成</a>
      <n-link v-if="!$store.state.user.uid" class="navbar-item" to="/login"
        >ログイン</n-link
      >
      <p v-else class="navbar-item">ログイン中: {{ $store.state.user.uid }}</p>
    </div>
  </nav>
</template>
<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { db } from '~/plugins/firebase'

export default createComponent({
  setup(props, ctx) {
    async function createPost() {
      const postRef = db.collection('posts').doc()
      await postRef.set({
        title: '',
        md: '',
        html: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDraft: true,
        createdBy: ctx.root.$store.state.user.uid
      })

      ctx.root.$router.push(`/posts/${postRef.id}/edit`)
    }

    return { createPost }
  }
})
</script>
