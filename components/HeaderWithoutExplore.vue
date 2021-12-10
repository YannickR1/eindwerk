<template>
  <header class="header">
    <nav class="header__nav">
      <NuxtLink to="/" class="header__nav__logo">
        <div class="header__nav__logo">
          <img
            src="~/assets/logo.png"
            alt="logo"
            class="header__nav__logo--image"
          />
          <p class="header__nav__logo--text">byway.</p>
        </div>
      </NuxtLink>

      <div class="header__nav__buttons">
        <div v-if="!isLoggedIn" class="header__nav__buttons__not-logged-in">
          <button
            class="header__nav__buttons__not-logged-in header__nav__button"
            type="button"
            @click="showLogin"
          >
            Log in
          </button>
          <button
            class="header__nav__buttons__not-logged-in header__nav__button"
            type="button"
            @click="showRegistration"
          >
            Sign up
          </button>
        </div>

        <div v-if="isLoggedIn" class="header__nav__buttons__logged-in">
          <button
            class="header__nav__buttons__logged-in__profile-pic-button"
            @click="showDropdown"
          >
            <img
              v-if="$auth.$state.user.avatar === null"
              src="~/assets/defaultprofile.jpg"
              alt="Your Profile Picture"
              class="header__nav__buttons__logged-in__profile-pic-button--image"
            />
            <img
              v-else
              :src="imageUrl($auth.$state.user.avatar)"
              alt="Your Profile Picture"
              class="header__nav__buttons__logged-in__profile-pic-button--image"
            />
          </button>
          <div
            v-if="dropdownActive"
            class="header__nav__buttons__logged-in__dropdown-menu"
          >
            <button
              class="
                header__nav__buttons__logged-in__dropdown-menu__button
                header__nav__button
              "
              type="button"
              @click="closeDropdown"
            >
              <NuxtLink :to="`/users/${$auth.user.id}`" @click="closeDropdown">
                Profile
              </NuxtLink>
            </button>
            <button
              class="
                header__nav__buttons__logged-in__dropdown-menu__button
                header__nav__button
              "
              type="button"
              @click="closeDropdown"
            >
              <NuxtLink to="/settings"> Settings </NuxtLink>
            </button>
            <button
              class="
                header__nav__buttons__logged-in__dropdown-menu__button
                header__nav__button
              "
              type="button"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="modals">
      <div v-if="loginModal">
        <Login @hideLogin="hideLogin" />
      </div>
      <div v-if="registrationModal">
        <Register @closeModal="hideRegistration" />
      </div>
    </div>
  </header>
</template>

<script>
import Register from '~/components/Register'
import Login from '~/components/Login'

export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
      loginModal: false,
      registrationModal: false,
      dropdownActive: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    imageUrl(id) {
      return (
        'http://134.122.85.108/assets/' + id + '?width=75&height=75&fit=cover'
      )
    },
    logout() {
      this.$auth.logout()
    },
    showLogin() {
      this.loginModal = !this.loginModal
      this.registrationModal = false
      document.body.style.overflow = 'hidden'
    },
    hideLogin() {
      this.loginModal = false
      this.dropdownActive = false
      document.body.style.overflow = 'auto'
    },
    showRegistration() {
      this.registrationModal = !this.registrationModal
      this.loginModal = false
      document.body.style.overflow = 'hidden'
    },
    hideRegistration() {
      this.registrationModal = false
      document.body.style.overflow = 'auto'
    },
    showDropdown() {
      this.dropdownActive = !this.dropdownActive
    },
    closeDropdown() {
      console.log('klik')
      this.dropdownActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  object-fit: contain;
  width: 500px;
}

.header {
  top: 0;
  // height: 150px;
  width: 100%;
  background-color: $dark-blue;
  display: $display-flex;
  justify-content: $space-between;
  align-items: $center;

  &__nav {
    display: $display-flex;
    justify-content: $space-between;
    align-items: center;
    width: 100%;

    &__explore {
      font-size: $font-size-2;
    }

    &__logo {
      display: $display-flex;
      align-items: $center;
      flex-direction: row;
      text-decoration: none;

      &--image {
        display: $display-block;
        margin: 0.5em 0.5em 0.5em 2em;
        height: 50px;
        width: auto;
      }

      &--text {
        font-family: 'Staatliches';
        font-size: $font-size-6;
        color: whitesmoke;
      }
    }

    &__button {
      align-items: $center;
      transition-duration: 0.4s;
      box-shadow: 0 4px 20px 0 hsla(0, 0%, 0%, 0.5);
      font-size: $font-size-1;
      font-weight: $font-weight-l;
      color: $white;
      background-color: transparent;
      padding: 5px 18px;
      border-radius: $border-radius-s;
      border: 1px solid $white;

      & a {
        text-decoration: none;
        &:hover {
          color: $dark-blue;
        }
      }

      &:hover {
        background-color: $white;
        color: $dark-blue;
        opacity: 0.5;
      }
    }

    &__buttons {
      margin: 0.5em 2em 0.5em 0.5em;

      &__logged-in {
        &__profile-pic-button {
          &--image {
            object-fit: contain;
            width: 50px;
          }
        }

        &__dropdown-menu {
          background-color: $dark-blue;
          position: $pos-absolute;
          right: 0;
          padding: $padding-m;
          margin-right: $margin-m;
          display: $display-flex;
          flex-direction: $flex-direction-column;
          box-shadow: 0 5px 15px 5px hsla(0, 0%, 3%, 0.6);
          border-radius: 10px 0 10px 10px;
          z-index: 1;

          a {
            color: whitesmoke;
          }

          &__button {
            margin: $margin-s;
            text-decoration: none;
          }

          & a {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .header__nav__buttons__logged-in__profile-pic-button {
    padding: 0;
  }
}

@media screen and (max-width: $mq-s) {
  .header__nav {
    &__logo {
      width: 250px;
    }
    &__logo--image {
      width: 20%;
      margin-left: 1em;
    }
    &__logo--text {
      font-size: 26px;
    }
    &__button {
      font-size: 16px;
      margin-right: 2em;
    }
    &__buttons {
      margin-right: 0.5em;
    }
  }
}
</style>
