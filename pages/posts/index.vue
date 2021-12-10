<template>
  <main class="p-posts">
    <section class="p-posts__filters">
      <select
        id="city"
        v-model="cityFilter"
        name="city"
        class="p-posts__filters__select"
      >
        <option :value="undefined" class="p-posts__filters__select__option">
          Do not filter city
        </option>
        <option
          v-for="city in cities"
          :key="'city_' + city.city_id"
          :value="city.city_id"
          class="p-posts__filters__select__option"
        >
          {{ city.city_name }}
        </option>
      </select>
      <select
        id="category"
        v-model="categoryFilter"
        name="category"
        class="p-posts__filters__select"
      >
        <option :value="undefined" class="p-posts__filters__select__option">
          Do not filter category
        </option>
        <option
          v-for="category in categories"
          :key="'category_' + category.id"
          :value="category.id"
          class="p-posts__filters__select__option"
        >
          {{ category.name }}
        </option>
      </select>
      <select
        id="sort"
        v-model="sort"
        name="sort"
        class="p-posts__filters__select"
      >
        <option value="date_updated" class="p-posts__filters__select__option">
          Date (ASC)
        </option>
        <option value="-date_updated" class="p-posts__filters__select__option">
          Date (DESC)
        </option>
        <option value="title" class="p-posts__filters__select__option">
          Title (ASC)
        </option>
        <option value="-title" class="p-posts__filters__select__option">
          Title (DESC)
        </option>
      </select>
    </section>
    <section class="p-posts__posts">
      <div class="p-posts__posts__container">
        <article
          v-for="post in posts"
          :key="'post_' + post.post_id"
          class="p-posts__posts__container__post"
        >
          <div class="p-posts__posts__container__post__left-container">
            <div>
              <NuxtLink :to="`/posts/${post.post_id}`">
                <h3 class="p-posts__posts__post__left-container__title">
                  {{ post.title }}
                </h3>
              </NuxtLink>
              <p>
                by
                <NuxtLink :to="`/users/${post.user_created.id}`">
                  {{ post.user_created.first_name }}
                  {{ post.user_created.last_name }}
                </NuxtLink>
              </p>
            </div>

            <p>
              <span
                class="p-posts__posts__container__post__left-container__location fa fa-map-marker"
                >{{ post.city_id.city_name }}</span
              >
              <span
                class="p-posts__posts__container__post__left-container__rating"
                >{{ post.rating.toFixed(2) }}</span
              >
              <span
                class="p-posts__posts__container__post__left-container__date fa fa-calendar"
                >{{ post.date_created.toString().split('T')[0] }}</span
              >
            </p>
            <p>
              Tags:
              <span
                v-for="(categorylist, index) in post.categories"
                :key="categorylist.category_id"
                >{{ categorylist.categories_id.name
                }}<span v-if="index != post.categories.length - 1">, </span>
              </span>
            </p>
          </div>
          <div class="p-posts__posts__container__post__image-container">
            <img
              v-if="
                post.post_content.thumbnail === null ||
                post.post_content.thumbnail === undefined
              "
              src="~/assets/no_thumbnail.png"
              alt="Thumbnail placeholder"
              class="p-posts-posts__container__post__image-container"
              width="200"
              height="200"
              fit="cover"
            />

            <img
              v-else
              :src="imageUrl(post.post_content.thumbnail.location_image.id)"
              class="p-posts-posts__container__post__image-container"
            />
          </div>
        </article>
      </div>
    </section>
    <section v-if="pageCount > 1" class="p-posts__pagination">
      <button class="p-posts__pagination__arrow-button" @click="previousPage">
        &lt;
      </button>
      <p class="p-posts__pagination__page-count">
        {{ curPage }} / {{ pageCount }}
      </p>
      <button class="p-posts__pagination__arrow-button" @click="nextPage">
        &gt;
      </button>
    </section>
  </main>
</template>

