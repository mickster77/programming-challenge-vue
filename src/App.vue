<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/NR-Logo.jpeg"
          transition="scale-transition"
          width="40"
        />
        <span class="mr-2, headline">NR Programming Challenge</span>
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn color="warning" v-if="user" @click="logout">signOut</v-btn> -->
      <v-btn color="warning" class="mx-2">signOut</v-btn>

      <v-btn color="warning" href="https://en.wikipedia.org/wiki/Naval_Reactors" target="_blank">
        <span class="m-2">Some NR Link</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <!-- <HelloWorld /> -->
      <Sandbox />
    </v-content>
    <v-footer class="mr-2, headline" app color="primary" dark>Footer</v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Sandbox from "./components/Sandbox";

export default {
  name: "App",

  components: {
    // HelloWorld,
    Sandbox
  },

  data: () => ({
    //
  })
};
</script>
