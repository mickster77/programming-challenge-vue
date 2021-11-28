<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <Users />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <NewEvent></NewEvent>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import Users from "@/components/Users";
import NewEvent from "@/components/NewEvent";

export default {
  components: { Users, NewEvent },
  data() {
    return {
      due_date: null,
      grading_code: null,
      name: null,
      prompt: null,
      release_date: null,
      feedback: null,
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
          release_date: this.release_date,
        })
        .then(() => {
          this.feedback = "submitted";
          this.$router.push({ name: "Home" });
        });
    },
  },
};
</script>

<style>
</style>