<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card color="primary" class="mb-3" v-for="(challenge, index) in Challenges" :key="index">
          <v-card-title>{{challenge.name}}</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col cols="9">
                <v-card dark>
                  <v-card-title>{{challenge.prompt}}</v-card-title>
                  <v-card-text>ID: {{challenge.id}}</v-card-text>
                  <v-card-text>Release Date: {{challenge.release_date}}</v-card-text>
                  <v-card-text>Due Date: {{challenge.due_date}}</v-card-text>
                  <v-card-text>
                    <v-textarea filled label="Paste code here:" v-model="code"></v-textarea>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <NewLeaderboard :challengeID="challenge.id"></NewLeaderboard>

                <!-- <TodoComponent :name="todoList.title" v-on:send="updateTime" /> -->
              </v-col>
            </v-row>
          </v-container>

          <!-- <v-btn @click="submit(challenge.id)" v-show="!loading">Submit</v-btn> -->
          <!-- <v-card-text>Username: {{submission.userName}}</v-card-text> -->
          <!-- <v-card-text>UID: {{submission.uid}}</v-card-text> -->
          <!-- <v-card-text>Score: {{submission.score}}</v-card-text> -->
          <!-- <v-card-text>Error: {{submission.error}}</v-card-text> -->

          <!-- <v-card-text>Submit Date: {{submission.submit_date}}</v-card-text> -->
          <!-- <v-btn @click="deleteSubmission(submission.id)" v-show="!loading">Delete</v-btn> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import db from "@/firebase/init";
import firebase from "firebase";
import NewLeaderboard from "@/components/subcomponents/NewLeaderboard";

export default {
  components: {
    NewLeaderboard
  },
  data() {
    return {
      Challenges: [],
      Submissions: [],
      loading: false,
      code: null
    };
  },
  methods: {
    // deleteSubmission(id) {
    //   this.loading = true;
    //   firebase
    //     .firestore()
    //     .collection("Submissions") // Gets the smoothie collection
    //     .doc(id) // Gets the doc of a specific id
    //     .delete() // This deletes it from the database
    //     .then(() => {
    //       alert("deleted");
    //       this.loading = false;
    //     });
    // }
  },
  created() {
    firebase
      .firestore()
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

    firebase
      .firestore()
      .collection("Submissions")
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