<template>
  <div>
    <AppNavbar />
    <nuxt />
    <AppFooter />
  </div>
</template>

<script>
export default {
  components: {
    AppNavbar: () => import('@/components/Navbar'),
    AppFooter: () => import('@/components/Footer')
  }
}
</script>
