<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="my-3" color="code390">
          <v-card-title>Code 390</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">UserName</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in codeHouse" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.user_name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
        <v-card color="peoples" class="my-3">
          <v-card-title>The People's Team</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">UserName</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in peopleHouse" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.user_name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
        <v-card color="concepts" class="my-3">
          <v-card-title>The Unique Concepts</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">UserName</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in uniqueHouse" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.user_name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
        <v-card color="questions" class="my-3">
          <v-card-title>Questions With Attitude</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">UserName</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in questionsHouse" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.user_name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
// import Users from "@/components/Users";

export default {
  // components: { Users },

  data() {
    return {
      Users: [],
    };
  },
  computed: {
    // this array returns all users in The Unique Concept House
    uniqueHouse() {
      let array = [];
      this.Users.forEach((element) => {
        if (element.house == "The Unique Concepts") {
          array.push(element);
        }
      });
      return array;
    },
    // this array returns all users in The People's Team House
    peopleHouse() {
      let array = [];
      this.Users.forEach((element) => {
        if (element.house == "The People's Team") {
          array.push(element);
        }
      });
      return array;
    },
    // this array returns all users in Quetsions with Attitude House
    questionsHouse() {
      let array = [];
      this.Users.forEach((element) => {
        if (element.house == "Questions With Attitude") {
          array.push(element);
        }
      });
      return array;
    },
    // this array returns all users in Code 390 House
    codeHouse() {
      let array = [];
      this.Users.forEach((element) => {
        if (element.house == "Code 390") {
          array.push(element);
        }
      });
      return array;
    },
  },
  created() {
    firebase
      .firestore()
      .collection("Users")
      .onSnapshot((snapshot) => {
        this.Users = [];
        snapshot.forEach((doc) => {
          let user = doc.data();
          let id = doc.id;
          user.id = id;
          this.Users.push(user);
        });
      });
  },
};
</script>

<style>
th {
  background-color: lightgray;
}
</style>