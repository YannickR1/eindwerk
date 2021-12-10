<template>
  <div>
    <Header />
    <MakeABlogBtn v-if="this.$auth.loggedIn" />
    <Nuxt />
    <Footer />
    <Notify />
  </div>
</template>

<script>
import Notify from '~/components/Notify'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import MakeABlogBtn from '~/components/MakeABlogBtn'

export default {
  name: 'DefaultLayout',
  components: { Notify, Header, Footer, MakeABlogBtn },
}
</script>

<style lang="scss">
.green--button {
  background: grey;
  border-radius: 5px;
  border: 1px solid white;
  font-family: 'Manrope';
  color: white;
  height: 50px;
  width: 200px;

  &:hover {
    font-weight: bold;
    background: $dark-blue;
  }
  &:disabled {
    background: grey;
    font-weight: normal;
    cursor: no-drop;
  }
}
</style>
