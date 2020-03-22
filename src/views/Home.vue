<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Sandbox />
  </div>
</template>

<script>
// @ is an alias to /src
import Sandbox from "@/components/Sandbox.vue";

export default {
  name: "Home",
  components: {
    Sandbox
  }
};
</script>
