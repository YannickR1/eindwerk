<template>
  <main class="c-make-blog">
    <nuxt-link
      to="/blog/create"
      class="c-make-blog__btn"
      @click="showBlogModal"
    >
      <img
        src="https://img.icons8.com/fluent-systems-regular/48/ffffff/create-new.png"
      />
    </nuxt-link>
  </main>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      makeClicked: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    showBlogModal() {
      this.makeClicked = true
    },
    closeBlogModal() {
      this.makeClicked = false
    },
  },
}
</script>

<style lang="scss">
.c-make-blog {
  display: flex;
  &__btn {
    display: flex;
    padding: 1em;
    width: 100px;
    height: 100px;
    position: fixed;
    right: 2%;
    top: 82%;
    z-index: 1;
    border-radius: 50%;
    box-shadow: 0 8px 6px -6px black;
    background-image: linear-gradient(to right, #16a085 5%, #cddd00 95%);
    transition: 0.4s;
    background-size: 200% auto;
  }

  &__btn:hover {
    background-position: right center;
  }

  & img {
    justify-content: center;
    align-items: center;
    padding-top: 0.2em;
  }
}
</style>
