<template>
  <div class="wrapper">
    <n-link :to="id" append>
      <div class="title">{{ title }}</div>
      <img class="image" :src="image" />
      <div class="createdAt">{{ createdAt }}</div>
    </n-link>
  </div>
</template>
<script lang="ts">
import { createComponent, reactive, computed, ref } from '@vue/composition-api'

export default createComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    createdAt: {
      type: Date,
      require: true
    }
  },
  setup() {
    const state = reactive<{ entries: Object[] }>({
      entries: []
    })

    return {
      state
    }
  }
})
</script>
<style scoped>
.wrapper {
  border: 1px solid #555;
  margin: 20px;
}
</style>
