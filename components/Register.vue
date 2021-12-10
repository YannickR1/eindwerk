<template>
  <div class="c-registration__background" @click.self="closeModal">
    <div class="c-registration">
      <div v-if="!registrationConfirmed" class="c-registration__container">
        <div class="btn-cont">
          <button
            type="button"
            class="c-registration__close"
            @click.self="closeModal"
          >
            X
          </button>
        </div>

        <h1 class="c-registration__container__title">Register Your Profile</h1>
        <form
          class="c-registration__container__form"
          @submit.prevent="registerForm"
        >
          <FormulateInput
            v-model="image"
            type="image"
            name="image"
            label="Select an avatar:"
            validation="mime:image/jpeg,image/png,image/gif"
            :uploader="uploader"
          />
          <label
            >Name*:
            <input v-model="name" type="text" name="name" required />
          </label>
          <label>
            Last name*:
            <input v-model="lastName" type="text" name="lastname" required />
          </label>
          <label>
            Date of birth*:
            <input v-model="dateOfBirth" type="date" name="date-of-birth" />
          </label>
          <label>
            Email*:
            <input
              v-model="email"
              type="email"
              name="email"
              required
            /><!--@change="checkEmail"-->
          </label>
          <label>
            Phone number:
            <input v-model="phoneNumber" type="tel" name="phone-number" />
          </label>
          <FormulateInput
            v-model="selectedCategories"
            :options="usableCategories"
            class="c-registration__categories"
            type="checkbox"
            label="Pick your Favorite Categories"
          />
          <label>
            Password*:
            <div class="c-registration__container__form__password-label">
              <input
                v-model.lazy="password"
                class="c-registration__container__form__password-input"
                :type="passwordFieldType"
                name="password"
                required
              />
              <button
                class="c-registration__container__form__password-button"
                type="button"
                @click="onVisibilityPassword"
              >
                <font-awesome-icon
                  v-if="passwordVisible"
                  :icon="['fas', 'eye-slash']"
                />
                <font-awesome-icon v-else :icon="['fas', 'eye']" />
              </button>
            </div>
            <div v-if="password != null">
              <span v-if="passCheck"></span>
              <span v-else
                >Password does not meet our requirements (min 7 characters, min
                1 Uppercase, min 1 number)
              </span>
            </div>
          </label>
          <label>
            Confirm Password*:
            <input
              v-model.lazy="password2"
              class="c-registration__container__form__password-input"
              :type="passwordFieldType"
              name="password"
              novalidate
              required
            />
            <div v-if="password2">
              <span v-if="!isEqual">Password is not the same.</span>
            </div>
          </label>
          <div class="c-registration__container__button">
            <button
              id="confirm-button"
              type="submit"
              class="c-registration__container__form__confirm-button button--green"
              :class="{ active: activeSubmit }"
              disabled
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// ######
// does email fulfill requirement? NO MAIL VERIFICATION.
// show green confirmation sign when passwords are good
// put in 'after' elements when inputs are sufficient

export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      password: null,
      password2: null,
      dateOfBirth: '',
      phoneNumber: '',
      categories: [],
      selectedCategories: [],
      passwordFieldType: 'password',
      passwordVisible: false,
      registrationConfirmed: false,
      image: null,
    }
  },
  computed: {
    isEqual() {
      return this.password2 != null && this.password === this.password2
    },
    passCheck() {
      const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/gm
      return regEx.test(this.password)
    },
    usableCategories() {
      return this.categories.map((el) => ({ value: el.id, label: el.name }))
    },
    // checkEmail() {
    //   let regEx = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
    //   return regEx.test(this.email)
    // },

    activeSubmit() {
      if (this.isEqual && this.passCheck && this.email) {
        this.toggleButtonState()
        return true
      }
      return false
    },
    registrationBody() {
      return JSON.stringify({
        first_name: this.name,
        last_name: this.lastName,
        email: this.email,
        birthday: this.dateOfBirth,
        password: this.password,
        role: 'ddead7e2-e295-4385-adc5-7b56cb60814b',
        phonenumber: this.phoneNumber,
        interests: this.selectedCategories,
      })
    },
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
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
            url: 'http://134.122.85.108/assets/' + response.data.data.id,
            directus_files_id: response.data.data.id,
          }
        })
        .catch((error) => {
          error("Can't upload file. Try again.")
        })
    },
    registerForm() {
      fetch('http://134.122.85.108/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.registrationBody,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Registration failed')
          }
          console.log(response)
        })
        .then(() => {
          this.registrationConfirmed = true
        })
        .catch((err) => {
          console.error(err)
        })
    },
    onVisibilityPassword() {
      this.passwordFieldType =
        this.passwordFieldType === 'text' ? 'password' : 'text'
      this.passwordVisible = !this.passwordVisible
    },
    toggleButtonState() {
      document.getElementById('confirm-button').disabled = false
    },

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
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style lang="scss">
.c-registration__background {
  overflow-y: auto;
  z-index: 1;
}
.btn-cont {
  display: $display-flex;
  justify-content: flex-end;
}

.c-registration {
  position: $pos-absolute;
  margin: auto;
  top: 1em;
  left: 0;
  right: 0;
  width: 50%;
  display: $display-flex;
  flex-direction: $flex-direction-column;
  height: auto;
  background-color: $dark-blue;
  color: $wheat;
  box-shadow: 0 0 15px 10px hsla(0, 0%, 7%, 0.6);
  border-radius: $border-radius-l;

  &__close {
    background: $dark-blue;
    border: 2px solid $white;
    margin-top: 1em;
    color: $white;

    &:hover {
      background: $white;
      color: $black;
    }
  }

  &__background {
    position: $pos-fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: black;
  }

  &__container {
    padding: 1.5em;

    &__title {
      font-weight: $font-weight-l;
      font-size: $font-size-2;
      text-align: $center;
      margin-bottom: 20px;
    }

    &__form {
      display: $display-flex;
      flex-direction: $flex-direction-column;

      &__password-button {
        padding: 13px 20px;
        margin: 10px 0;
      }

      &__password-input {
        width: 50%;
      }

      .formulate-input-wrapper .formulate-input-label {
        font-size: 1.05em;
        font-weight: normal;
      }

      &__confirm-button {
        margin: 1.5em 0 0.5em 0;
        display: $display-flex;
        justify-content: $center;
        align-items: $center;
        width: 45%;
        height: 4em;
        background-color: grey;
        border-radius: $border-radius-s;
        border: 1px solid $white;
        color: $white;
        &:disabled {
          cursor: not-allowed;
        }
        &.active {
          background-color: $lightgreen;
        }
      }
    }

    &__button {
      display: $display-flex;
      justify-content: $center;
    }

    label {
      display: $display-flex;
      flex-direction: $flex-direction-column;
      font-size: 1.05em;
    }

    .formulate-input-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: $margin-m;
    }

    input {
      min-height: 44px;
      margin: 0.5em 0;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
