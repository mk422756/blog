<template>
  <div
    v-if="state.item.fields"
    v-html="$md.render(state.item.fields.body)"
  ></div>
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
  setup(props, ctx) {
    const state = reactive<{ item: Object }>({
      item: {}
    })
    const fetchData = async (): Promise<void> => {
      state.item = await client.getEntry(ctx.root.$route.params.id)
    }
    fetchData()

    return {
      state
    }
  }
})
</script>
