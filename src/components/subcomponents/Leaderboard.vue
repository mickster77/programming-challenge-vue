<template>
  <div>
    <v-card color="primary" dark>
      <v-card-title>Leaderboard</v-card-title>
      <v-list
        :disabled="disabled"
        :two-line="twoLine"
        color="primary" dark>
          <v-list-item
            v-for="(item, i) in items"
            :key="i">
            <v-list-item-content>
              <v-list-item-title v-html="(i+1) + '. ' + item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="'Score: ' + item.score"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  data: () => ({
    items: [
      {
        name : "Joe Post",
        score : 10
      },
      {
        name : "Mike Black",
        score : 9
      },
      {
        name : "Sean Fitzgerald",
        score : 8
      }

    ],
  })
};
</script>

<style>
</style>