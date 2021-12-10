<template>
  <div class="recent-blogs">
    <NuxtLink :to="`/posts?sort=-date_updated`">
      <h2 class="recent-blogs__title">Recent Blogs</h2>
    </NuxtLink>
    <div class="recent-blogs__posts">
      <div
        v-for="post in posts"
        :key="'recent-blogs-post_' + post.post_id"
        class="recent-blogs__posts__post"
      >
        <div class="column-container">
          <NuxtLink :to="`/posts/${post.post_id}`">
            <h3 class="column-container__title">{{ post.title }}</h3>
          </NuxtLink>
          <p class="fa fa-map-marker">
            <NuxtLink
              :to="`posts?sort=-date_updated&city=${post.city_id.city_id}`"
            >
              {{ post.city_id.city_name }}
            </NuxtLink>
          </p>
          <NuxtLink
            :to="`/users/${post.user_created.id}`"
            class="recent-blogs__posts__name"
          >
            {{ post.user_created.first_name }} {{ post.user_created.last_name }}
          </NuxtLink>
        </div>
        <img
          v-if="
            post.post_content.thumbnail === null ||
            post.post_content.thumbnail === undefined
          "
          src="~/assets/no_thumbnail.png"
          alt="Thumbnail placeholder"
          class="recent-blogs__posts__post__image"
          width="200px"
          height="200px"
        />

        <img
          v-else
          :src="imageUrl(post.post_content.thumbnail.location_image.id)"
          class="recent-blogs__posts__post__image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentBlogs',
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.fetchMostRecentPosts()
  },
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=200&height=200&fit=cover'
      )
    },
    fetchMostRecentPosts() {
      this.$axios(
        '/items/posts?sort=-date_updated&filter=%7B%22status%22%3A%20%7B%20%22_eq%22%3A%22published%22%7D%7D',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            fields:
              '*,city_id.*,user_created.*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*',
            limit: 6,
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
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss">
.recent-blogs {
  height: 100%;

  background-color: $green-blue;
  color: whitesmoke;
  margin: 0;
  a {
    text-decoration: none;
  }
  &__title {
    font-size: $font-size-5;
    margin-top: 0;
    padding-top: $padding-m;
    text-align: left;
    margin-left: $margin-m;
    color: white;

    &:hover {
      text-decoration: 2px underline white;
    }
  }

  &__posts {
    font-size: $font-size-0;
    text-align: left;
    margin-left: 4em;

    a {
      color: whitesmoke;
      font-size: $font-size-1;
      text-decoration: none;

      &:hover {
        text-decoration: 2px underline white;
      }
    }

    .fa-map-marker:hover {
      color: lightgray;
    }

    .fa-map-marker::before {
      padding-right: 10px;
    }

    &__name {
      width: 250px;
      font-size: $font-size-2;
      color: whitesmoke;

      &:hover {
        color: lightgray;
      }
    }

    &__post {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 8em;
      margin-right: 12em;
      border-bottom: 2px dashed grey;
    }
  }
}

.column-container {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 0;
    font-size: $font-size-3;
    font-weight: $font-weight-s;
    color: whitesmoke;
    &:hover {
      text-decoration: 2px underline white;
    }
  }
}

@media screen and (max-width: $mq-m) {
  .recent-blogs__posts__post__image {
    width: 150px;
    margin-bottom: 1em;
  }
  .column-container__title {
    font-size: $font-size-0;
  }
  .recent-blogs {
    &__title {
      font-size: $font-size-5;
    }

    &__posts {
      font-size: $font-size-2;
      margin: 0;

      &__post {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        border-bottom: 2px dashed grey;
      }
      &__name {
        // width: 300px;
        font-size: $font-size-0;
        margin: 0 auto;
        margin-bottom: 1em;
      }
    }
  }
  .fa-map-marker {
    font-size: $font-size-1;
  }
}

@media screen and (min-width: $mq-xxxl) {
  .recent-blogs__posts__post__image {
    width: 350px;
  }
  .recent-blogs {
    &__title {
      font-size: $font-size-7;
    }

    &__posts {
      font-size: $font-size-2;

      &__name {
        width: 300px;
        font-size: $font-size-3;
      }
    }
  }
  .fa-map-marker {
    font-size: $font-size-3;
  }
}
</style>
