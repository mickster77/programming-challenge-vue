<template>
  <v-card color="primary" dark>
    <v-card-title>New Challenge Submission</v-card-title>
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

    <v-btn @click="submitChallenge" class="ma-2" color="warning">Submit</v-btn>
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
import db from "@/firebase/init";

export default {
  data() {
    return {
      due_date: null,
      grading_code: null,
      name: null,
      prompt: null,
      release_date: null,
      feedback: null
    };
  },
  methods: {
    submitChallenge() {
      db.firestore()
        .collection("Challenges")
        .add({
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
    }
  }
};
</script>

<style>
</style>