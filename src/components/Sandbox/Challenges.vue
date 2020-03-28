<template>
  <div>
    <v-card
      color="primary"
      class="mb-3"
      v-for="(challenge, index) in desendingChallenges"
      :key="index"
      dark
    >
      <v-card-title>{{challenge.name}}</v-card-title>
      <v-card-text>
        Challenge:
        {{challenge.prompt}}
      </v-card-text>
      <v-card-text>Release Date: {{challenge.release_date}}</v-card-text>
      <v-card-text>Due Date: {{challenge.due_date}}</v-card-text>
      <v-card-text>
        <v-textarea filled label="Paste code here:" v-model="code"></v-textarea>
      </v-card-text>
      <v-btn @click="submit(challenge.id)" v-show="!loading">Submit</v-btn>
    </v-card>
  </div>
</template>

<script>
// import firebase from "firebase";
import db from "@/firebase/init";

export default {
  data() {
    return {
      Challenges: [],
      code: null,
      loading: false
    };
  },
  created() {
    db.firestore()
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
  },
  computed: {
    //I use this compute property to display the challenges, since firebase return them in order of release date.  This way, the newest challenge is on top.
    desendingChallenges() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.Challenges.reverse();
    }
  },
  methods: {
    submit(id) {
      this.loading = true;
      // let user = this.$store.state.user.email;
      // let user = this.$store.getters.displayName;
      // alert(user);
      let docName = id.concat(" - ", this.$store.getters.userDisplayName);
      alert(docName);
      db.firestore()
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
          alert("submitted");
          this.code = null;
        })
        .catch(function(error) {
          this.loading = false;
          alert(error.message);
        });
    }
  }
};
</script>

<style>
</style>