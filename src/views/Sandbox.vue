<template>
  <v-container fluid>
    <v-row green>
      <v-col :cols="12" :lg="3">
        <Leaderboard />
      </v-col>
      <v-col cols="12" :lg="9">
        <Challenges />
      </v-col>
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