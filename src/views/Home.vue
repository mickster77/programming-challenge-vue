<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          color="primary"
          dark
          class="mb-3"
          v-for="(challenge, index) in Challenges"
          :key="index"
        >
          <v-card-title>{{challenge.name}}</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="9">
                <SubmissionForm :challengeID="challenge.id" />

                <!-- <v-card dark>
                  <v-card-title>{{challenge.prompt}}</v-card-title>
                  <v-card-text>ID: {{challenge.id}}</v-card-text>
                  <v-card-text>Release Date: {{challenge.release_date}}</v-card-text>
                  <v-card-text>Due Date: {{challenge.due_date}}</v-card-text>
                  <v-card-text>
                    <v-textarea filled label="Paste code here" v-model="code"></v-textarea>
                  </v-card-text>

                <v-file-input show-size label="File input"></v-file-input>

                <v-btn
                    @click="submit(challenge.id)"
                    v-show="!loading"
                    color="primary"
                    class="ma-3"
                  >Submit</v-btn>
                </v-card>-->
              </v-col>
              <v-col cols="12" md="3">
                <Leaderboard :challengeID="challenge.id"></Leaderboard>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import db from "@/firebase/init";
import firebase from "firebase";
import Leaderboard from "@/components/Home/Leaderboard";
import SubmissionForm from "@/components/Home/SubmissionForm";

export default {
  components: {
    Leaderboard,
    SubmissionForm
  },
  data() {
    return {
      Challenges: [],
      //   Submissions: [],
      loading: false,
      code: null
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
  }
};
</script>

<style>
</style>