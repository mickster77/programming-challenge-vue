<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/08K-logo.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title>NR Programming Challenge</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="warning mx-2 hidden-md-and-down" v-if="user" @click="logout">signOut</v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="yellow" v-on="on" class="hidden-lg-and-up">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
// import db from "@/firebase/init";

export default {
  components: {},
  data() {
    return {
      user: null
      //   imgURL: "https://randomuser.me/api/portraits/lego/1.jpg",
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
    },

    getUID() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid;
      } else {
        return null;
      }
    }
  },
  computed: {},
  created() {
    this.user = firebase.auth().currentUser;
    // this fires everytime there is a change in user status
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
.myFont {
  font-size: 1.4em;
}
</style>
