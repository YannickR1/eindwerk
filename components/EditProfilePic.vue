<template>
  <main class="c-container__editprofile">
    <h1>Edit profile</h1>
    <div id="avatar-container">
      <img ref="avatar" :src="'data:image/png;base64'" alt="" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      userDescription: this.$auth.user.description,
      profileImgID: this.$auth.user.avatar,
    }
  },
  computed: {},
  mounted() {
    this.$axios(`/files/${this.profileImgID}`, {
      method: 'GET',
      responseType: 'arraybuffer',
    }).then((response) => {
      this.arrayBufferToBase64(response.data)

      // this.link = this.$refs.avatar.src = Buffer.from(
      //   response.data,
      //   'binary'
      // ).toString('base64')

      // const reader = new FileReader()
      // reader.readAsDataURL(response.data)
      // reader.onload = function () {
      //   console.log(reader.result)
      // }
    })
  },
}
</script>

<style></style>
