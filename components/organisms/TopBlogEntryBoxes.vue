<template>
  <div class="columns is-multiline wrapper">
    <div v-for="post in state.posts" :key="post.id" class="column is-half">
      <blog-entry-box
        :id="post.id"
        :title="post.title"
        :image="post.image"
        :created-at="post.createdAt"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntryBox from '~/components/molecules/BlogEntryBox.vue'
import PostApplicationService from '~/application/posts/postApplicationService'

export default defineComponent({
  components: {
    BlogEntryBox
  },
  setup() {
    const state = reactive<{ posts: any[] }>({
      posts: []
    })
    const service = new PostApplicationService()

    const fetchData = async () => {
      state.posts = await service.getAll()
    }

    fetchData()

    return {
      state
    }
  }
})
</script>
