<template>
  <div class="container__footer">
    <h1 class="container__footer__title">contact ByWay Hoofdkantoor</h1>
    <div class="container__footer__text">
      <p><strong>Adres:</strong></p>
      <p>Woudstraat 9</p>
      <p>3600 Gent</p>
      <p>België</p>
      <br />
      <p><strong>Contactgegevens:</strong></p>
      <p>Klantendienst telefoonnummer: 089 77 91 14</p>
      <p>(Van maandag tot vrijdag van 9u tot 12u)</p>
      <p>Email: klantendienst@maison-lab.com</p>
      <br />
      <p><strong>Overige info:</strong></p>
      <p>KVK-nummer: 0458022390</p>
      <p>BTW-nummer: BE0458023090</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactPage',
}
</script>
<style lang="scss">
.container__footer {
  margin: $margin-xxl;

  &__title {
    font-size: $font-size-4;
  }

  &__text {
    display: flex;
    justify-content: $center;
    flex-direction: column;
  }
}
</style>
