<template>
  <v-card dark>
    <v-card-title>Leaderboard</v-card-title>
    <!-- <v-card-text>prop: {{challengeID}}</v-card-text> -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="submission in Submissions" :key="submission.uid"></tr> -->
          <tr v-for="submission in sortedArray" :key="submission.uid">
            <td>{{ submission.userName }}</td>
            <td>{{ submission.score }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["challengeID"],
  data() {
    return {
      Submissions: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("Submissions")
      .onSnapshot(snapshot => {
        this.Submissions = [];
        snapshot.forEach(doc => {
          if (doc.data().challenge_id == this.$props.challengeID) {
            let submission = doc.data();
            let id = doc.id;
            submission.id = id;
            this.Submissions.push(submission);
          }
        });
      });
  },
  computed: {
    sortedArray() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.Submissions.sort((a, b) => {
        return b.score - a.score;
      });
    }
  }
};
</script>

<style>
</style>