<template>
  <main>
    <section class="hero">
      <div class="hero__container">
        <h2 class="hero__tagline">
          <span class="hero__slogan">Without</span>
          <span class="hero__slogan">byway,</span>
          <span class="hero__slogan">you're</span>
          <span class="hero__slogan">nowhere </span>
        </h2>
        <img
          src="~/assets/index-img.png"
          alt="travelling man"
          class="hero__image"
        />
      </div>
    </section>

    <section class="blogs-container">
      <div class="blogs-container__recentblogs">
        <RecentBlogs />
      </div>
      <div class="blogs-container__topblogs">
        <TopBlogs />
      </div>
      <div class="blogs-container__topbloggers">
        <TopBloggers />
      </div>
    </section>
    <section class="call-to-action">
      <div class="call-to-action__container-left">
        <h2>Meet our customer service workers</h2>
        <div class="container__input-section">
          <h3>Your email address</h3>
          <input class="mail" type="email" name="email" required />
          <h3>Your message</h3>
          <textarea name="contact-client" cols="30" rows="5"></textarea>
          <div class="button-container">
            <div class="empty-div"></div>
            <button type="submit" class="submit">Submit</button>
          </div>
        </div>
      </div>
      <img
        src="~/assets/bywayCustomerService.png"
        class="call-to-action__illustration"
        alt="customer service worker"
      />
    </section>
  </main>
</template>

<script>
import RecentBlogs from '~/components/RecentBlogs'
import TopBlogs from '~/components/TopBlogs'
import TopBloggers from '~/components/TopBloggers'

export default {
  name: 'IndexPage',
  components: {
    RecentBlogs,
    TopBlogs,
    TopBloggers,
  },
}
</script>
<style lang="scss">
.hero {
  background-color: $dark-blue;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    display: $display-flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    object-fit: contain;
    width: 50%;
    height: 650px;
  }

  &__tagline {
    display: block;
    font-size: 8em;
    font-weight: bold;
    line-height: 0.9em;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: 'Staatliches';
    text-shadow: 2px 2px 4px #000000;
  }

  // &__vertical-line {
  //   border-left: 1px solid white;
  //   height: 150px;
  // }

  // &__text {
  //   font-family: 'Manrope';
  //   font-weight: 800;
  //   font-size: 35px;
  // }

  // &__text span {
  //   display: block;
  //   font-size: $font-size-8;
  // }
}

.blogs-container {
  text-align: center;
  display: grid;
  justify-content: space-between;
  grid-template:
    'recent bloggers'
    'topblog topblog';

  &__recent-blogs {
    grid-area: recent;
  }
  &__topblogs {
    grid-area: topblog;
  }
  &__topbloggers {
    grid-area: bloggers;
  }
}

.img {
  width: 80px;
}

.call-to-action {
  background-color: whitesmoke;
  color: rgb(20, 48, 51);
  font-family: 'Manrope';
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2em 3em;

  &__container {
    display: flex;
    flex-direction: row;
  }
  &__illustration {
    object-fit: contain;
    width: 20em;
    margin: 55px 0px;
  }
  & form {
    display: flex;
    flex-direction: column;
    margin: 0 3em;
  }
  & input {
    border-color: rgb(40, 69, 72);
    border-width: 0.2em;
    width: 75%;
    border-radius: 5px;
    color: white;
    font-family: 'Manrope';
  }
  & textarea {
    border-color: rgb(40, 69, 72);
    border-width: 0.2em;
    width: 75%;
    border-radius: 5px;
    color: white;
    font-family: 'Manrope';
  }
  &__container-form h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  & .submit {
    background: rgb(40, 69, 72);
    border-radius: 5px;
    border: 1px solid white;
    font-family: 'Manrope';
    font-weight: 900;
    color: white;
  }
}

// .waves {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: var(--color);
//   box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
//   transition: 500ms;
// }

// .waves::before,
// .waves::after {
//   content: '';
//   position: absolute;
//   width: 295vw;
//   height: 295vw;
//   top: -125vw;
//   left: 50%;
//   transform: translate(-50%, -75%);
// }

// .waves::before {
//   border-radius: 44%;
//   background: rgb(104, 88, 197);
//   animation: waves 8s linear infinite;
// }

// .waves::after {
//   border-radius: 44%;
//   background: rgba(154, 131, 235, 0.425);
//   animation: waves 15s linear infinite;
// }

// @keyframes waves {
//   0% {
//     transform: translate(-50%, -75%) rotate(0deg);
//   }

//   100% {
//     transform: translate(-50%, -75%) rotate(360deg);
//   }
// }

// from {
//   opacity: 0;
// }
// to {
//   opacity: 1;
// }

/* MEDIA QUERIES */
// @media screen and (min-width: 500px) {
//   .hero {
//     &__image {
//       width: 60%;
//     }
//   }
// }

@media screen and (max-width: $mq-m-l) {
  .hero {
    &_image {
      display: flex;
      justify-content: center;
      // width: 120%;
      height: 80%;
    }
    &__tagline {
      display: none;
    }
  }
}

@media screen and (max-width: $mq-xl) {
  .hero__tagline {
    font-size: $font-size-10;
  }
}

@media screen and (min-width: $mq-xxl-l) {
  .hero__tagline {
    font-size: $font-size-13;
  }
}

@media screen and (max-width: $mq-l) {
  .blogs-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

@media screen and (min-width: 500px) and (max-width: 900px) {
  .call-to-action {
    &__illustration {
      object-fit: contain;
      width: 40%;
      margin: 0;
    }
  }
}

// @media screen and (max-width: $mq-xl) {
// .hero__tagline{
//   font-size: $font-size-8;
// }
// }
</style>
