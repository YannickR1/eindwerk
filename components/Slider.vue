<template>
<div class="slider">
  <figure >
  <div
        v-for="post in posts"
        :key="'top-blogs-post_' + post.id"
        class="top-blogs__posts__post"
      >
        <NuxtLink :to="`/posts/${post.post_id}`">
          <h3 class="brak">{{ post.title }}</h3>
        </NuxtLink>
        <p class="before">{{ post.post_ratings.toFixed(2) }}</p>

        <div
          v-for="location in post.post_content.location_id"
          :key="'top-blogs-location_' + location.location_id"
        >
          <img
            v-for="image in location.location_image_id"
            :key="'top-blogs-image_' + image.location_image_id"
            :src="imageUrl(image.location_image.id)"
            class="top-blogs__posts__post__image"
          />
        </div>

        <NuxtLink :to="`/users/${post.user_created.id}`" class="top-blogs__posts__post__name">
          {{ post.user_created.first_name }} {{ post.user_created.last_name }}
        </NuxtLink>
  </div>
  </figure>
</div>
</template>

<script>
export default {
  name: 'TopBlogs',
  data() {
    return {
      posts: [],
    }
  },

  created() {
    this.fetchPosts()
  },
  methods: {
    imageUrl(id) {
      return 'http://134.122.85.108/assets/' + id
    },
    fetchPosts() {
      this.$axios(
        'items/posts?filter=%7B%22post_ratings%22%3A%20%7B%20%22_length%22%3A%20%7B%22%3E%22%3A%20%220%22%20%7D%7D,%22status%22%3A%7B%22_eq%22%3A%22published%22%7D%7D',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            fields:
              '*,post_ratings.*,user_created.*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*',
            limit: 8,
          },
        }
      )
        .then((response) => {
          this.posts = response.data.data
          this.posts.forEach((post) => {
            let average = 0
            post.post_ratings.forEach((v) => {
              average += v.rating
            })
            average /= post.post_ratings.length
            post.post_ratings = average
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style>
.slider{
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}

.slider figure{
  position: relative;
  width: 500%;
  margin: 0;
  left: 0;
  animation: 5s slider infinite;
}

.slider figure div{
  float: left;
  width: 10%;
}

@keyframes slider{
  0%{
    left: 0;
  }
  20% {
    left: 0;
  }
  25%{
    left: -100%;
  }
  45%{
    left: -100%;
  }
}
</style>
