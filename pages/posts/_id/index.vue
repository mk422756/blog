<template>
  <blog-entry-main></blog-entry-main>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BlogEntryMain from '~/components/organisms/BlogEntryMain.vue'

export default defineComponent({
  components: {
    BlogEntryMain
  }
})
</script>
