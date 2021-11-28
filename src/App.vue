<template>
  <v-app>
    <NavBar />
    <v-content>
      <!-- <HelloWorld /> -->
      <!-- <Sandbox /> -->
      <router-view></router-view>
    </v-content>
    <v-footer class="mu-2" app color="primary" dark>
      <span>Version 0.1, built and maintained by the C.A.R.E. team</span>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="changeTheme()" color="secondary">Change Theme</v-btn> -->
    </v-footer>
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
    NavBar,
    // HelloWorld,
    // Sandbox
  },
  methods: {
    changeTheme() {
      if (this.$vuetify.theme.dark == true) {
        this.$vuetify.theme.dark = false;
      } else this.$vuetify.theme.dark = true;
    },
  },
};
</script>
