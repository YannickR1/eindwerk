<template>
  <div class="profile">
    <div class="profile__overview">
      <ul class="profile__container">
        <li v-for="tab in tabs"  :key="'tab' + tab.id"  class="profile__tab" :class="{active: tab.selected}" @click="selectTab(tab.id)">
          {{ tab.name }}
        </li>
      </ul>
    </div>
    <div class="tabContent"> 
      <div v-if="currentTab === 1">
        <ProfilePosts :user-info="userInfo" />
      </div>
      <div v-if="currentTab === 2">
        <Drafts :user-info="userInfo" />
      </div>
      <div v-if="currentTab === 3">
        <Saved :user-info="userInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePosts from '~/components/ProfilePosts'
import Drafts from '~/components/Drafts'
import Saved from '~/components/Saved'

export default {
  components: {
    ProfilePosts,
    Drafts,
    Saved,
  },
  data() {
    return {
      currentTab: 1,
      tabs: [
        { name: 'Posts', id: 1, selected: true },
        { name: 'Drafts', id: 2, selected: false },
        { name: 'Saved', id: 3, selected: false },
      ],
    }
  },
  computed: {
    userInfo() {
      return this.$auth.user
    },
  },
  methods: {
    selectTab(selectedTab) {
      this.currentTab = selectedTab
      this.tabs.forEach((tab) => {
        if (tab.id === selectedTab){
          tab.selected = true
        } else {
          tab.selected = false
        }
      })
    },
  },
}
</script>

<style lang="scss">
li.active {
  color: black;
  border-top: 1px solid black;
}

.profile {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__overview {
    width: 95%;
    display: $display-flex;
    justify-content: $center;
    align-content: $center;
    flex-direction: $flex-direction-column-reverse;
    background-color: whitesmoke;
    font-weight: $font-weight-l;
  }

  &__container {
    display: $display-flex;
    justify-content: $center;
    padding: 0;
    list-style: none;
    display: $display-flex;
    flex-direction: $flex-direction-row;
    justify-content: $space-evenly;
    color: $grey;
  }

  &__tab {
    width: 100%;
    display: $display-flex;
    justify-content: $center;
    font-weight: $font-weight-l;
    font-size: $font-size-2;
    border-top: 1px solid lightgrey;
    padding-top: 1em;
    

    &:hover {
      color: $black;
      cursor: pointer;
    }
  }
}

/* MEDIA QUERIES */

@media screen and (max-width: 900px) {
  // .profile {
  //   // &__overview li {
  //   //   margin: 0em 2em;
  //   // }
  // }
}
</style>
