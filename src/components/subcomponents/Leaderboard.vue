<template>
  <div>
    <v-card color="primary" dark>
      <v-card-title>Leaderboard</v-card-title>
      <v-list
        color="primary" dark>
          <v-list-item
            v-for="(leader, index) in leaders"
            :key="index">
            <v-list-item-content>
              <v-list-item-title v-html="(index+1) + '. ' + leader.name"></v-list-item-title>
              <v-list-item-subtitle v-html="'Score: ' + leader.score"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    submitters: {},
  }),
  computed:{
    leaders: function() {
      return Object.entries(this.submitters)  // Convert the submitters object into an array
        .map(([, {name,score}]) => ({name, score}))  // Convert the array elements to be dictionaries
        .sort(({score:score1},{score:score2}) => score1<score2);  // Sort the submitters by score
    },
  },
  mounted() {

    // Get the most recent Challenge
    firebase.firestore().collection('Challenges').orderBy('release_date', 'desc').limit(1).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const challenge_id = querySnapshot.docs[0].id;
        // Create an active listener to the Submissions collection for this challenge
        firebase.firestore().collection('Submissions').where('challenge_id','==',challenge_id).onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              // Disregard submissions which have not been graded
              if ('score' in change.doc.data()) {
                if (change.type === "added") {
                  // Submission for this challenge was added
                  const submission = {id:change.doc.id, ...change.doc.data()}
                  if (submission.uid in this.submitters) {
                    // This user has multiple submissions for this challenge.  Pick the highest scored.
                    if (submission.score > this.submitters[submission.uid].score) {
                      this.submitters = {...this.submitters, [submission.uid] : {...this.submitters[submission.uid], score:submission.score}};
                    }
                  } else {
                    // This user has no submission recorded.  Look up his/her name and save the submission.
                    firebase.firestore().collection('Users').doc(submission.uid).get().then((doc) => {
                      this.submitters = {...this.submitters, [submission.uid] : {name:doc.data().name, score:submission.score}};
                    });
                  }
                } else if (change.type === "modified") {
                  // Submission for this challenge was modified
                  // This should only happen when a submission is scored
                  const submission = {id:change.doc.id, ...change.doc.data()}
                  if (submission.uid in this.submitters) {
                    // This user has multiple submissions for this challenge.  Pick the highest scored.
                    if (submission.score > this.submitters[submission.uid].score) {
                      this.submitters = {...this.submitters, [submission.uid] : {...this.submitters[submission.uid], score:submission.score}};
                    }
                  }
                } else if (change.type === "removed") {
                  // Submission for this challenge was removed
                  // This should not happen...
                }
              }
            });
          },
          function() {}
        );

      }
    });
  },
  beforeDestroy() {

  }
};
</script>

<style>
</style>