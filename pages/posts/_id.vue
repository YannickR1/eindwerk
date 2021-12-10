<template>
  <div class="container__posts">
    <section class="post-container">
      <NuxtLink :to="`/posts/`">
        <p class="post-container__explore-btn">
          <i class="arrow-back fa fa-chevron-left"></i>Explore some more
        </p>
      </NuxtLink>
      <article v-if="postData" class="post-container__description">
        <h2 class="post-container__title">{{ postData.title }}</h2>

        <h3>
          by
          <NuxtLink
            :to="`/users/${postData.user_created.id}`"
            class="post-container__user"
            >{{ postData.user_created.first_name }}
            {{ postData.user_created.last_name }}</NuxtLink
          >
          <span class="post-container__date">{{
            format_date(postData.date_created)
          }}</span>
        </h3>
        <p class="post-container__content">
          {{ postData.post_content.content }}
        </p>
        <div class="post-container__img_groot">
          <div
            class="post-container__img-container"
            :data-after-content="selectedLocationDescription"
          >
            <img class="img__groot" :src="selectedImagePath" alt="" />
          </div>

          <div id="map"></div>
        </div>

        <div>
          <ImageSliderProfile :post="postData" />
          <div class="post-container__lower-container">
            <div class="post-container__lower-container__rating">
              <p>Rate this blog</p>
              <Rating />
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import ImageSliderProfile from '~/components/ImageSliderProfile.vue'
import Rating from '~/components/Rating.vue'

export default {
  name: 'PostPage',
  components: {
    ImageSliderProfile,
    Rating,
  },
  layout: 'Exploreless',

  data() {
    return {
      postData: null,
      latlng: null,
      map: null,
      selectedImage: null,
      selectedLocationDescription: '',
      markers: [],
      markerCoordinates: [],
    }
  },
  fetch() {
    return this.$axios
      .$get(
        `/items/posts/${this.$route.params.id}?fields=*%2Cpost_ratings.*%2Ccity_id.*%2Cuser_created.*%2Cpost_content.*%2Cpost_content.location_id.*%2Cpost_content.location_id.location_image_id.*%2Cpost_content.location_id.location_image_id.location_image.*`
      )
      .then((result) => {
        return (this.postData = result.data)
      })
  },
  computed: {
    selectedImagePath() {
      if (!this.selectedImage) {
        return require('~/assets/logo.png')
      }

      return (
        'http://134.122.85.108/assets/' +
        this.selectedImage +
        '?width=600&height=500&fit=cover'
      )
    },
    selectedLocationInfo() {
      return this.selectedLocationDescription
    },
  },
  watch: {
    postData: {
      handler(newVal) {
        if (newVal) {
          this.createMap()
        }
      },
    },
    markerCoordinates() {
      this.zoomToFit()
    },
  },
  created() {
    this.$root.$on('select-slider-image', this.selectImage)
    this.$root.$on('select-slider-description', this.selectDescription)
  },
  beforeDestroy() {
    this.$root.$off('select-slider-image', this.selectImage)
    this.$root.$off('select-slider-description', this.selectDescription)
  },
  methods: {
    createMap() {
      const google = this.$store.state.google
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode(
        {
          address: `${this.postData.city_id.city_name}, ${this.postData.city_id.country}`,
        },
        (results, status) => {
          if (status === 'OK') {
            this.latlng = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }
            this.map = new google.maps.Map(document.getElementById('map'), {
              center: this.latlng,
              zoom: 14,
            })
          }

          this.addMarkers()
        }
      )
    },
    addMarkers() {
      const google = this.$store.state.google
      const locations = this.postData.post_content.location_id

      for (let i = 0; i < locations.length; i++) {
        const coordinates = {
          lat: parseFloat(locations[i].latitude),
          lng: parseFloat(locations[i].longitude),
        }

        const marker = new google.maps.Marker({
          position: coordinates,
          map: this.map,
          title: locations[i].location_name,
        })

        this.markers.push(marker)
        this.markerCoordinates.push(coordinates)
      }
    },
    zoomToFit() {
      const google = this.$store.state.google
      const bounds = new google.maps.LatLngBounds()
      for (let i = 0; i < this.markerCoordinates.length; i++) {
        bounds.extend(this.markerCoordinates[i])
      }

      this.map.fitBounds(bounds)
    },
    selectImage(selectedImage) {
      this.selectedImage = selectedImage
    },
    selectDescription(selectDescription) {
      this.selectedLocationDescription = selectDescription
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=300&height=300&fit=cover'
      )
    },
  },
}
</script>

