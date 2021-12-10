<template>
  <form class="c-container__changepassword" @submit.prevent="ChangePassword">
    <label class="c-container__changepassword__label"
      >Current Password
      <input
        id="password"
        v-model.lazy="inputPassword"
        type="password"
        name="password"
        required
        @change="login"
      />
    </label>
    <div v-if="inputPassword">
      <span v-if="!inputCorrect"
        >Password is not correct. Please try again.</span
      >
    </div>
    <label class="c-container__changepassword__label"
      >New Password
      <input
        id="new-password"
        v-model.lazy="newPassword"
        type="password"
        name="new-password"
        :disabled="!inputCorrect"
        required
      />
    </label>
    <div v-if="newPassword">
      <span v-if="passCheck">Check</span>
      <span v-else
        >Password does not meet requirements (min 7 characters, min 1 Uppercase,
        min 1 number)
      </span>
    </div>
    <label class="c-container__changepassword__label">
      Confirm New Password
      <input
        id="new-password-test"
        v-model.lazy="confirmPassword"
        type="password"
        name="new-password-test"
        :disabled="!passCheck"
      />
    </label>
    <div v-if="confirmPassword">
      <span v-if="isUnequal"> Password inputs are not the same. </span>
    </div>
    <div class="c-container__changepassword__button">
      <button
        id="c-change--btn"
        type="submit"
        class="c-container__changepassword__button__content"
        :disabled="!enableButton"
      >
        > Save Password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      inputPassword: null,
      inputCorrect: false,
      newPassword: null,
      confirmPassword: null,
      accessToken: this.$auth.strategy.token.get(),
      error: new Error('Password is not correct'),
      passwordChanged: false,
      message: '',
    }
  },
  computed: {
    enableButton() {
      return this.passCheck && !this.isUnequal
    },
    passCheck() {
      const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/gm

      return regEx.test(this.newPassword)
    },
    loginJson() {
      return JSON.stringify({
        email: this.$auth.user.email,
        password: this.inputPassword,
      })
    },
    isUnequal() {
      return !(this.newPassword === this.confirmPassword)
    },
  },
  methods: {
    login() {
      fetch('http://134.122.85.108/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.loginJson,
      }).then((response) => {
        if (!response.ok) {
          this.inputCorrect = false
          // throw this.error
        } else {
          this.inputCorrect = true
          console.log(this.inputCorrect)
        }
      })
      // .catch((err) => {
      //   console.error(err)
      // })
    },
    ChangePassword() {
      this.$axios('/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        data: { password: this.newPassword },
      })
        .then((response) => {
          this.passwordChanged = true
          this.message = 'Password Changed'
        })
        .catch((err) => {
          this.passwordChanged = true
          this.message = 'Action failed. Try again later.'
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss">
.c-container__changepassword {
  margin-top: $margin-xl;
  &__label {
    display: flex;
    flex-direction: column;
    margin-bottom: $margin-m;
    width: 50%;
  }

  &__button {
    &__content {
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
  }
}

@media screen and (max-width: $mq-m) {
  .c-container__changepassword__button__content {
    height: 50px;
    width: 200px;
  }
}
</style>
