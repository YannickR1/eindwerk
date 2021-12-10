<template>
  <section class="posts">
    <article v-if="posts.length <= 0" class="no-posts__post">
      <h3 class="no-posts__post__title">No posts yet, click to create one</h3>
      <NuxtLink to="/blog/create">
        <div class="no-posts__post__img-container">
          <img src="~/assets/plus-60.svg" alt="" />
        </div>
      </NuxtLink>
    </article>
    <div v-else class="posts-container">
      <div
        v-for="post in posts"
        :key="'post_' + post.post_id"
        class="posts-container__id"
      >
        <n-link class="posts-container__title" :to="'/feature-not-implemented'">
          {{ post.title }}
        </n-link>
        <div class="posts-container__img-container">
          <img
            v-if="
              post.post_content.thumbnail === null ||
              post.post_content.thumbnail === undefined
            "
            src="~/assets/no_thumbnail.png"
            alt="Thumbnail placeholder"
            class="recent-blogs__posts__post__image"
          />
          <img
            v-else
            :src="imageUrl(post.post_content.thumbnail)"
            class="posts-container__posts__post__image"
          />
        </div>
      </div>
    </div>
  </section>
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
  computed: {},
  created() {
    this.fetchDraftPosts()
  },
  mounted() {},
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=350&height=250&fit=cover'
      )
    },
    fetchDraftPosts() {
      this.$axios('/items/posts', {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        params: {
          fields:
            '*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*',
          filter: {
            user_created: { _eq: this.$auth.user.id },
            status: { _eq: 'draft' },
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
                  post.post_content.thumbnail = image.location_image.id
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
.posts-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: $flex-wrap;

  &__id {
    font-weight: $font-weight-l;
    font-size: $font-size-0;
    padding-top: $padding-m;
    margin: 2em;
    padding: 2em;
    width: 400px;
    height: 400px;
    &__img-container {
      &:hover img {
        opacity: 0.3;
      }
    }
  }

  &__title {
    text-decoration: $no-text-decoration;
    color: $black;
    font-size: $font-size-0;
  }
  &__title:hover {
    color: $grey;
  }
  * {
    text-align: $center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.posts-container .text {
  display: $display-grid;
  grid-template-columns: repeat(1, 1fr);
  border: 5px solid $dark-blue;
}
</style>
