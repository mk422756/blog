<template>
  <div class="columns is-centered wrapper">
    <div class="column">
      <div class="box">
        <div v-if="state.data && state.data.createdAt" class="created-at">
          <time class="created-at">{{
            displayDate(state.data.createdAt)
          }}</time>
          <span class="is-pulled-right" v-if="$store.state.user.uid">
            <n-link to="edit" class="fas fa-edit" append></n-link>
          </span>
        </div>
        <div v-if="state.data && state.data.topImage" class="top-image-box">
          <img
            alt="メインイメージ"
            :src="state.data.topImage"
            class="top-image"
          />
        </div>
        <h1 class="title">{{ state.data.title }}</h1>
        <div
          class="main"
          v-if="state.data.htmlText"
          v-html="state.data.htmlText"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  computed
} from 'nuxt-composition-api'
import Prism from '~/plugins/prism'
import dayjs from 'dayjs'
import PostApplicationService from '~/application/posts/postApplicationService'

export default defineComponent({
  setup(props, ctx) {
    const state = reactive<{ data: any }>({
      data: {}
    })

    function displayDate(date: Date): string {
      return dayjs(date).format('YYYY-MM-DD')
    }

    const service = new PostApplicationService()

    const fetchData = async (): Promise<void> => {
      state.data = await service.getById(ctx.root.$route.params.id)
    }
    fetchData()

    // watch(
    //   () => state.data,
    //   (item, prevItem) => {
    //     if (!ctx.root.$isServer) {
    //       Prism.highlightAll()
    //     }
    //   }
    // )

    return {
      state,
      displayDate
    }
  }
})
</script>
<style scoped>
.created-at {
  font-size: 14px;
}

.title {
  margin-top: 5px;
  font-size: 2rem;
}

.top-image-box {
  margin: 20px 0;
  text-align: center;
  height: 250px;
}

.top-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.main >>> h2 {
  font-size: 1.4rem;
  margin: 2rem 0;
  padding: 0.4em; /*文字周りの余白*/
  color: #494949; /*文字色*/
  background: #fffaf4; /*背景色*/
  border-left: solid 5px #ffaf58; /*左線（実線 太さ 色）*/
  font-weight: bold;
}

.main >>> h3 {
  font-size: 1.3rem;
  margin: 2rem 0;
  border-bottom: 1px solid #ffaf58;
  font-weight: bold;
}

.main >>> h4 {
  font-size: 1.15rem;
  margin: 1.4rem 0;
  font-weight: bold;
}

.main >>> p {
  line-height: 1.9;
  margin: 24px 0;
  word-break: break-all;
}

.main >>> pre {
  color: aliceblue;
  background-color: #272822;
  word-wrap: normal;
  overflow: auto;
}

.main >>> blockquote p {
  font-size: 0.9rem;
  line-height: 1.5rem;
  margin: 5px;
  padding: 10px;
  background-color: #f3f3f3;
}

.main >>> ul {
  padding: 0.3em 0.8em 0.3em 2.1em;
  position: relative;
}

.main >>> ul li {
  line-height: 1.5;
  padding: 0.5em 0;
  list-style-type: none !important; /*ポチ消す*/
}

.main >>> ul li:before {
  font-family: 'Font Awesome 5 Free';
  content: '\f14a';
  position: absolute;
  left: 1em; /*左端からのアイコンまで*/
  color: #ffb03f; /*アイコン色*/
}
</style>
