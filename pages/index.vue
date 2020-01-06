<template>
  <div>
    <ul>
      <li v-for="post in state.posts" :key="post.id">
        <blog-entry
          :id="post.id"
          :title="post.title"
          :image="post.image"
          :created-at="post.createdAt.toDate()"
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { createComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntry from '~/components/molecules/BlogEntry.vue'
import { db } from '~/plugins/firebase'

export default createComponent({
  components: {
    BlogEntry
  },
  setup() {
    const state = reactive<{ posts: any[] }>({
      posts: []
    })
    const fetchData = async (): Promise<void> => {
      const posts = await db.collection('posts').get()
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
