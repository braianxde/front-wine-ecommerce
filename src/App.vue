<template >
  <div>
  <div id="app" style="min-height: 100vh;">
    <div>
      <Navbar/>
      <router-view/>
    </div>
  </div>
  <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.9)), url("assets/pbsepia.jpg");
}
</style>
