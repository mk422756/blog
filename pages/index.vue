<template>
  <div>
    <ul>
      <li v-for="item in state.items" :key="item.sys.id">
        <blog-entry
          :id="item.sys.id"
          :title="item.fields.title"
          :image="item.fields.heroImage.fields.file.url"
          :created-at="new Date(item.sys.createdAt)"
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { createClient } from '~/plugins/contentful.js'
import { createComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntry from '~/components/molecules/BlogEntry.vue'

const client = createClient()

export default createComponent({
  components: {
    BlogEntry
  },
  setup() {
    const state = reactive<{ items: Object[] }>({
      items: []
    })
    const fetchData = async (): Promise<void> => {
      state.items = (
        await client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        })
      ).items
    }
    fetchData()

    return {
      state
    }
  }
})
</script>
