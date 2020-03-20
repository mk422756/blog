<template>
  <div class="box">
    <div>
      <p class="profile">プロフィール</p>
      <figure class="image is-64x64">
        <img
          class="is-rounded"
          src="https://bulma.io/images/placeholders/64x64.png"
        />
      </figure>
      <p class="name">
        <strong>{{ state.name }}</strong>
      </p>
      <p class="description">{{ state.description }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      name: process.env.USER_NAME,
      description: process.env.USER_DESCRIPTION
    })
    return { state }
  }
})
</script>
<style scoped>
.image {
  margin-top: 10px;
}
.name {
  margin: 10px 0;
}
.description {
  word-break: break-all;
}
</style>
