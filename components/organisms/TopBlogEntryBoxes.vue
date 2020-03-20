<template>
  <div class="columns is-multiline wrapper">
    <div v-for="post in state.posts" :key="post.id" class="column is-half">
      <blog-entry-box
        :id="post.id"
        :title="post.title"
        :image="post.image"
        :created-at="post.createdAt.toDate()"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntryBox from '~/components/molecules/BlogEntryBox.vue'
import { db } from '~/plugins/firebase'

export default defineComponent({
  components: {
    BlogEntryBox
  },
  setup() {
    const state = reactive<{ posts: any[] }>({
      posts: []
    })
    const fetchData = async (): Promise<void> => {
      const posts = await db
        .collection('posts')
        .where('isDraft', '==', false)
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
