<template>
  <main class="p-blog-create">
    <MakeABlogContent />
  </main>
</template>

<script>
export default {
  name: 'BlogCreatePage',
  layout: 'create',
  middleware: 'auth',
}
</script>

<style lang="scss"></style>
