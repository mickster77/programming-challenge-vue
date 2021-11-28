<template>
  <v-card>
    <v-card-title>New Event Submission</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Name" v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Due Date"
            type="date"
            v-model="date"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea label="Description" v-model="description"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>

    <v-btn @click="submit" class="ma-2" color="warning">Submit</v-btn>
    <v-row v-if="feedback">
      <v-col cols="12">
        <p class="text-uppercase font-weight-bold">
          {{ feedback }}
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import db from "@/firebase/init";

export default {
  data() {
    return {
      name: null,
      date: null,
      description: null,
      feedback: null,
      state: null,
    };
  },
  methods: {
    submit() {
      db.firestore()
        .collection("Events")
        .add({
          name: this.name,
          date: this.date,
          description: this.description,
          state: "upcoming",
        })
        .then(() => {
          this.feedback = "submitted";
          this.clearFields();

          // this.$router.push({ name: "Home" });
        });
    },
    clearFields() {
      this.date = null;
      this.name = null;
      this.description = null;
    },
  },
};
</script>

<style>
</style>