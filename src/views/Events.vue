<template>
  <div>
    <v-container>
      <v-row>
        <v-col align="center">
          <v-btn-toggle color="success" v-model="eventType" tile group>
            <v-btn value="upcoming">Upcoming</v-btn>
            <v-btn value="ongoing">Ongoing</v-btn>
            <v-btn value="completed">Completed</v-btn>
            <v-btn value="all">All</v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
    <!-- upcoming -->
    <v-container v-if="eventType == 'upcoming'">
      <h1>Upcoming</h1>
      <v-card
        class="mb-3"
        v-for="(event, index) in upcomingEvents"
        :key="index"
      >
        <v-card-title>{{ event.name }}</v-card-title>
        <v-card-text>Date: {{ event.date }}</v-card-text>
        <v-card-text>{{ event.description }}</v-card-text>
        <v-card-actions
          ><v-btn color="secondary" @click="showInterest"
            >Show Interest!!</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>
    <!-- ongoing -->
    <v-container v-if="eventType == 'ongoing'">
      <h1>Ongoing</h1>
      <v-card class="mb-3" v-for="(event, index) in ongingEvents" :key="index">
        <v-card-title>{{ event.name }}</v-card-title>
        <v-card-text>Date: {{ event.date }}</v-card-text>
        <v-card-text>{{ event.description }}</v-card-text>
        <v-card-actions
          ><v-btn color="secondary" @click="showInterest"
            >Show Interest!!</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>
    <!-- completed -->
    <v-container v-if="eventType == 'completed'">
      <h1>Completed</h1>
      <v-card
        class="mb-3"
        v-for="(event, index) in completedEvents"
        :key="index"
      >
        <v-card-title>{{ event.name }}</v-card-title>
        <v-card-text>Date: {{ event.date }}</v-card-text>
        <v-card-text>{{ event.description }}</v-card-text>
        <v-card-actions
          ><v-btn color="secondary" @click="showInterest"
            >Show Interest!!</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>

    <!-- all -->
    <v-container v-if="eventType == 'all'">
      <h1>All</h1>

      <v-card class="mb-3" v-for="(event, index) in Events" :key="index">
        <v-card-title>{{ event.name }}</v-card-title>
        <v-card-text>Date: {{ event.date }}</v-card-text>
        <v-card-text>{{ event.description }}</v-card-text>
        <v-card-actions
          ><v-btn color="secondary" @click="showInterest"
            >Show Interest!!</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-container>

    <v-container> </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
// import NewEvent from "@/components/NewEvent";
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
      eventType: "upcoming",
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
          userName: this.$store.getters.userDisplayName,
        })
        .then(() => {
          this.loading = false;
          //   alert("submitted");
          this.code = null;
        })
        .catch(function (error) {
          this.loading = false;
          alert(error.message);
        });
    },
    showInterest() {
      alert("Sorry, still on my todo list...");
    },
  },
  computed: {
    // Upcoming Events:
    upcomingEvents() {
      let array = [];
      this.Events.forEach((element) => {
        if (element.state == "upcoming") {
          array.push(element);
        }
      });
      return array;
    },
    // Ongoing Events:
    ongoingEvents() {
      let array = [];
      this.Events.forEach((element) => {
        if (element.state == "ongoing") {
          array.push(element);
        }
      });
      return array;
    },
    // Completed Events:
    completedEvents() {
      let array = [];
      this.Events.forEach((element) => {
        if (element.state == "completed") {
          array.push(element);
        }
      });
      return array;
    },
  },
  created() {
    //get all events

    firebase
      .firestore()
      .collection("Events")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        this.Events = [];
        snapshot.forEach((doc) => {
          let event = doc.data();
          let id = doc.id;
          event.id = id;
          this.Events.push(event);
        });
      });
  },
};
</script>

<style>
</style>