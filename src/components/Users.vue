<template>
  <div>
    <!-- <v-card>
          <v-card-title>Users</v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">UserName</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">House</th>
                  <th class="text-left">id</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in Users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.user_name }}</td>
                  <td>{{ user.email }}</td>

                  <td>{{ user.house }}</td>
                  <td>{{ user.id }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card> -->

    <v-card class="my-4">
      <v-data-table
        :headers="headers"
        :items="Users"
        item-key="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-row align="left">
            <v-col>
              <v-card-text class="headline">Users</v-card-text>
              <!-- <v-btn-toggle
                    tile
                    color="deep-purple accent-3"
                    group
                    v-model="houseFilter"
                  >
                    <v-btn> Questions With Attitude </v-btn>
                    <v-btn>Code 390 </v-btn>
                    <v-btn> The People's Team</v-btn>
                    <v-btn> The Unique Concepts</v-btn>
                  </v-btn-toggle> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
              ></v-text-field>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      Users: [],
      search: "",
      houseFilter: null,
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "House", value: "house" },
        { text: "ID", value: "id" },
      ],
    };
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
</style>