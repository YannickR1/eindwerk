<template>
  <footer class="footer">
    <div class="footer__row">
      <ul class="container__footer">
        <li>
          <a class="footer_link" href="#">
            <router-link v-slot="{ href, navigate }" to="/about">
              <button :href="href" class="whatever-you-want" @click="navigate">
                About us
              </button>
            </router-link>
          </a>
        </li>
        <li>
          <a class="footer_link" href="#">
            <router-link v-slot="{ href, navigate }" to="/services">
              <button :href="href" class="whatever-you-want" @click="navigate">
                Our Services
              </button>
            </router-link>
          </a>
        </li>
        <li>
          <a class="footer_link" href="#">
            <router-link v-slot="{ href, navigate }" to="/privacy">
              <button :href="href" class="whatever-you-want" @click="navigate">
                Privacy policy
              </button>
            </router-link>
          </a>
        </li>
        <li>
          <a class="footer_link" href="#">
            <router-link v-slot="{ href, navigate }" to="/terms">
              <button :href="href" class="whatever-you-want" @click="navigate">
                Terms and Conditions
              </button>
            </router-link>
          </a>
        </li>
        <li>
          <a class="footer_link" href="#">
            <router-link v-slot="{ href, navigate }" to="/contact">
              <button :href="href" class="whatever-you-want" @click="navigate">
                Contact Us
              </button>
            </router-link>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer {
  background: $dark-blue;
  padding: 5px 0px;
  text-align: center;

  // &__row {
  //   width: 100%;
  //   margin: 2% 0%;
  //   padding: 0.6% 0%;
  //   color: black;
  //   font-size: 0.8em;
  // }

  // &__row a {
  //   text-decoration: none;
  //   font-family: 'Manrope';
  //   font-weight: 700;
  //   color: black;
  //   transition: 0.4s;
  // }

  // &__row a:hover {
  //   color: $white;
  // }

  // &__row ul {
  //   width: 100%;
  // }

  &__row ul li {
    display: inline-block;
    margin: 0px 30px;
  }

  &__row a i {
    font-size: 2em;
    margin: 0% 1%;
  }
}

.container__footer {
  border: none;
  margin-top: 2em;
  margin-bottom: 2em;
}

.footer_link {
  text-decoration: none;
  border: transparent;
}

.whatever-you-want {
  border: none;
  background: $dark-blue;
  color: $grey;
  font-weight: $font-weight-l;

  &:hover {
    color: $white;
    cursor: pointer;
  }
}
</style>
