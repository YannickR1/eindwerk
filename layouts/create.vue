<template>
  <div>
    <Header />
    <Nuxt />

    <Notify />
  </div>
</template>

<script>
import Notify from '~/components/Notify'
import Header from '~/components/Header'

export default {
  name: 'CreateLayout',
  components: { Notify, Header },
}
</script>

<style lang="scss"></style>
