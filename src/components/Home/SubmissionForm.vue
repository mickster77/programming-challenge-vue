<template>
  <v-card dark>
    <v-card-title>{{prompt}}</v-card-title>
    <v-card-text>Release Date: {{release_date}}</v-card-text>
    <v-card-text>Due Date: {{due_date}}</v-card-text>
    <v-card-text>
      <v-textarea filled label="Paste code here" v-model="code"></v-textarea>
    </v-card-text>
    <!-- <v-file-input show-size label="File input"></v-file-input> -->
    <v-btn @click="submit(challengeID)" color="primary" class="ma-3">Submit Code</v-btn>
    <v-card-text class="red--text" v-show="error">You have an error: {{error}}</v-card-text>
    <!-- <v-card-actions>
      <v-btn color="orange" text>Share</v-btn>
      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["challengeID"],

  data() {
    return {
      Submissions: null,
      code: null,
      loading: false,
      error: null,
      challenge_ID: null,
      prompt: "null",
      release_date: null,
      due_date: null
    };
  },

  methods: {
    submit(id) {
      this.loading = true;
      let docName = id.concat(" - ", this.$store.getters.userDisplayName);
      //   alert(docName);
      firebase
        .firestore()
        .collection("Submissions")
        .doc(docName)
        .set({
          challenge_id: id,
          code: this.code,
          submit_date: Date.now(),
          uid: this.$store.getters.userID,
          userName: this.$store.getters.userDisplayName
        })
        .then(() => {
          this.loading = false;
          //   alert("submitted");
          this.code = null;
        })
        .catch(function(error) {
          this.loading = false;
          alert(error.message);
        });
    }
  },
  created() {
    this.challenge_ID = this.$props.challengeID;
    var challengeRef = firebase
      .firestore()
      .collection("Challenges")
      .doc(this.$props.challengeID);

    challengeRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // this.Submissions = doc.data();
          this.prompt = doc.data().prompt;
          this.due_date = doc.data().due_date;
          this.release_date = doc.data().release_date;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    let id = this.$props.challengeID;
    let docID = id.concat(" - ", this.$store.getters.userDisplayName);
    var submissionRef = firebase
      .firestore()
      .collection("Submissions")
      .doc(docID);

    firebase
      .firestore()
      .collection("Submissions")
      .onSnapshot(snapshot => {
        this.Submissions = [];
        snapshot.forEach(doc => {
          if (doc.id == docID) {
            this.error = doc.data().error;
            // let id = doc.id;
            // submission.id = id;
            // this.Submissions.push(submission);
          }
        });
      });

    submissionRef
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          this.error = doc.data().error;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>

<style>
</style>