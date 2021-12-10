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
    <div v-if="posts.length > 0" class="posts__container">
      <article
        v-for="post in posts"
        :key="'post_' + post.post_id"
        class="posts-container__id"
      >
        <n-link class="posts__container__title" :to="'/posts/' + post.post_id">
          {{ post.title }}
        </n-link>

        <div class="posts__container__img-container">
          <img
            v-if="
              post.post_content.thumbnail === null ||
              post.post_content.thumbnail === undefined
            "
            src="~/assets/no_thumbnail.png"
            alt="Thumbnail placeholder"
            class="img-container__image"
            width="200px"
            height="200px"
            fit="cover"
          />

          <img
            v-else
            :src="imageUrl(post.post_content.thumbnail.location_image.id)"
            class="img-container__image"
          />
          <div class="middle">
            <button class="text">
              <img src="https://img.icons8.com/android/48/000000/edit.png" />
            </button>
            <button class="text">
              <img
                src="https://img.icons8.com/material-sharp/48/000000/filled-trash.png"
              />
            </button>
          </div>
        </div>
      </article>
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
            user_created: { _eq: this.$auth.user.id },
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
.no-posts {
  &__post {
    background-color: white;
  }
}
.posts-container {
  display: flex;
  flex-wrap: $flex-wrap;
  justify-content: space-evenly;

  &__id {
    font-weight: $font-weight-l;
    font-size: $font-size-0;
    padding-top: $padding-m;
    padding: 2em;
    width: 400px;
    height: 400px;
    margin: 2em;

    &__img-container {
      &:hover img {
        opacity: 0.3;
      }
    }
  }
}

.posts {
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

    & .text {
      display: $display-grid;
      grid-template-columns: repeat(1, 1fr);
      border: 5px solid $dark-blue;
    }

    &__img-container {
      position: relative;
      width: 100%;

      &:hover img {
        opacity: 0.3;
      }

      &:hover .middle {
        opacity: 1;
      }
    }

    img {
      opacity: 1;
      display: block;
      width: 100%;
      height: auto;
      transition: 0.5s ease;
      backface-visibility: hidden;
    }

    .middle {
      transition: 0.5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
      flex-direction: row;
    }

    button {
      border: none;
      background: none;
      padding: 1em;
    }
  }
}
</style>
