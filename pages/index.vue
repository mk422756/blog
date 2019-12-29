<template>
  <div>
    <ul>
      <li v-for="(entry, i) in entries" :key="i">
        {{ entry.fields }}
        <img :src="entry.fields.heroImage.fields.file.url" />
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  // `env` is available in the context object
  asyncData({ env }) {
    return Promise.all([
      // fetch the owner of the blog
      client.getEntries({
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: process.env.CTF_BLOG_POST_TYPE_ID
      })
      // fetch all blog posts sorted by creation date
      // client.getEntries({
      //   content_type: env.CTF_BLOG_POST_TYPE_ID,
      //   order: '-sys.createdAt'
      // })
    ])
      .then(([entries]) => {
        // return data that should be available
        // in the template
        return {
          entries: entries.items
        }
      })
      .catch(console.error)
  }
}
</script>
