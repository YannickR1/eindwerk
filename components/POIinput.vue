<template>
  <div class="c-poi-input">
    <div class="c-poi-input__container">
      <button class="c-poi-input__btn-drop" @click="showLocationInfo">
        <font-awesome-icon :icon="changeIcon" />
      </button>

      <div class="c-poi-input__city-input">
        <Autocomplete
          class="c-poi-input__location"
          :input-id="inputId"
          :bias="bias"
          @locationSelected="addLocationMarker"
        >
          <slot />
        </Autocomplete>
      </div>

      <button class="c-poi-input__remove-btn" @click="removeLocationInput">
        <img
          class="c-poi-input__remove-btn__image"
          src="https://img.icons8.com/material-sharp/48/000000/filled-trash.png"
        />
      </button>
    </div>
    <div v-if="isLocationSelected" class="c-poi-input__info">
      <label class="c-poi-input__info__review"
        >Your Experience of This Place
        <textarea
          :id="textareaId"
          v-model="locationReview"
          name="review-input"
          cols="30"
          rows="5"
        ></textarea>
      </label>
      <FormulateInput
        v-model="images"
        type="image"
        name="images"
        label="Select an image to upload"
        validation="mime:image/jpeg,image/png,image/gif"
        :uploader="uploader"
        multiple
      />
      <button class="green--button" @click="saveLocationInfo">
        Save Location
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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
    textareaId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      autocomplete: null,
      isLocationSelected: false,
      latLng: null,
      google: null,
      locationReview: '',
      images: null,
    }
  },
  computed: {
    changeIcon() {
      return this.isLocationSelected
        ? ['fas', 'caret-down']
        : ['fas', 'caret-right']
    },
  },
  methods: {
    addLocationMarker(place, name) {
      if (place !== undefined) {
        this.isLocationSelected = true
        this.$emit('add', { id: this.inputId, place }, name)
      }
    },
    removeLocationInput() {
      this.$emit('remove', this.inputId)
    },
    showLocationInfo() {
      this.isLocationSelected = !this.isLocationSelected
    },
    uploader(file, progress, error) {
      const formData = new FormData()
      formData.append('file', file)

      return this.$axios('/files', {
        method: 'POST',
        data: formData,
      })
        .then((response) => {
          console.log(response)

          progress(100)

          return {
            id: response.data.data.id,
          }
        })
        .catch((error) => {
          error("Can't upload file. Try again.")
        })
    },
    saveLocationInfo() {
      this.$emit('save', {
        id: this.inputId,
        comment: this.locationReview,
        images: this.images,
      })
      this.isLocationSelected = false
    },
  },
}
</script>

<style lang="scss">
$primary: #11998e;
$secondary: #38ef7d;
$font-color-input: rgb(22, 20, 20);
$gray: #9b9b9b;

.c-poi-input {
  margin: $margin-s;
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
  }
  &__city-input {
    position: relative;
    display: flex;

    padding: 15px 0 0;
    margin: 1em;
    width: 50%;
  }
  &__btn-drop {
    background: none;
    border: none;
  }
  &__location input {
    font-family: inherit;
    width: 100%;

    border: 0;
    border-bottom: 2px solid $gray;
    outline: 0;
    font-size: 1.3rem;
    color: $font-color-input;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  &__location label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $gray;
    pointer-events: none;
  }

  &__location input:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: $primary;
      font-weight: 700;
    }
    padding-bottom: 6px;
    // font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $primary, $secondary);
    border-image-slice: 1;
  }

  &__info {
    padding-left: $padding-m;
    &__review {
      display: flex;
      flex-direction: column;
    }
  }
  &__remove-btn {
    border: none;
    background: none;
    &__image {
      max-width: 30px;
      opacity: 0.3;
    }
  }
  .green--button {
    max-width: 150px;
    max-height: 30px;
  }
}
</style>
