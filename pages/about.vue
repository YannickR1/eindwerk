<template>
  <div class="container__footer">
    <h1 class="container__footer__title">About</h1>
    <div class="container__footer__text">
      <p>
        ByWay uit Gent is een blogplatform waar elke blogger zijn mening
        kwijtkan over een bepaalde plaats door een review te schrijven.
      </p>
      <p>
        Op het platform kan men een beoordeling geven op de review. Zo kunnen de
        posts hogerop verschijnen
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutPage',
}
</script>
<style lang="scss">
.container__footer {
  margin: $margin-xl;

  &__title {
    font-size: $font-size-4;
  }
}
</style>
