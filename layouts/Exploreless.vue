<template>
  <div>
    <HeaderWOExplore />
    <MakeABlogBtn v-if="this.$auth.loggedIn" />

    <Nuxt />
    <Footer />
    <Notify />
  </div>
</template>

<script>
import Notify from '~/components/Notify'
import HeaderWOExplore from '~/components/HeaderWithoutExplore'
import Footer from '~/components/Footer'

export default {
  name: 'ExploreLayout',
  components: { Notify, HeaderWOExplore, Footer },
}
</script>

<style lang="scss"></style>
