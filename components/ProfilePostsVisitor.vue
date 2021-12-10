<template>
  <div class="posts-visitor">
    <div v-if="posts.length > 0" class="posts-visitor__container">
      <div
        v-for="post in posts"
        :key="'post_' + post.post_id"
        class="posts-visitor__container__id"
      >
        <n-link
          class="posts-visitor__container__title"
          :to="'/posts/' + post.post_id"
        >
          {{ post.title }}
        </n-link>

        <img
          v-if="
            post.post_content.thumbnail === null ||
            post.post_content.thumbnail === undefined
          "
          src="~/assets/no_thumbnail.png"
          alt="Thumbnail placeholder"
        />

        <img
          v-else
          :src="imageUrl(post.post_content.thumbnail.location_image.id)"
        />
      </div>
    </div>
    <div v-else class="posts-visitor__container">
      <div class="posts-visitor__container__id">
        <p class="posts-visitor__container__title">No posts available</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: { type: Object, required: true },
  },
  data() {
    return {
      posts: [],
    }
  },
  // deze filtering kan al gebeuren bij de fetch zelf.
  computed: {},
  created() {
    this.fetchPosts()
  },
  mounted() {},
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=350&height=250&fit=cover'
      )
    },
    fetchPosts() {
      this.$axios('/items/posts', {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        params: {
          fields:
            '*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*',
          filter: {
            user_created: { _eq: this.userInfo.id },
            status: { _eq: 'published' },
          },
          sort: '-date_created',
        },
      })
        .then((response) => {
          this.posts = response.data.data
          this.posts.forEach((post) => {
            post.post_content.location_id.forEach((location) => {
              location.location_image_id.forEach((image) => {
                if (image.is_thumbnail === true) {
                  post.post_content.thumbnail = image
                }
              })
            })
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss">
.posts-visitor {
  &__container {
    display: flex;
    flex-wrap: $flex-wrap;
    justify-content: space-evenly;

    &__id {
      font-weight: $font-weight-l;
      font-size: $font-size-0;
      padding-top: $padding-m;
      // background-position: $center;
      // border-radius: $border-radius-m;
      padding: 2em;
      width: 400px;
      height: 400px;
      z-index: 0;
      margin: 2em;
    }

    &__title {
      text-decoration: $no-text-decoration;
      color: $black;
      font-size: $font-size-2;
      &:hover {
        color: $grey;
      }
    }

    * {
      text-align: $center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    & #text {
      display: $display-grid;
      grid-template-columns: repeat(3, 1fr);
      border: 5px solid $dark-blue;
    }

    &__img-container {
      position: relative;
      width: 100%;
    }

    img {
      opacity: 1;
      display: block;
      width: 100%;
      height: auto;
      transition: 0.5s ease;
      backface-visibility: hidden;
    }

    button {
      border: none;
      background: none;
    }
  }
}
</style>
