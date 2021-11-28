<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-img
        @click="goHome()"
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/08K-logo.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title>The Director's Cup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2 hidden-md-and-down"
        color="secondary"
        v-if="true"
        @click="goTo('admin')"
        >Admin</v-btn
      >
      <v-btn
        class="mx-2 hidden-md-and-down"
        color="secondary"
        v-if="user"
        @click="logout"
        >signOut</v-btn
      >

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="secondary" v-on="on" class="hidden-lg-and-up">
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
      user: null,
      //   imgURL: "https://randomuser.me/api/portraits/lego/1.jpg",
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
    goTo(page) {
      if (page == "admin") {
        this.$router.push({
          name: "Admin",
        });
      }
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login",
          });
        });
    },

    getUID() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid;
      } else {
        return null;
      }
    },
  },
  computed: {
    // isAdmin() {
    //   if (this.user.displayName == "mickster") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
  created() {
    this.user = firebase.auth().currentUser;
    // this fires everytime there is a change in user status
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
.myFont {
  font-size: 1.4em;
}
</style>
