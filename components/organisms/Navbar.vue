<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <n-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </n-link>

      <!-- <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>-->
      <a class="navbar-item" @click="createPost">EDIT</a>
      <n-link class="navbar-item" to="/login">LOGIN</n-link>
    </div>

    <!-- <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>-->
  </nav>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { db } from '~/plugins/firebase'

export default createComponent({
  setup(props, ctx) {
    async function createPost() {
      const postRef = db.collection('posts').doc()
      await postRef.set({
        title: '',
        md: '',
        html: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDraft: true,
        createdBy: ctx.root.$store.state.user.uid
      })

      ctx.root.$router.push(`/posts/${postRef.id}/edit`)
    }

    return { createPost }
  }
})
</script>
