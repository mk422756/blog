<template>
  <top-blog-entry-boxes class="entries" />
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TopBlogEntryBoxes from '~/components/organisms/TopBlogEntryBoxes.vue'

export default defineComponent({
  components: {
    TopBlogEntryBoxes
  }
})
</script>

