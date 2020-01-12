<template>
  <blog-entry-main></blog-entry-main>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import BlogEntryMain from '~/components/organisms/BlogEntryMain.vue'

export default createComponent({
  components: {
    BlogEntryMain
  }
})
</script>
