<script lang="ts">
import { defineComponent } from "vue";
import StrateDateLocation from "../organisms/StrateCalendar.vue";

export default defineComponent({
  name: "ProfileView",
  components: { StrateDateLocation },
});
</script>

<script setup lang="ts">
import store from "@/store";
const containerClasses = ["mt-15"];
</script>

<template>
  <BaseTemplate>
    <template #main>
      <v-container style="max-width: 1280px" :class="containerClasses">
        <v-card
          width="100%"
          :color="'primary'"
          :border="true"
          :elevation="10"
          rounded
        >
          <v-img
            height="150"
            :src="require('@/assets/bg-card-profile.jpg')"
            cover
            :class="['text-white']"
          >
            <v-card-title>Profile</v-card-title>
            <v-list-item
              v-if="
                store.state.user.data.avatar && store.state.user.data.username
              "
              :prepend-avatar="
                require('@/assets/avatars/avatar' +
                  store.state.user.data.avatar +
                  '.svg')
              "
              :title="store.state.user.data.username"
            ></v-list-item>
          </v-img>

          <v-container fluid>
            <Suspense>
              <StrateDateLocation
                :title="'Dates'"
                :subtitle="'Here is the calendar of your recent dives, and more data.'"
              />
            </Suspense>
            <Suspense>
              <StrateDepthCharts
                :title="'Depths'"
                :subtitle="'Data of yours dives depth.'"
              />
            </Suspense>
            <Suspense>
              <StrateThemesCharts
                :title="'Themes'"
                :subtitle="'Data of the types of dives you made.'"
              />
            </Suspense>
          </v-container>
        </v-card>
      </v-container>
    </template>
  </BaseTemplate>
</template>
