<template>
  <div class="top-blogs">
    <NuxtLink :to="`/posts?sort=-date_updated`">
      <!-- rating filter niet mogelijk door beperkingen backend-->
      <h2 class="top-blogs__title">Top Blogs</h2>
    </NuxtLink>
    <div class="top-blogs__posts">
      <Carousel
        class="top-blogs__carousel"
        :per-page-custom="[
          [400, 1],
          [600, 2],
          [768, 3],
          [1200, 4],
        ]"
      >
        <Slide
          v-for="post in posts"
          :key="'top-blogs-post_' + post.post_id"
          class="top-blogs__posts__post"
        >
          <NuxtLink :to="`/posts/${post.post_id}`">
            <h3 class="top-blogs__posts__post__title">{{ post.title }}</h3>
          </NuxtLink>
          <NuxtLink :to="`/users/${post.user_created.id}`">
            <h4 class="top-blogs__posts__post__name">
              {{ post.user_created.first_name }}
              {{ post.user_created.last_name }}
            </h4>
          </NuxtLink>
          <p class="top-blogs__posts__post__rating">
            {{ post.post_rating.toFixed(2) }}
          </p>
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
            :src="imageUrl(post.post_content.thumbnail.location_image.id)"
            class="top-blogs__posts__post__image"
          />
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'TopBlogs',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    sortedPosts() {
      return this.posts.slice(0).sort((a, b) => {
        return b.post_rating - a.post_rating
      })
    },
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=250&height=250&fit=cover'
      )
    },
    fetchPosts() {
      this.$axios(
        '/items/posts?filter=%7B%22post_rating%22%3A%20%7B%20%22_length%22%3A%20%7B%22%3E%22%3A%20%220%22%20%7D%7D,%22status%22%3A%7B%22_eq%22%3A%22published%22%7D%7D',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            fields:
              '*,post_rating.*,user_created.*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*',
            limit: 8,
          },
        }
      )
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

          this.posts.forEach((post) => {
            let average = 0
            post.post_rating.forEach((v) => {
              average += parseInt(v.rating)
            })
            average /= post.post_rating.length
            post.post_rating = average
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
.top-blogs {
  background: $dark-blue;
  color: $white;
  padding: $padding-m;
  display: flex;
  flex-direction: column;
  a {
    color: white;
    text-decoration: none;
  }
  &__title {
    font-size: $font-size-5;
    text-align: left;
    margin-left: $margin-m;
    margin-bottom: 0;
    color: $white;

    &:hover {
      text-decoration: 2px underline white;
    }
  }

  &__posts {
    width: 100vw;
    height: 100%;

    a {
      color: white;
      text-decoration: none;
    }

    &__post {
      margin-bottom: $margin-s;

      &__title {
        // font-size: $font-size-3;
          white-space: nowrap; 
          width: 280px; 
          overflow: hidden;
          text-overflow: ellipsis; 
          margin: 0 auto;

        &:hover {
          text-decoration: 2px underline white;
        }
      }
      &__image {
        border-radius: $border-radius-s;
      }
      &__name {
        color: white;
        font-size: $font-size-2;
        margin-top: $margin-l;
        &:hover {
          color: #9fa4a9;
        }
      }
      &__rating {
        font-size: $font-size-1;
      }
      &__rating::before {
        content: '♥ ';
      }
    }
  }
  &__carousel {
    padding-top: $padding-xl;
  }

  .VueCarousel-pagination .VueCarousel-dot {
    background-color: white !important;
  }

  .VueCarousel-pagination .VueCarousel-dot--active {
    background-color: red !important;
  }
  .VueCarousel-dot-container {
    padding-top: 5em;
  }
}

@media screen and (max-width: $mq-l) {
  .VueCarousel-inner {
    display: flex;
    flex-direction: row;
  }
  .top-blogs {
    &__posts__post {
      &__title {
        font-size: $font-size-1;
        padding: 0;
        white-space: nowrap; 
        width: 240px; 
        overflow: hidden;
        text-overflow: ellipsis; 
        margin: 0 auto;
      }
      &__name {
        font-size: $font-size-1;
      }
    }
  }
}

@media screen and (max-width: $mq-xxl) {
  .top-blogs__posts__post {
    &__image {
      width: 200px;
    }
    &__title {
      font-size: $font-size-1;
      padding: 0;
    }
    &__name {
      font-size: $font-size-1;
    }
  }
}

@media screen and (min-width: $mq-xxxl) {
  .top-blogs__posts__post__image {
    width: 350px;
  }
  .top-blogs__posts__post {
    &__title {
      font-size: $font-size-4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 500px;
      text-align: center;
      padding: 1em;
      margin: 0;
    }
  }
}
</style>
