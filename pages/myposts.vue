<template>
  <div class="wrapper">
    <my-blog-entry-boxes class="entries" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MyBlogEntryBoxes from '~/components/organisms/MyBlogEntryBoxes.vue'

export default defineComponent({
  components: {
    MyBlogEntryBoxes
  }
})
</script>
<style scoped>
.entries {
  margin: 20px 10px;
}
</style>
