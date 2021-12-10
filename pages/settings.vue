<template>
  <div class="p-settings">
    <h1 class="p-settings__title">Edit profile</h1>
    <form class="p-settings__form" @submit.prevent="changeSettings">
      <label class="p-settings__label"
        >Last Name:
        <input
          v-model.lazy="lastName"
          type="text"
          name="lastname"
          placeholder="Last name"
          required
        />
      </label>
      <label class="p-settings__label"
        >First Name:
        <input
          v-model.lazy="firstName"
          type="text"
          name="firstname"
          placeholder="First name"
          required
        />
      </label>
      <label class="p-settings__label"
        >Bio:
        <textarea
          id="settings-bio"
          v-model.lazy="description"
          name="description"
          cols="30"
          rows="10"
          placeholder="I love to travel."
          required
        ></textarea>
      </label>

      <FormulateInput
        v-model="interests"
        :options="usableCategories"
        class="c-registration__categories"
        type="checkbox"
        label="Pick your Favorite Categories"
      />
      <button
        id="p-settings--btn"
        type="submit"
        class="p-settings__button"
        :disabled="changesMade"
      >
        > Save Settings
      </button>
    </form>
    <ChangePassword />
  </div>
</template>

<script>
import ChangePassword from '~/components/ChangePassword.vue'

export default {
  name: 'SettingsPage',
  components: {
    ChangePassword,
  },
  middleware: 'auth',
  data() {
    return {
      description: this.$auth.user.description,
      lastName: this.$auth.user.last_name,
      firstName: this.$auth.user.first_name,
      categories: [],
      changesMade: true,
      firstload: false,
      interests: [],
    }
  },
  computed: {
    usableCategories() {
      return this.categories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    },
    settingsBody() {
      return {
        first_name: this.firstName,
        last_name: this.lastName,
        description: this.description,
        interests: this.categoriesToPatch,
      }
    },
    categoriesToPatch() {
      const arr = []
      for (let i = 0; i < this.interests.length; i++) {
        arr.push({ categories_id: parseInt(this.interests[i]) })
      }
      return arr
    },
  },
  watch: {
    settingsBody(newVal, oldVal) {
      if (this.firstload) {
        if (newVal !== oldVal) {
          this.changesMade = false
        }
      }
      this.firstload = true
    },
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    changeSettings() {
      this.$axios('/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.settingsBody,
      })
        .then((response) => {
          this.changesMade = true
          this.$root.$emit('notify', 'Changes succesful')
        })
        .catch((err) => {
          this.$root.$emit('notify', 'Changes failed. Please Try again')
          console.error(err)
        })
    },
    getCategories() {
      const arr = []
      const userInterests = this.$auth.user.interests
      console.log(this.$auth.user)
      for (let i = 0; i < userInterests.length; i++) {
        arr.push(userInterests[i].categories_id.id)
      }
      return arr
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
        this.interests = this.getCategories()
      })
    },
  },
}
</script>

<style lang="scss">
.p-settings {
  background: whitesmoke;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5em;
  font-size: 1em;

  &__title {
    font-size: $font-size-5;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.5em 0em;
  }

  &__button {
    background: $dark-blue;
    border-radius: 5px;
    border: 1px solid white;
    font-family: 'Manrope';
    color: white;
    height: 60px;
    width: 300px;
    &:disabled {
      background: grey;
      font-weight: normal;
      cursor: no-drop;
    }
    &:enabled:hover {
      font-weight: bold;
    }
  }

  .formulate-input-element {
    display: block;
    position: relative;
  }
  .formulate-input-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: $margin-m;
    margin-bottom: $margin-xxl;
  }
  .formulate-input-element.formulate-input-element--checkbox {
    display: flex;
    align-items: center;
    padding-right: 1em;
  }
  .c-registration__categories .formulate-input-wrapper {
    display: flex;
    flex-direction: column;
  }

  .formulate-input-label--after {
    font-weight: bold;
  }
}

@media screen and (max-width: $mq-m) {
  .formulate-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 400px;
  }

  .p-settings__button {
    height: 50px;
    width: 200px;
  }
}
</style>
