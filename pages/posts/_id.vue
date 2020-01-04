<template>
  <div>
    <div
      class="main"
      v-if="state.item.fields"
      v-html="$md.render(state.item.fields.body)"
    ></div>
  </div>
</template>
<script lang="ts">
import { createClient } from '~/plugins/contentful.js'
import { createComponent, reactive, watch } from '@vue/composition-api'
import BlogEntry from '~/components/molecules/BlogEntry.vue'
import Prism from '~/plugins/prism'

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

    watch(
      () => state.item,
      (item, prevItem) => {
        if (!ctx.root.$isServer) {
          Prism.highlightAll()
        }
      }
    )

    return {
      state
    }
  }
})
</script>
<style scoped>
.main >>> h1 {
  font-size: 2rem;
}

.main >>> strong {
  font-size: 2rem;
}

.main >>> pre {
  background-color: #364549;
}
</style>
