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
// @ is an alias to /src
import Leaderboard from "@/components/Sandbox/Leaderboard";
import Challenges from "@/components/Sandbox/Challenges";
export default {
  name: "Sandbox",
  components: {
    Leaderboard,
    Challenges
  }
};
</script>
