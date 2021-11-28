<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Welcome to the Director's Cup</v-card-title>
          <v-card-text>Placeholder for Director Message</v-card-text>
          <v-card-actions>
            <v-btn @click="goTo('Events')">Events</v-btn>
            <v-btn @click="goTo('Scoreboard')">Scoreboard</v-btn>
            <v-btn @click="goTo('Rosters')">Rosters</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import db from "@/firebase/init";
// import firebase from "firebase";
// import NewEvent from "@/components/NewEvent";

// import Leaderboard from "@/components/Home/Leaderboard";
// import SubmissionForm from "@/components/Home/SubmissionForm";

export default {
  components: {
    // NewEvent,
    // Leaderboard,
    // SubmissionForm,
  },
  data() {
    return {
      Events: [],
      //   Submissions: [],
      loading: false,
      code: null,
    };
  },
  methods: {
    goToEventsPage() {
      this.$router.push({
        name: "Events",
      });
    },
    goTo(page) {
      if (page == "Events") {
        this.$router.push({
          name: "Events",
        });
      }
      if (page == "Rosters") {
        this.$router.push({
          name: "Rosters",
        });
      }
      if (page == "Scoreboard") {
        this.$router.push({
          name: "Scoreboard",
        });
      }
    },
  },
};
</script>

<style>
</style>