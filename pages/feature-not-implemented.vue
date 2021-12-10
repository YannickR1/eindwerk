<template>
  <main class="p-feature-not">
    <h1>This feature is coming in the near future!</h1>
  </main>
</template>

<script>
export default {
  name: 'FeatureNotHerePage',
}
</script>

<style lang="scss">
.p-feature-not {
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  height: 100vh;
  h1 {
    font-size: $font-size-4;
    color: white;
  }
}
</style>
