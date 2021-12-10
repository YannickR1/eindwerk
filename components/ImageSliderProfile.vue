<template>
  <div class="image-slider">
    <div class="image-slider__locations">
      <button
        v-for="location in post.post_content.location_id"
        :key="'location_' + location.location_id"
        class="image-slider__locations__btn"
        @click="selectLocation(location.location_id)"
      >
        {{ location.location_name }}
      </button>
    </div>
    <Carousel
      v-if="selectedLocation"
      class="image-slider__carousel"
      :per-page="3"
    >
      <Slide
        v-for="image in selectedLocation.location_image_id"
        :key="'image_' + image.location_image_id"
        class="image-slider__slide"
      >
        <div
          class="image-slider__slide-content"
          @click="selectImage(image.location_image.id)"
        >
          <img
            :src="imageUrl(image.location_image.id)"
            class="image-slider__slide-image"
          />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'PostImages',
  components: {
    Carousel,
    Slide,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedLocationId: null,
    }
  },
  computed: {
    selectedLocation() {
      const filteredLocations = this.post.post_content.location_id.filter(
        (location) => {
          return location.location_id === this.selectedLocationId
        }
      )

      return filteredLocations ? filteredLocations[0] : null
    },
  },
  created() {
    if (this.post.post_content.location_id.length > 0) {
      this.selectLocation(this.post.post_content.location_id[0].location_id)
    }
  },
  methods: {
    selectImage(imageId) {
      this.$root.$emit('select-slider-image', imageId)
    },
    selectDescription(description) {
      this.$root.$emit('select-slider-description', description)
    },
    selectLocation(locationId) {
      this.selectedLocationId = locationId

      if (this.selectedLocation && this.selectedLocation.location_image_id) {
        this.selectImage(
          this.selectedLocation.location_image_id[0].location_image.id
        )
      }
      if (this.selectedLocation) {
        this.selectDescription(this.selectedLocation.description)
      }
    },
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=300&height=250&fit=cover'
      )
    },
  },
}
</script>

<style lang="scss">
.image-slider {
  &__locations {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 1em;
    &__btn {
      padding: 0.5em 1em;
      border-radius: 5px;
      border: 2px solid gray;
      background: white;
      color: $dark-blue;
      margin: 0 .5em;

      &:hover {
        color: white;
        background: $dark-blue;
      }
    }
  }

  .VueCarousel-pagination .VueCarousel-dot {
    background-color: black !important;
  }

  .VueCarousel-pagination .VueCarousel-dot--active {
    background-color: red !important;
  }

  &__slide {
    &-content {
      display: flex;
      justify-content: center;
      margin: 1em;
      position: relative;
    }

    &-image {
      height: 100%;
      width: 250px;
      margin: 0 10px;
      object-fit: cover;
      border-radius: 15px;
      cursor: pointer;
      transition: 0.25s ease-in-out;
    }
  }
}

@media screen and (max-width: $mq-xxl-l) {
  .image-slider__slide-image {
    width: 200px;
  }
}

@media screen and (max-width: $mq-xl-l) {
  .image-slider__slide-image {
    width: 160px;
  }
}

@media screen and (min-width: $mq-xxxl) {
  .image-slider {
    &__locations {
      font-size: $font-size-2;
      height: 70px;
    }
  }
}
</style>
