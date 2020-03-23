<template>
  <div>
    <v-card color="teal" class="ma-2" v-for="(challenge, index) in Challenges" :key="index">
      <v-card-title>{{challenge.name}}</v-card-title>
      <v-card-text>
        <p>{{challenge.prompt}}</p>
      </v-card-text>
      <v-file-input show-size label="File input"></v-file-input>
    </v-card>
  </div>
</template>

<script>
// import firebase from "firebase";
import db from "@/firebase/init";

export default {
  data() {
    return {
      Challenges: []
    };
  },
  created() {
    db.firestore()
      .collection("Challenges")
      .onSnapshot(snapshot => {
        this.Challenges = [];

        snapshot.forEach(doc => {
          let challenge = doc.data();
          let id = doc.id;
          challenge.id = id;
          this.Challenges.push(challenge);
        });
      });
  }
};
</script>

<style>
</style>