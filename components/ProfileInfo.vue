<template>
  <div class="info">
    <img
      v-if="$auth.$state.user.avatar === null"
      src="~/assets/defaultprofile.jpg"
      alt="Profile Picture"
      class="info__img"
    />
    <img
      v-else
      :src="imageUrl($auth.$state.user.avatar)"
      alt="Your Profile Picture"
      class="info__img"
    />
    <div class="info__container">
      <div v-if="userInfo" class="info__container__basic">
        <p class="info__container__basic__name">
          {{ userInfo.first_name }} {{ userInfo.last_name }}
        </p>
      </div>

      <div class="info__container__extra">
        <div class="info__container__extra__bio">
          <p class="info__container__extra__description">
            {{ userInfo.description }}
          </p>
        </div>
        <div class="info__container__extra__numbers">
          <p class="info__container__extra__numbers__posts">
            {{ postPublished.length }}
          </p>
          <p class="info__container__extra__numbers__ratings">
            {{ userRating.toFixed(2) }} / 5.00
          </p>
          <p class="info__container__extra__numbers__interests">
            <span
              v-for="(interestList, index) in userInfo.interests"
              :key="'interestList_' + interestList.id"
            >
              <span
                v-for="interest in interestList"
                :key="'interest_' + interest"
              >
                {{ interest.name }}</span
              ><span v-if="index != userInfo.interests.length - 1">, </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileInfo',
  data() {
    return {
      postArr: [],
      interests: [],
      userRating: 0.0,
    }
  },
  computed: {
    userInfo() {
      return this.$auth.user
    },
    postPublished() {
      return this.userInfo.posts.filter((el) => el.status === 'published')
    },
  },
  created() {
    this.fetchInterests()
    this.fetchRating(this.$auth.user)
  },
  methods: {
    imageUrl(id) {
      return 'http://134.122.85.108/assets/' + id
    },
    fetchInterests() {
      this.$axios('items/categories/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        this.interests = response.data.data
      })
    },
    // returnInterests(value) {
    //   for (let i = 0; i < this.interests.length; i++) {
    //     if (this.interests[i].id === value.categories_id) {
    //       console.log(this.interests[i].name)
    //       return this.interests[i].name
    //     }
    //   }
    // },
    fetchRating(user) {
      this.$axios(`/users/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          fields: 'posts.post_rating.*',
        },
      }).then((response) => {
        const user = response.data.data
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
        this.userRating = average
      })
    },
  },
}
</script>

<style lang="scss">
.info {
  background-color: whitesmoke;
  display: $display-flex;
  flex-direction: $flex-direction-row;
  align-items: $center;
  justify-content: $center;

  &__img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    margin-right: 5em;
    border: 1.5px solid grey;
  }

  &__container {
    display: flex;
    flex-direction: column;

    &__basic {
      &__name {
        font-weight: $font-weight-l;
        font-size: $font-size-3;
        margin: 0.5em 9em 0.5em 0em;
        align-content: flex-start;
        text-transform: uppercase;
        margin: 1em 0;
        @media screen and (max-width: 800px) {
          text-align: center;
          margin: 0.5em;
        }
      }
    }

    &__extra {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 5px;
      padding: 1em 2em;
      box-shadow: 0 4px 10px -6px #222;
      max-width: 600px;

      &__numbers {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__posts {
          padding: $padding-m;
        }

        &__posts::before {
          content: 'posts: ';
          font-weight: $font-weight-l;
        }

        &__ratings {
          padding: $padding-m;
        }

        &__ratings::before {
          content: 'rating: ';
          font-weight: $font-weight-l;
        }

        &__interests::before {
          content: 'interests: ';
          font-weight: $font-weight-l;
        }
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .info {
    width: 100%;
    display: $display-flex;
    flex-direction: $flex-direction-column;
    justify-content: $center;
    margin-bottom: 1em;

    &__basic {
      display: $display-flex;
      align-items: $center;
      justify-content: $center;
      flex-direction: $flex-direction-column;
    }

    &__name {
      margin: 0.5em 0em;
    }

    &__numbers {
      margin-bottom: $margin-xl;
    }

    &__img {
      margin: 1.5em 5em;
    }
  }
}

@media screen and (max-width: 600px) {
  .info {
    width: 100%;

    &__numbers {
      margin-bottom: $margin-xl;
      width: 350px;
      height: 100px;
    }
  }
}
</style>
