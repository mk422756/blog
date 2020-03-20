<template>
  <div class="wrapper box" :class="{ 'is-draft': isDraft }">
    <n-link :to="`/posts/${id}`">
      <blog-entry-image :image="image" class="image" />
      <h2 class="title">
        <span v-if="isDraft" class="draft has-text-danger">★下書き </span
        >{{ title }}
      </h2>
      <p class="created-at">
        <time>{{ state.displayCreateAt }}</time>
      </p>
    </n-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, ref } from '@vue/composition-api'
import BlogEntryImage from '~/components/atoms/BlogEntryImage.vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    BlogEntryImage
  },
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
      default: ''
    },
    createdAt: {
      type: Date,
      require: true
    },
    isDraft: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const state = reactive({
      entries: [],
      displayCreateAt: computed(() =>
        dayjs(props.createdAt).format('YYYY/MM/DD HH:mm:ss')
      )
    })

    return {
      state
    }
  }
})
</script>
<style scoped>
.title {
  font-size: 17px;
  margin: 12px 0 3px;
}

.created-at {
  font-size: 12px;
}

a:link,
a:visited,
a:hover,
a:active {
  color: #555;
}

.image {
  margin: 0 auto;
  height: 170px;
  width: 250px;
  object-fit: cover;
}

.wrapper {
  transition: box-shadow 0.5s;
}

.wrapper:hover {
  text-decoration: underline;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.3),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
}

.is-draft {
  background-color: aliceblue;
}
</style>
