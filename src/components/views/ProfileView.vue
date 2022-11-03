<script lang="ts">
import { defineComponent } from "vue";
import BaseTemplate from "@/components/templates/BaseTemplate.vue";
// import StrateGasCharts from "@/components/organisms/StrateGasCharts.vue";
import StrateDepthCharts from "@/components/organisms/StrateDepthCharts.vue";
import CardResumeProfile from "../molecules/CardResumeProfile.vue";
import StrateThemesCharts from "@/components/organisms/StrateThemesCharts.vue";

export default defineComponent({
  name: "ProfileView",
});
</script>

<script setup lang="ts">
const containerClasses = ["mt-15"];
</script>

<template>
  <BaseTemplate>
    <template #main>
      <v-container style="max-width: 1280px" :class="containerClasses">
        <v-card width="100%" :class="['px-15']" :color="'grey900'" rounded>
          <v-row>
            <v-col cols="4">
              <Suspense>
                <CardResumeProfile />
              </Suspense>
            </v-col>
            <v-col cols="8" class="text-center pt-15">
              Calendar in progress</v-col
            >
          </v-row>

          <Suspense>
            <StrateDepthCharts />
          </Suspense>

          <Suspense>
            <StrateThemesCharts />
          </Suspense>
          <!-- <Suspense>
              <StrateGasCharts />
            </Suspense>
            <Suspense>
              <StrateDepthTimeCharts />
            </Suspense> -->
        </v-card>
      </v-container>
    </template>
  </BaseTemplate>
</template>
