<template>
  <div class="c-autocomplete">
    <div class="c-autocomplete__container-input">
      <input
        :id="inputId"
        ref="inputField"
        v-model.lazy="autocompleteText"
        name="autocomplete"
        type="text"
        size="50"
        placeholder="Location"
        autocomplete="off"
      />
      <label :for="inputId">
        <slot></slot>
      </label>
    </div>
    <span v-if="googleSuggest" class="c-autocomplete__warning">
      {{ message }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    autocompleteType: {
      type: String,
      default() {
        return null
      },
      required: false,
    },
    inputId: {
      type: String,
      required: true,
    },
    bias: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      autocomplete: null,
      autocompleteText: '',
      place: null,
      google: null,
      googleSuggest: false,
      message: '',
    }
  },

  mounted() {
    this.google = this.$store.state.google
    const input = this.$refs.inputField
    let defaultbounds = null
    const options = {}

    if (this.autocompleteType) {
      options.types = [this.autocompleteType]
    }

    if (this.bias) {
      defaultbounds = {
        north: this.bias.lat + 0.1,
        south: this.bias.lat - 0.1,
        east: this.bias.lng + 0.1,
        west: this.bias.lng - 0.1,
      }
      options.componentsRestrictions = {
        country: this.bias.country_short.toLowerCase(),
      }
      options.bounds = defaultbounds
      options.strictBounds = true
    }
    options.fields = [
      'address_components',
      'formatted_address',
      'geometry',
      'business_status',
      'name',
      'type',
    ]

    this.autocomplete = new this.google.maps.places.Autocomplete(input, options)

    this.autocomplete.addListener('place_changed', this.locationSelected)
  },
  methods: {
    locationSelected() {
      this.place = this.autocomplete.getPlace()
      if (this.place.geometry) {
        this.googleSuggest = false
        this.$emit('locationSelected', this.place, this.autocompleteText)
      } else {
        new this.google.maps.Geocoder().geocode(
          {
            address: this.place.name,
          },
          (result, status) => {
            if (status === 'OK') {
              this.message =
                'Google made you a suggestion. If the current result is not satisfying. You might need to specify your search.'
              this.googleSuggest = true
              if (
                this.autocompleteType === '(cities)' &&
                result[0].types.includes('locality' && 'political')
              ) {
                this.autocompleteText = result[0].formatted_address
                this.$emit('locationSelected', result[0])
              } else if (this.autocompleteType === '(cities)') {
                this.autocompleteText = ''
                this.message =
                  'You did not enter a correct city. Please try again.'
              } else {
                this.$emit('locationSelected', result[0])
              }
            } else {
              this.message =
                'Something went wrong. Try again and specify your search.'
              this.googleSuggest = true
              this.$emit('locationSelected', undefined)
            }
          }
        )
      }
    },
  },
}
</script>
<style lang="scss">
.c-autocomplete {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__container-input {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
  }
}
</style>
