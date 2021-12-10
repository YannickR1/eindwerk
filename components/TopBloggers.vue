<template>
  <div class="c-top-blogger">
    <h2 class="c-top-blogger__title">Top Bloggers</h2>
    <div class="c-top-blogger__container">
      <div
        v-for="user in sortedUsers.slice(0, 5)"
        :key="user.id"
        class="c-top-blogger__container__border"
      >
        <img
          v-if="user.avatar === null"
          src="~/assets/defaultprofile.jpg"
          alt="Your Profile Picture"
          class="c-blogger__user-img"
        />
        <img
          v-else
          :src="imageUrl(user.avatar)"
          alt="Your Profile Picture"
          class="c-blogger__user-img"
        />

        <NuxtLink :to="`/users/${user.id}`" class="user-name">
          <h3 class="c-top-blogger__user-name">
            {{ user.first_name }} {{ user.last_name }}
          </h3>
        </NuxtLink>

        <p>Rating: {{ parseFloat(user.user_rating).toFixed(2) }} / 5.00</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      postArr: [],
    }
  },
  computed: {
    sortedUsers() {
      return this.users.slice(0).sort((a, b) => {
        return b.user_rating - a.user_rating
      })
    },
    userInfo() {
      return this.$auth.user
    },
    postPublished() {
      return this.userInfo.posts.filter((el) => el.status === 'published')
    },
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=250&height=250&fit=cover'
      )
    },
    fetchUsers() {
      this.$axios('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          fields:
            '*,user_rating,first_name,last_name,posts.*,posts.post_rating.*,interests.*',
        },
      })
        .then((response) => {
          this.users = response.data.data
          this.users.forEach((user) => {
            let average = 0
            if (user.posts.length <= 0) {
              average += 0
              return average
            } else {
              user.posts.forEach((post) => {
                if (post.post_rating.length > 0) {
                  post.post_rating.forEach((v) => {
                    average += parseInt(v.rating)
                    return average
                  })
                  average /= post.post_rating.length
                } else {
                  average += 0
                }
              })
              average /= user.posts.length
            }
            user.user_rating = average
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
.c-top-blogger {
  padding-top: $padding-s;
  color: $dark-blue;
  text-align: $center;
  background: $white;
  display: flex;
  height: 100%;

  &__user-name {
    color: black;
    text-decoration: underline;
    &:hover {
      color: gray;
    }
  }

  flex-direction: column;

  &__title {
    font-size: $font-size-5;
    margin: 0em $padding-m;
    padding-top: $padding-m;
    margin-bottom: 2em;
  }
  &__container {
    font-size: $font-size-1;
    text-align: $center;
    padding: $padding-m;
    display: flex;
    flex-direction: column;
    //  &__border {
    //    border: 2px solid grey;
    //    border-radius: 10px;
    //   //  margin-bottom: 1em;
    //   width: 400px;
    //  }
  }
  & img {
    max-width: 250px;
    max-height: 250px;
    border-radius: 50%;
  }
}

@media screen and (max-width: $mq-m) {
  .c-blogger__user-img {
    width: 150px;
  }

  .c-top-blogger__title {
    font-size: $font-size-5;
  }
}

@media screen and (min-width: $mq-xxxl) {
  .c-blogger__user-img {
    width: 300px;
  }

  .c-top-blogger__title {
    font-size: $font-size-7;
  }

  .c-top-blogger__container {
    display: flex;
    justify-content: space-between;
    height: 3000px;
  }
}
</style>
