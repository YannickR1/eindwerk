<template>
  <div class="error__container">
    <h1 v-if="error.statusCode === 404" class="error__text">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="96"
      height="96"
      viewBox="0 0 172 172"
      style="fill: #ffffff"
    >
      <defs>
        <linearGradient
          id="color-1_64786_gr1"
          x1="125.59225"
          y1="64.5"
          x2="125.59225"
          y2="107.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#383838"></stop>
          <stop offset="1" stop-color="#383838"></stop>
        </linearGradient>
        <linearGradient
          id="color-2_64786_gr2"
          x1="46.40775"
          y1="64.5"
          x2="46.40775"
          y2="107.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#383838"></stop>
          <stop offset="1" stop-color="#383838"></stop>
        </linearGradient>
        <linearGradient
          id="color-3_64786_gr3"
          x1="86"
          y1="64.5"
          x2="86"
          y2="107.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#383838"></stop>
          <stop offset="1" stop-color="#383838"></stop>
        </linearGradient>
        <linearGradient
          id="color-4_64786_gr4"
          x1="86"
          y1="14.10938"
          x2="86"
          y2="159.05431"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000000"></stop>
          <stop offset="1" stop-color="#000000"></stop>
        </linearGradient>
        <linearGradient
          id="color-5_64786_gr5"
          x1="86"
          y1="14.10938"
          x2="86"
          y2="159.05431"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000000"></stop>
          <stop offset="1" stop-color="#000000"></stop>
        </linearGradient>
        <linearGradient
          id="color-6_64786_gr6"
          x1="86"
          y1="34.9375"
          x2="86"
          y2="45.6875"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#383838"></stop>
          <stop offset="1" stop-color="#383838"></stop>
        </linearGradient>
        <linearGradient
          id="color-7_64786_gr7"
          x1="86"
          y1="14.10938"
          x2="86"
          y2="159.05431"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000000"></stop>
          <stop offset="1" stop-color="#000000"></stop>
        </linearGradient>
        <linearGradient
          id="color-8_64786_gr8"
          x1="38.96875"
          y1="21.33338"
          x2="38.96875"
          y2="159.03013"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000000"></stop>
          <stop offset="1" stop-color="#000000"></stop>
        </linearGradient>
        <linearGradient
          id="color-9_64786_gr9"
          x1="133.03125"
          y1="21.33338"
          x2="133.03125"
          y2="159.03013"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000000"></stop>
          <stop offset="1" stop-color="#000000"></stop>
        </linearGradient>
      </defs>
      <g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g>
          <path
            d="M150.5,64.5h-6.81281l-43,43h19.00062l30.81219,-30.81219z"
            fill="url(#color-1_64786_gr1)"
          ></path>
          <path
            d="M52.31219,64.5l-30.81219,30.81219v12.18781h6.81281l43,-43z"
            fill="url(#color-2_64786_gr2)"
          ></path>
          <path
            d="M74.00031,107.5l43,-43h-19.00062l-43,43z"
            fill="url(#color-3_64786_gr3)"
          ></path>
          <path
            d="M147.8125,110.1875h-123.625c-2.96431,0 -5.375,-2.53431 -5.375,-5.65181v-37.07137c0,-3.1175 2.41069,-5.65181 5.375,-5.65181h123.625c2.96431,0 5.375,2.53431 5.375,5.65181v37.07138c0,3.1175 -2.41069,5.65181 -5.375,5.65181zM24.26544,67.1875c-0.02956,0.043 -0.07794,0.13438 -0.07794,0.27681v37.07138c0,0.18813 0.08062,0.28756 0.10213,0.30369l123.50406,-0.02688c-0.04569,-0.00806 0.01881,-0.1075 0.01881,-0.27681v-37.07137c0,-0.18812 -0.08062,-0.28756 -0.10213,-0.30369z"
            fill="url(#color-4_64786_gr4)"
          ></path>
          <path
            d="M86,67.1875c-14.81887,0 -26.875,-12.05613 -26.875,-26.875c0,-14.81887 12.05613,-26.875 26.875,-26.875c14.81887,0 26.875,12.05613 26.875,26.875c0,14.81887 -12.05612,26.875 -26.875,26.875zM86,18.8125c-11.85456,0 -21.5,9.64544 -21.5,21.5c0,11.85456 9.64544,21.5 21.5,21.5c11.85456,0 21.5,-9.64544 21.5,-21.5c0,-11.85456 -9.64544,-21.5 -21.5,-21.5z"
            fill="url(#color-5_64786_gr5)"
          ></path>
          <path
            d="M72.5625,34.9375h26.875v10.75h-26.875z"
            fill="url(#color-6_64786_gr6)"
          ></path>
          <path
            d="M45.6875,129h80.625v5.375h-80.625z"
            fill="url(#color-7_64786_gr7)"
          ></path>
          <path
            d="M43,107.5l0.00269,45.6875h-8.06519v-45.6875h-5.375v45.6875c0,2.96431 2.41069,5.375 5.375,5.375h8.0625c2.96431,0 5.375,-2.41069 5.375,-5.375v-45.6875z"
            fill="url(#color-8_64786_gr8)"
          ></path>
          <path
            d="M137.0625,107.5l0.00269,45.6875h-8.06519v-45.6875h-5.375v45.6875c0,2.96431 2.41069,5.375 5.375,5.375h8.0625c2.96431,0 5.375,-2.41069 5.375,-5.375v-45.6875z"
            fill="url(#color-9_64786_gr9)"
          ></path>
        </g>
      </g>
    </svg>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error', // you can set a custom layout for the error page
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.error__container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-size: $font-size-6;
  }

  &__text {
    justify-content: center;
    align-items: center;
  }
}
</style>
