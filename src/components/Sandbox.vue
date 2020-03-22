<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Sandbox</h1>
      </v-col>
    </v-row>
    <v-row green>
      <v-col cols="2">
        <v-card color="primary" dark>
          <v-card-title>Links?</v-card-title>
          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sapiente doloribus, voluptatum tenetur alias culpa tempore dignissimos minus possimus neque tempora maiores quia. Suscipit veritatis ipsum, illo doloremque perferendis magnam?</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card color="teal" class="md-2">
          <v-card-title>Challenge 1</v-card-title>
          <v-card-text>
            <p>Build a connect 4 app</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dignissimos dolores ullam quasi. Adipisci, ipsam alias officia dolor perferendis saepe dolore explicabo fugit expedita magnam corrupti praesentium, sint eligendi laboriosam.</p>
          </v-card-text>
          <v-file-input show-size label="File input"></v-file-input>
        </v-card>
        <v-card color="teal" class="my-2">
          <v-card-title>Challenge 2</v-card-title>
          <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dignissimos dolores ullam quasi. Adipisci, ipsam alias officia dolor perferendis saepe dolore explicabo fugit expedita magnam corrupti praesentium, sint eligendi laboriosam.</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="primary" dark>
          <v-card-title>Leader Board</v-card-title>
          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sapiente doloribus, voluptatum tenetur alias culpa tempore dignissimos minus possimus neque tempora maiores quia. Suscipit veritatis ipsum, illo doloremque perferendis magnam?</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({})
};
</script>

<style>
</style>