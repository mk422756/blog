<template>
  <div class="columns is-multiline wrapper">
    <div v-for="post in state.posts" :key="post.id" class="column is-half">
      <blog-entry-box
        :id="post.id"
        :title="post.title"
        :image="post.image"
        :is-draft="post.isDraft"
        :created-at="post.createdAt.toDate()"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { createComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntryBox from '~/components/molecules/BlogEntryBox.vue'
import { db } from '~/plugins/firebase'

export default createComponent({
  components: {
    BlogEntryBox
  },
  setup(props, ctx) {
    const state = reactive<{ posts: any[] }>({
      posts: []
    })
    const fetchData = async (): Promise<void> => {
      if (!ctx.root.$store.getters['user/isLogin']) {
        return
      }
      const posts = await db
        .collection('posts')
        .where('createdBy', '==', ctx.root.$store.state.user.uid)
        .get()
      posts.forEach((post) => {
        const data = post.data()
        data.id = post.id
        state.posts.push(data)
      })
    }
    fetchData()

    return {
      state
    }
  }
})
</script>
