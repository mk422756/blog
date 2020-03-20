<template>
  <div class="wrapper">
    <top-blog-entry-boxes class="entries" />
  </div>
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
<style scoped>
.entries {
  margin: 20px 10px;
}
</style>
