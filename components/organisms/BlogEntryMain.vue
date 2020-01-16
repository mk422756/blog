<template>
  <div class="columns is-centered wrapper">
    <div class="column is-four-fifths">
      <div class="box">
        <div v-if="state.data && state.data.createdAt" class="created-at">
          <time class="created-at">{{ displayDate(state.data.createdAt.toDate()) }}</time>
          <span class="is-pulled-right" v-if="$store.state.user.uid">
            <n-link to="edit" class="fas fa-edit" append></n-link>
          </span>
        </div>

        <h1 class="title">{{ state.data.title }}</h1>
        <div class="main" v-if="state.data.html" v-html="state.data.html"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  createComponent,
  reactive,
  watch,
  computed
} from '@vue/composition-api'
import Prism from '~/plugins/prism'
import { db } from '~/plugins/firebase'
import dayjs from 'dayjs'

export default createComponent({
  setup(props, ctx) {
    const state = reactive<{ data: any }>({
      data: {}
    })

    function displayDate(date: Date): string {
      return dayjs(date).format('YYYY-MM-DD')
    }

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
      state,
      displayDate
    }
  }
})
</script>
<style scoped>
.wrapper {
  margin: 40px 0 10px;
}

.created-at {
  font-size: 12px;
}

.title {
  margin-top: 5px;
  font-size: 32px;
}
.main >>> h1 {
  font-size: 2rem;
  margin: 15px 0;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}

.main >>> p {
  font-size: 18px;
  line-height: 36px;
  margin: 36px 0;
}

.main >>> pre {
  background-color: #364549;
}
</style>
