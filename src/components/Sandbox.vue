<template>
  <v-container fluid>
    <v-row class="text-center">
      <!--       <v-col cols="12">
        <h1>Sandbox</h1>
      </v-col>
      -->
    </v-row>
    <v-row green>
      <v-col :cols="12" :lg="3">
        <!-- <v-card color="primary" dark>
          <v-card-title>Leader Board</v-card-title>
          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sapiente doloribus, voluptatum tenetur alias culpa tempore dignissimos minus possimus neque tempora maiores quia. Suscipit veritatis ipsum, illo doloremque perferendis magnam?</v-card-text>
        </v-card>-->
        <Leaderboard />
      </v-col>

      <v-col cols="12" :lg="8">
        <Challenges />
      </v-col>

      <!--       <v-col :cols="12" :lg="2">
        <v-card color="primary" dark>
          <v-card-title>Links?</v-card-title>
          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sapiente doloribus, voluptatum tenetur alias culpa tempore dignissimos minus possimus neque tempora maiores quia. Suscipit veritatis ipsum, illo doloremque perferendis magnam?</v-card-text>
        </v-card>
      </v-col>
      -->
    </v-row>
  </v-container>
</template>

<script>
import Leaderboard from "@/components/subcomponents/Leaderboard";
import Challenges from "@/components/subcomponents/Challenges";

export default {
  components: { Leaderboard, Challenges },
  name: "Sandbox",

  data: () => ({})
};
</script>

<style>
</style>