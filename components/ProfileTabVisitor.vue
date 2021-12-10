<template>
  <div class="profile">
    <div class="profile__overview">
      <ul class="profile__container">
        <li class="profile__tab active">Posts</li>
      </ul>
    </div>
    <div class="tabContent">
      <div>
        <ProfilePostsVisitor :user-info="userInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePostsVisitor from '~/components/ProfilePostsVisitor'

export default {
  components: {
    ProfilePostsVisitor,
  },
  props: {
    userInfo: { type: Object, required: true },
  },
}
</script>

<style lang="scss">

</style>
