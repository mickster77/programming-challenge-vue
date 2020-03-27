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
                <v-card dark>
                  <v-card-title>{{challenge.prompt}}</v-card-title>
                  <v-card-text>ID: {{challenge.id}}</v-card-text>
                  <v-card-text>Release Date: {{challenge.release_date}}</v-card-text>
                  <v-card-text>Due Date: {{challenge.due_date}}</v-card-text>
                  <v-card-text>
                    <v-textarea filled label="Paste code here" v-model="code"></v-textarea>
                  </v-card-text>
                  <v-btn
                    @click="submit(challenge.id)"
                    v-show="!loading"
                    color="primary"
                    class="ma-3"
                  >Submit</v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <NewLeaderboard :challengeID="challenge.id"></NewLeaderboard>
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
import NewLeaderboard from "@/components/subcomponents/NewLeaderboard";

export default {
  components: {
    NewLeaderboard
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

    //   firebase
    //     .firestore()
    //     .collection("Submissions")
    //     .onSnapshot(snapshot => {
    //       this.Submissions = [];
    //       snapshot.forEach(doc => {
    //         let submission = doc.data();
    //         let id = doc.id;
    //         submission.id = id;
    //         this.Submissions.push(submission);
    //       });
    //     });
  }
};
</script>

<style>
</style>