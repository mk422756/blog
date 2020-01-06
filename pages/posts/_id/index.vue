<template>
  <div>
    <h1 class="title">{{state.data.title}}</h1>
    <div class="main" v-if="state.data.html" v-html="state.data.html"></div>
  </div>
</template>
<script lang="ts">
import { createComponent, reactive, watch } from '@vue/composition-api'
import Prism from '~/plugins/prism'
import { db } from '~/plugins/firebase'

export default createComponent({
  setup(props, ctx) {
    const state = reactive<{ data: any }>({
      data: {}
    })
    const fetchData = async (): Promise<void> => {
      const post = await db
        .collection('posts')
        .doc(ctx.root.$route.params.id)
        .get()

      if (post.exists) {
        state.data = post.data()
      }
    }
    fetchData()

    watch(
      () => state.data,
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
