<template>
  <v-card color="primary" dark>
    <v-card-title>Modify Challenge</v-card-title>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Challenge ID" filled v-model="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-btn color="warning" @click="fetchChallenge(id)">fetch challenge</v-btn>
      </v-col>
    </v-row>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Name" v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="Due Date" type="date" v-model="due_date"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Release Date" type="date" v-model="release_date"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea label="Prompt" v-model="prompt"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea label="Grading Code" v-model="grading_code"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-btn @click="submitChallenge" class="ma-2" color="warning">Submit Change</v-btn>
    <v-row v-if="feedback">
      <v-col cols="12">
        <v-card-text>
          <p class="text-uppercase font-weight-bold white--text">{{feedback}}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: null,
      prompt: null,
      due_date: null,
      grading_code: null,
      release_date: null,
      feedback: null,
      id: null
    };
  },
  methods: {
    submitChallenge() {
      firebase
        .firestore()
        .collection("Challenges")
        .doc(this.id)
        .set({
          name: this.name,
          prompt: this.prompt,
          due_date: this.due_date,
          grading_code: this.grading_code,
          release_date: this.release_date
        })
        .then(() => {
          this.feedback = "submitted";
          this.$router.push({ name: "Leaderboard" });
        });
    },
    fetchChallenge(id) {
      // alert(id);

      var docRef = firebase
        .firestore()
        .collection("Challenges")
        .doc(id);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            let challenge = doc.data();
            this.name = challenge.name;
            this.due_date = challenge.due_date;
            this.release_date = challenge.release_date;
            this.grading_code = challenge.grading_code;
            this.prompt = challenge.prompt;
            this.grading_code = challenge.grading_code;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  }
};
</script>

<style>
</style>