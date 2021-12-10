<template>
  <section class="c-make-blog-content">
    <form class="c-make-blog-content__container" @submit.prevent>
      <Autocomplete
        input-id="geocode-field"
        :class="{ 'c-make-blog-content__intro': !mapMounted }"
        :autocomplete-type="'(cities)'"
        @locationSelected="mountMap"
      >
        In which city are we blogging today?
      </Autocomplete>

      <div class="c-make-blog-content__poi-container">
        <div v-if="mapMounted" class="c-make-blog-content__poi-input-container">
          <label
            >Title of your Blogway
            <input
              id="blog-titel"
              v-model.lazy="post.title"
              type="text"
              placeholder="Title"
            />
          </label>
          <label class="c-make-blog-content__description"
            >Introduction / Description
            <textarea
              id="description-input"
              v-model="post.content"
              name="description-input"
              cols="30"
              rows="5"
            ></textarea>
          </label>
          <FormulateInput
            v-model="selectedCatIds"
            :options="usableCategories"
            class="c-categories"
            type="checkbox"
            label="Pick your Categories"
          />
          <div class="c-make-blog-content__poi-inputs">
            <POIinput
              v-for="field in inputfields"
              :key="field.id"
              :input-id="'point-of-interest-' + field.id"
              :textarea-id="'review-input-' + field.id"
              :bias="post.city"
              @add="addLocationMarker"
              @save="addPointToList"
              @remove="removeLocationInputAndMarker"
            >
              Point of Interest
            </POIinput>
          </div>
          <div class="c-make-blog-content__button-container">
            <NuxtLink to="/feature-not-implemented">
              <button class="button-container__add-location">
                Add Saved Locations
              </button>
            </NuxtLink>
            <button
              class="button-container__publish-btn"
              @click="publishPost('published')"
            >
              Publish
            </button>
            <button
              class="button-container__draft-btn"
              @click="publishPost('draft')"
            >
              Save for Later
            </button>
          </div>
        </div>
        <div v-show="mapMounted" id="map"></div>
      </div>
    </form>
  </section>
</template>
<script>
import POIinput from '~/components/POIinput.vue'
import Autocomplete from '~/components/Autocomplete.vue'