<style lang="scss">
.container__posts {
  display: flex;
  justify-content: center;
}

.arrow-back {
  margin-right: 0.5em;
}

.post-container {
  width: 75%;
  background-color: white;
  padding: 2em;

  & a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__explore-btn {
    font-size: $font-size-1;
    color: black;

    &:hover {
      color: grey;
    }
  }

  &__title {
    font-size: $font-size-5;
  }
  &__date {
    font-weight: $font-weight-l;
  }
  &__date::before {
    content: ' on ';
  }
  &__user {
    font-weight: $font-weight-m;
    font-size: $font-size-1;
    margin: 0 0.15em;
    color: black;
    text-decoration: none;

    &:hover {
      color: gray;
      text-decoration: underline;
    }
  }

  &__lower-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1em;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    &__image-text {
      width: 60%;
      font-size: $font-size-1;
    }
    &__rating {
      font-size: $font-size-2;
      border: 2px solid black;
      max-width: 300px;
      border-radius: 10px;
      padding: 1em;
      background: white;
      margin-bottom: 2em;
    }
  }

  &__content {
    font-size: $font-size-1;
    width: 80%;
  }
  &__img_groot {
    display: flex;
    justify-content: space-around;
    overflow: hidden;
    position: relative;
  }
  &__img-container:hover::after {
    position: absolute;
    padding: $padding-s;
    background: hsla(0, 0%, 100%, 0.8);
    font-size: $font-size-1;
    font-weight: bold;
    left: 10%;
    top: 20%;
    content: attr(data-after-content);
    max-width: 450px;
    max-height: 300px;
  }
}
#map {
  width: 400px;
  height: 400px;
}

// .VueCarousel-wrapper {
//   background: $green-blue;
// }
@media screen and (min-width: $mq-xxxl) {
  .post-container {
    &__title {
      font-size: $font-size-8;
    }
    &__date {
      font-size: $font-size-2;
    }
    &__user {
      font-size: $font-size-3;
    }
    &__rating {
      font-size: $font-size-3;
      margin-top: 3em;
      margin-left: 2em;
      border: 2px solid black;
      width: 300px;
      border-radius: 10px;
      padding-left: 1em;
      background: white;
      margin-bottom: 2em;
    }
    &__content {
      font-size: $font-size-2;
    }
    &__image-text {
      font-size: $font-size-2;
      margin-left: 2em;
    }
  }
  #map {
    width: 700px;
    height: 600px;
  }
  .img__groot {
    width: 700px;
    height: 600px;
  }
  .post-container .VueCarousel-wrapper {
    background: $green-blue;
  }
}
@media screen and (max-width: $mq-xl-l) {
  .post-container__img-container {
    img {
      max-width: 100%;
      max-height: 400px;
    }
  }
}
@media screen and (min-width: $mq-xxl-l) {
  #map {
    width: 500px;
    height: 500px;
  }
  .img__groot {
    img {
      width: 500px;
      height: 500px;
    }
  }
}

@media screen and (max-width: $mq-xl) {
  #map {
    max-width: 100;
    max-height: 300px;
  }
  .post-container__img-container {
    display: flex;
    align-items: center;
  }
  .img__groot {
    max-height: 300px;
    max-width: 100%;
  }
}

@media screen and (max-width: $mq-l) {
  .post-container {
    &__img_groot {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@media screen and (max-width: $mq-s) {
  #map {
    max-width: 100%;
    max-height: 300px;
  }
  .img__groot {
    max-height: 200px;
  }
}
</style>
