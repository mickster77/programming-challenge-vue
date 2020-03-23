<template>
  <div>
    <v-card
      color="teal"
      class="mb-3"
      v-for="(challenge, index) in desendingChallenges"
      :key="index"
    >
      <v-card-title>{{challenge.name}}</v-card-title>
      <v-card-text>
        Challenge:
        {{challenge.prompt}}
      </v-card-text>
      <v-card-text>Release Date: {{challenge.release_date}}</v-card-text>
      <v-card-text>Due Date: {{challenge.due_date}}</v-card-text>
      <!-- <v-file-input show-size label="File input"></v-file-input> -->
      <SubmissionInput />
    </v-card>
  </div>
</template>

<script>
// import firebase from "firebase";
import db from "@/firebase/init";
import SubmissionInput from "@/components/subcomponents/SubmissionInput";

export default {
  components: { SubmissionInput },
  data() {
    return {
      Challenges: []
    };
  },
  created() {
    db.firestore()
      .collection("Challenges")
      .orderBy("release_date")
      .onSnapshot(snapshot => {
        this.Challenges = [];
        snapshot.forEach(doc => {
          let challenge = doc.data();
          let id = doc.id;
          challenge.id = id;
          this.Challenges.push(challenge);
        });
      });
  },
  computed: {
    //I use this compute property to display the challenges, since firebase return them in order of release date.  This way, the newest challenge is on top.
    desendingChallenges() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.Challenges.reverse();
    }
  }
};
</script>

<style>
</style>