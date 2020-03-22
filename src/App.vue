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
        <v-toolbar-title>NR Programming Challenge</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn color="warning" v-if="user" @click="logout">signOut</v-btn> -->
      <v-btn color="warning" class="mx-2 hidden-md-and-down">signOut</v-btn>
      <!-- <v-btn color="warning" href="https://en.wikipedia.org/wiki/Naval_Reactors" target="_blank">
        <span class="m-2">Some NR Link</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="yellow" v-on="on" class="hidden-lg-and-up">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Signout</v-list-item-title>
            <!-- <v-list-item-action>Test</v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-menu>
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
