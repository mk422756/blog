<template>
  <div>
    <navbar />
    <div class="columns">
      <div class="column is-three-quarters">
        <nuxt />
      </div>
      <div class="column">
        sidebar
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createComponent, reactive, computed, ref } from '@vue/composition-api'
import Navbar from '~/components/organisms/Navbar.vue'

export default createComponent({
  components: {
    Navbar
  }
})
</script>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Hiragino Kaku Gothic ProN', YuGothic, 'Yu Gothic', Verdana, Meiryo,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  background-color: #f0ebeb;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
