<template>
  <v-app>
    <NavBar />
    <v-content>
      <!-- <HelloWorld /> -->
      <!-- <Sandbox /> -->
      <router-view></router-view>
    </v-content>
    <v-footer class="mr-2, headline" app color="primary" dark>Footer</v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import Sandbox from "./components/Sandbox";
import NavBar from "./components/NavBar";

// import firebase from "firebase";

export default {
  name: "App",

  components: {
    NavBar
    // HelloWorld,
    // Sandbox
  }
};
</script>
