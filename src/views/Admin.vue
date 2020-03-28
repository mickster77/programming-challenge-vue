<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <NewChallenge />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ModChallenge />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card color="primary" dark>
            <v-card-title>Other Admin Stuff</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import NewChallenge from "@/components/Admin/NewChallenge";
import ModChallenge from "@/components/Admin/ModChallenge";

export default {
  components: { NewChallenge, ModChallenge },
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
          this.$router.push({ name: "Home" });
        });
    }
  }
};
</script>

<style>
</style>