<script>
export default {
  name: 'PostsPage',
  layout: 'Exploreless',
  data() {
    return {
      posts: [],
      cities: [],
      categories: [],
      sort: '-date_created',
      cityFilter: undefined,
      categoryFilter: undefined,
      curPage: 1,
      postsPerPage: 10,
      totalCount: 0,
    }
  },
  fetch() {
    if (this.queryParams.sort) {
      this.sort = this.queryParams.sort
    }

    if (this.queryParams.city) {
      this.cityFilter = parseInt(this.queryParams.city)
    }

    if (this.queryParams.category) {
      this.categoryFilter = parseInt(this.queryParams.category)
    }

    if (this.queryParams.page) {
      this.curPage = parseInt(this.queryParams.page)
    }

    return this.fetchPosts()
  },
  computed: {
    queryParams() {
      return this.$route.query
    },
    pageCount() {
      return Math.ceil(this.totalCount / this.postsPerPage)
    },
    curQueryParams() {
      return {
        sort: this.sort,
        city: this.cityFilter,
        category: this.categoryFilter,
        page: this.curPage,
      }
    },
  },
  watch: {
    curQueryParams(newVal, oldVal) {
      if (newVal.page === oldVal.page && newVal.page !== 1) {
        this.curPage = 1
        return
      }

      this.$router.push({
        path: '/posts',
        query: newVal,
      })

      this.fetchPosts()
    },
  },
  created() {
    this.fetchCities()
    this.fetchCategories()
  },
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=200&height=200&fit=cover'
      )
    },
    previousPage() {
      if (this.curPage !== 1) {
        this.curPage -= 1
      }
    },
    nextPage() {
      if (this.curPage !== this.pageCount) {
        this.curPage += 1
      }
    },
    filterObject() {
      const filterObject = {
        _and: [
          {
            status: {
              _eq: 'published',
            },
          },
        ],
      }

      if (this.cityFilter) {
        filterObject._and.push({
          city_id: {
            _eq: this.cityFilter,
          },
        })
      }

      if (this.categoryFilter) {
        filterObject._and.push({
          categories: {
            categories_id: {
              id: {
                _eq: this.categoryFilter,
              },
            },
          },
        })
      }

      return filterObject
    },
    fetchCities() {
      this.$axios('items/cities', {
        params: {
          sort: 'city_name',
          filter: {},
        },
      })
        .then((response) => {
          this.cities = response.data.data
        })
        .catch((e) => {
          console.error(e)
        })
    },
    fetchCategories() {
      this.$axios('items/categories', {
        params: {
          filter: {},
        },
      })
        .then((response) => {
          this.categories = response.data.data
        })
        .catch((e) => {
          console.error(e)
        })
    },
    setPage(page) {
      this.curPage = page
    },
    fetchPosts() {
      this.$axios('items/posts', {
        params: {
          fields:
            '*,categories.categories_id.*,user_created.*,post_content.*,post_content.location_id.*,post_content.location_id.location_image_id.*,post_content.location_id.location_image_id.location_image.*,city_id.*,post_rating.*',
          sort: this.sort,
          filter: this.filterObject(),
          meta: 'filter_count',
          limit: this.postsPerPage,
          page: this.curPage,
        },
      })
        .then((response) => {
          // Ratings generation
          response.data.data.forEach((post) => {
            let average = 0
            if (post.post_rating) {
              post.post_rating.forEach((v) => {
                if (v.rating) {
                  average += v.rating
                  return average
                } else {
                  average += 0
                  return average
                }
              })
            } else {
              average += 0
            }

            average /= post.post_rating.length
            post.rating = average

            if (isNaN(post.rating)) {
              post.rating = 0
            }
          })

          this.posts = response.data.data

          // thumbnail generation
          this.posts.forEach((post) => {
            post.post_content.location_id.forEach((location) => {
              location.location_image_id.forEach((image) => {
                if (image.is_thumbnail === true) {
                  post.post_content.thumbnail = image
                }
              })
            })
          })

          this.totalCount = response.data.meta.filter_count
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
}
</script>

<style lang="scss">
.active {
  font-weight: bold;
}

.p-posts {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__filters {
    @media screen and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      margin: 0.5em;
    }

    &__select {
      padding: 0.25em;
      border: none;
      outline: none;

      &__option {
        padding: 0.25em;
        border: none;
      }
    }
  }

  &__posts {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
      }

      &__post {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px dashed grey;
        margin: 2em;

        @media screen and (max-width: 600px) {
          flex-direction: column;
          text-align: center;
          border-bottom: none;
        }

        &__left-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;

          &__title {
            color: black;
            &:hover {
              color: gray;
            }
          }
          &__date {
            margin-left: 1em;
            &::before {
              padding-right: 0.5em;
            }
          }
          &__rating {
            margin-left: 0.5em;

            &::before {
              content: '♥ ';
              padding-right: 5px;
            }
          }
        }

        &__image-container {
          margin-left: 1em;
        }
      }
    }
  }

  &__pagination {
    margin: 1em;
    display: flex;

    &__page-count {
      margin: 1em;
    }

    &__arrow-button {
      border: none;
      &:hover {
        background-color: gray;
      }
    }
  }

  a {
    color: black;
  }
}
</style>
