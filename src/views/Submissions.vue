<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card
          color="primary"
          class="mb-3"
          v-for="(submission, index) in Submissions"
          :key="index"
          dark
        >
          <v-card-title>Submission ID: {{submission.id}}</v-card-title>
          <v-card-text>Challenge ID: {{submission.challenge_id}}</v-card-text>

          <v-card-text>Username: {{submission.userName}}</v-card-text>
          <v-card-text>UID: {{submission.uid}}</v-card-text>
          <v-card-text>Score: {{submission.score}}</v-card-text>
          <v-card-text>Error: {{submission.error}}</v-card-text>
          <v-card-text>
            Submitted Answer:
            {{submission.code}}
          </v-card-text>
          <v-card-text>Submit Date: {{submission.submit_date}}</v-card-text>
          <v-btn @click="deleteSubmission(submission.id)" v-show="!loading">Delete</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import db from "@/firebase/init";
import firebase from "firebase";

export default {
  data() {
    return {
      Submissions: [],
      loading: false
    };
  },
  methods: {
    deleteSubmission(id) {
      this.loading = true;
      firebase
        .firestore()
        .collection("Submissions") // Gets the smoothie collection
        .doc(id) // Gets the doc of a specific id
        .delete() // This deletes it from the database
        .then(() => {
          alert("deleted");
          this.loading = false;
        });
    }
  },
  created() {
    firebase
      .firestore()
      .collection("Submissions")
      .orderBy("submit_date")
      .onSnapshot(snapshot => {
        this.Submissions = [];
        snapshot.forEach(doc => {
          let submission = doc.data();
          let id = doc.id;
          submission.id = id;
          this.Submissions.push(submission);
        });
      });
  }
};
</script>

<style>
</style>