<template>
  <div>
    <v-card color="primary" dark>
      <v-card-title>Leader Board</v-card-title>
      <v-card-text>{{leader}}</v-card-text>
      <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sapiente doloribus, voluptatum tenetur alias culpa tempore dignissimos minus possimus neque tempora maiores quia. Suscipit veritatis ipsum, illo doloremque perferendis magnam?</v-card-text>
    </v-card>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  data() {
    return {
      leader: "JoePost"
    };
  }
};
</script>

<style>
</style>