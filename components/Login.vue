<template>
  <div class="login__background" @click.self="closeModal">
    <div class="login">
      <form class="login__form" @submit.prevent="login">
        <button type="button" class="login__close" @click.self="closeModal">
          X
        </button>
        <label class="login__form__mail">
          E-mail
          <input
            v-model="email"
            class="login__form__mail__input"
            type="text"
            placeholder="Enter email"
            name="email"
          />
        </label>
        <label class="login__form__ww">
          Password
          <input
            v-model="password"
            class="login__form__ww__input"
            type="password"
            placeholder="Enter password"
            name="password"
          />
        </label>
        <button class="login__form__login-button" type="submit">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    loginBody() {
      return { email: this.email.toLowerCase(), password: this.password }
    },
  },
  methods: {
    closeModal() {
      this.$emit('hideLogin')
    },
    async login() {
      await this.$auth
        .loginWith('local', { data: this.loginBody })
        .then(() => {
          this.$root.$emit('notify', 'Logged in succesfully')
          this.$emit('hideLogin')
        })
        .catch(() => {
          this.$auth.onError(console.error('Failed to login'))
          this.$root.$emit('notify', 'Authorization failed, please try again')
        })
    },
  },
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

.login {
  &__background {
    z-index: 1;
    position: $pos-fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &__close {
    background: transparent;
    align-self: flex-end;
    margin-top: 1em;

    &:hover {
      background: $white;
    }
  }

  &__form {
    position: $pos-absolute;
    left: 50%;
    transform: translate(-50%, 50%);
    padding: 0 2em;
    display: $display-flex;
    flex-direction: $flex-direction-column;
    justify-content: $space-evenly;
    align-items: $center;
    border-radius: $border-radius-xl;
    background-color: $light-rose;
    box-shadow: 0px 0px 15px 10px hsla(0, 0%, 3%, 0.6);

    label {
      display: flex;
      flex-direction: column;
    }

    &__mail {
      font-weight: $font-weight-l;
      font-size: $font-size-1;
      margin-top: $margin-xxxl;
    }

    &__ww {
      font-weight: $font-weight-l;
      font-size: $font-size-1;
      margin-bottom: $margin-l;
    }

    &__mail__input,
    &__ww__input {
      background: $light-rose;
      width: 250px;
      height: 44px;
      font-size: 15px;
      border-radius: 10px;
      margin: 0.25em 0;

      &:focus {
        outline: none;
      }
    }

    &__login-button {
      background-color: $dark-blue;
      // font-size: $font-size-3;
      font-weight: $font-weight-l;
      color: $white;
      border-radius: $border-radius-s;
      border: 2px solid $white;
      width: 150px;
      height: 50px;
      justify-self: $center;
      margin-bottom: $margin-l;

      &:hover {
        background-color: $white;
        border: 2px solid $dark-blue;
        color: $dark-blue;
        opacity: 0.7;
      }
    }
    ::placeholder {
      background-color: $light-rose;
      border: 3px solid $light-rose;
      padding: 0;
    }
  }
}
</style>
