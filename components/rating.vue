<template>
  <div>
    <AwesomeVueStarRating
      :star="star"
      :starsize="starsize"
      :hasdescription="hasDescription"
    />
  </div>
</template>

<script>
import AwesomeVueStarRating from 'awesome-vue-star-rating'

export default {
  name: 'RatingComponent',
  components: {
    AwesomeVueStarRating,
  },
  data() {
    return {
      starsize: 'xs',
      star: 5,
      hasDescription: false,
    }
  },
}
</script>

<style lang="scss">
.star {
  color: black;
}
.star.active {
  color: black;
}
.list,
.list.disabled {
  &:hover {
    .star {
      color: black !important;
    }
  }
}
// span {
//   font-size: 18px;
// }
</style>
