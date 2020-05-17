<template>
  <div class="mavonEditor">
    <client-only>
      <div class="buttons">
        <button class="button" @click="draft">下書き保存</button>
        <button class="button is-primary" @click="publish">公開</button>
        <button class="button is-danger" @click="del">削除</button>
      </div>
      <div class="field">
        <label class="label">タイトル</label>
        <div class="control">
          <input class="input" type="text" v-model="state.title" />
        </div>
      </div>
      <mavon-editor
        class="editor"
        :toolbars="option"
        language="ja"
        @change="change"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        v-model="state.md"
        ref="md"
      />
    </client-only>
  </div>
</template>
<script>
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'
import { mavonEditor } from 'mavon-editor'
import PostApplicationService from '~/application/posts/postApplicationService'

export default defineComponent({
  setup(props, ctx) {
    const option = {
      bold: true,
      italic: true,
      header: true,
      underline: true,
      strikethrough: true,
      mark: true,
      superscript: true,
      subscript: true,
      quote: true,
      ol: true,
      ul: true,
      link: true,
      imagelink: true,
      code: true,
      table: true,
      fullscreen: true,
      readmodel: true,
      htmlcode: true,
      help: true,
      /* 1.3.5 */
      undo: true,
      redo: true,
      // trash: true,
      // save: true,
      /* 1.4.2 */
      navigation: true,
      /* 2.1.8 */
      alignleft: true,
      aligncenter: true,
      alignright: true,
      /* 2.2.1 */
      subfield: true,
      preview: true
    }

    const state = reactive({
      title: '',
      md: '',
      html: ''
    })

    const postService = new PostApplicationService()

    async function imgAdd(pos, file) {
      const url = await postService.imageUpload(
        `${ctx.root.$store.state.user.uid}/${ctx.root.$route.params.id}/${file.name}`,
        file
      )
      ctx.refs.md.$img2Url(pos, url.value)
    }

    function change(value, htmlval) {
      state.md = value
      state.html = htmlval
    }

    async function imgDel(array) {
      // const url = array[0]
      const file = array[1]
      await postService.imageDelete(
        `${ctx.root.$store.state.user.uid}/${ctx.root.$route.params.id}/${file.name}`
      )
    }

    async function getPost() {
      const post = await postService.getById(ctx.root.$route.params.id)
      state.title = post.title
      state.md = post.markdownText
      state.html = post.html
    }

    getPost()

    async function draft() {
      if (!window.confirm('下書きで保存します')) {
        return
      }

      await postService.save(
        ctx.root.$route.params.id,
        state.title,
        state.html,
        state.md,
        true
      )
    }

    async function publish() {
      if (!window.confirm('公開で保存します')) {
        return
      }
      await postService.save(
        ctx.root.$route.params.id,
        state.title,
        state.html,
        state.md,
        false
      )
    }

    async function del() {
      if (!window.confirm('削除します')) {
        return
      }
      await postService.delete(ctx.root.$route.params.id)
      ctx.root.$router.push('/myposts')
    }

    return {
      option,
      state,
      imgAdd,
      imgDel,
      draft,
      publish,
      del,
      change
    }
  }
})
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.editor {
  margin-top: 20px;
}
</style>
