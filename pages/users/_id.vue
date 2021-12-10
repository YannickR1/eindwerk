<template>
  <section>
    <div
      v-if="isLoggedIn && $route.params.id === $auth.user.id"
      class="logged-in-container"
    >
      <ProfileInfo />
      <div class="logged-in-container__component">
        <ProfileTabs />
      </div>
    </div>
    <div v-else>
      <ProfileInfoVisit :user-info="userInfo" />
      <div>
        <ProfileTabVisitor :user-info="userInfo" />
      </div>
    </div>
  </section>
</template>
<script>
import ProfileTabs from '~/components/ProfileTabs'
import ProfileInfo from '~/components/ProfileInfo'
import ProfileTabVisitor from '~/components/ProfileTabVisitor'
import ProfileInfoVisit from '~/components/ProfileInfoVisit'

export default {
  components: {
    ProfileTabs,
    ProfileInfo,
    ProfileTabVisitor,
    ProfileInfoVisit,
  },
  async asyncData({ params, $axios }) {
    const user = await $axios.$get(`/users/${params.id}`, {
      params: {
        fields:
          '*,user_rating,first_name,last_name,posts.*,posts.post_rating.*,interests.*.*',
      },
    })
    const userData = user.data
    return { userInfo: userData }
  },
  data() {
    return {
      userInfo: null,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },
}
</script>

<style lang="scss"></style>