export default {
  components: { Autocomplete, POIinput },
  data() {
    return {
      mapMounted: false,
      map: null,
      count: 0,
      categories: [],
      selectedCatIds: [],
      locationId: [],
      fields: [{ type: 'Autocomplete', id: 0 }],
      post: {
        title: '',
        city: {},
        content: '',
        locationList: {},
        categories: null,
      },
      markers: [],
      markerCoordinates: [],
    }
  },
  computed: {
    inputfields() {
      return this.fields
    },
    usableCategories() {
      return this.categories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    },
  },
  watch: {
    markerCoordinates() {
      this.zoomToFit()
    },
  },

  mounted() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      this.$axios('items/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          fields: 'name,id',
        },
      }).then((response) => {
        this.categories = response.data.data
      })
    },
    mountMap(place) {
      if (this.mapMounted) {
        this.resetData()
      }
      const latLng = place.geometry.location
      this.post.city.lat = latLng.lat()
      this.post.city.lng = latLng.lng()
      this.post.city.name = place.name

      for (let i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types.includes('country')) {
          this.post.city.country_short = place.address_components[i].short_name
          this.post.city.country = place.address_components[i].long_name
        }
      }
      this.getCityId(this.post.city)
      this.mapMounted = true
      const google = this.$store.state.google
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.post.city.lat, lng: this.post.city.lng },
        zoom: 14,
      })
    },
    postCity() {
      this.$axios('items/cities', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        data: {
          city_name: this.post.city.name,
          country: this.post.city.country,
        },
      })
        .then((response) => {
          this.post.city.cityId = response.data.data.city_id
        })
        .catch((e) => {
          console.error(e)
        })
    },
    getCityId() {
      this.$axios('items/cities', {
        method: 'GET',
        params: {
          'filter[city_name][_eq]': this.post.city.name,
          'filter[country][_eq]': this.post.city.country,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => {
          if (response.data.data.length === 0) {
            this.postCity()
          } else {
            this.post.city.cityId = response.data.data[0].city_id
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    addLocationMarker(payload, name) {
      console.log(payload)

      const coordinates = {
        lat: payload.place.geometry.location.lat(),
        lng: payload.place.geometry.location.lng(),
      }
      if (payload.place && payload.place.geometry) {
        const marker = new this.$store.state.google.maps.Marker({
          position: payload.place.geometry.location,
          map: this.map,
          title: payload.place.formatted_address,
        })
        if (this.markers[parseInt(payload.id.charAt(payload.id.length - 1))]) {
          this.removeLocationMarker(payload.id)
          this.markers.push(marker)

          this.markerCoordinates.push(coordinates)
        } else {
          this.markers.push(marker)
          this.markerCoordinates.push(coordinates)
        }

        this.$set(this.post.locationList, payload.id, {
          location_name: name,
          latitude: payload.place.geometry.location.lat(),
          longitude: payload.place.geometry.location.lng(),
          description: '',
          location_image_id: [],
        })
      }
    },
    removeLocationInputAndMarker(inputId) {
      this.fields = this.fields.filter(
        (field) => 'point-of-interest-' + field.id !== inputId
      )
      this.removeLocationMarker(inputId)

      this.$delete(this.post.locationList, inputId)

      if (this.fields.length === Object.keys(this.post.locationList).length) {
        this.addLocationInput()
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
    removeLocationMarker(inputId) {
      if (this.markers[parseInt(inputId.charAt(inputId.length - 1))]) {
        this.markers[parseInt(inputId.charAt(inputId.length - 1))].setMap(null)
        this.markers.splice(parseInt(inputId.charAt(inputId.length - 1)), 1)
      }
    },
    addLocationInput() {
      this.count++
      this.fields.push({
        type: Autocomplete,
        id: this.count,
      })
    },
    addPointToList(payload) {
      const location = this.post.locationList[payload.id]
      if (payload.comment) {
        location.description = payload.comment
      }
      if (payload.images) {
        for (let i = 0; i < payload.images.results.length; i++) {
          if (i === 0) {
            location.location_image_id.push({
              location_image: payload.images.results[i],
              is_thumbnail: true,
            })
          } else {
            location.location_image_id.push({
              location_image: payload.images.results[i],
            })
          }
        }
      }
      this.locationId.push(location)
      if (this.fields.length === Object.keys(this.post.locationList).length) {
        this.addLocationInput()
      }
    },
    resetData() {
      this.count = 0
      this.fields = []
      this.post = {
        title: '',
        city: {},
        content: '',
        locationList: {},
      }
      this.selectedCatIds = []
      this.locationId = []
      this.addLocationInput()
    },
    getCategories(cats) {
      const arr = []
      for (let i = 0; i < cats.length; i++) {
        arr.push({ categories_id: cats[i] })
      }
      return arr
    },
    publishPost(value) {
      const postCategories = this.getCategories(this.selectedCatIds)
      console.log({
        status: value,
        title: this.post.title,
        categories: postCategories,
        city_id: this.post.city.cityId,
        post_content: {
          content: this.post.content,
          location_id: this.locationId,
        },
      })
      this.$axios('items/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        data: {
          status: value,
          title: this.post.title,
          categories: postCategories,
          city_id: this.post.city.cityId,
          post_content: {
            content: this.post.content,
            location_id: this.locationId,
          },
        },
      })
        .then((response) => {
          console.log(response.data)
          this.$nuxt.$router.replace({ path: '/users/' + this.$auth.user.id })
        })
        .catch((e) => {
          this.$root.$emit('notify', 'Publish failed. Try again.')

          console.error(e)
        })
    },
  },
}
</script>
<style lang="scss">
.c-make-blog-content {
  label {
    font-size: $font-size-1;
    font-weight: bold;
  }
  &__container {
    margin: $margin-s;
    #geocode-field {
      width: 300px;
      margin: $margin-s;
    }
  }
  &__poi-container {
    display: flex;

    justify-content: space-around;
    margin: $margin-m;
  }
  &__poi-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    label {
      display: flex;
      flex-direction: column;
    }
  }
  &__poi-inputs {
    display: flex;
    flex-direction: column;
  }
  &__button-container {
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: $margin-m;
  }
  &__intro {
    margin-top: 10em;
    label {
      font-size: $font-size-3;
      color: white;
      font-weight: bold;
      margin: $margin-m;
    }
    div {
      border: white solid;
      border-radius: 20% 20%;
    }
  }
  &__intro::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: linear-gradient(
        to bottom,
        rgba(245, 246, 252, 0.52),
        rgba(105, 45, 90, 0.472)
      ),
      url('https://images.unsplash.com/photo-1623506823118-8ccbd9a7f4f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80')
        no-repeat;
    background-size: cover;
    z-index: -1;
  }
}
.formulate-input-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: $margin-m;
}
#map {
  width: 600px;
  height: 600px;
}
@media screen and (max-width: $mq-m) {
  .c-make-blog-content__poi-container {
    display: flex;
    flex-direction: column-reverse;
  }
  #map {
    width: 100%;
    max-height: 600px;
  }
}
</style>
