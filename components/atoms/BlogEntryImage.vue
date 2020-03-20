<template>
  <img class="image" :src="displayImage" />
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'

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
