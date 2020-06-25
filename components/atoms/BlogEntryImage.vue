<template>
  <div>
    <img class="image" :src="displayImage" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const displayImage = computed(() =>
      props.image ? props.image : 'https://picsum.photos/200/300'
    )

    return {
      displayImage
    }
  }
})
</script>
<style scoped>
img {
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
</style>
