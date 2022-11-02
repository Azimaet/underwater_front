<script lang="ts">
import { defineComponent } from "vue";
import BaseTemplate from "@/components/templates/BaseTemplate.vue";
import StrateGasCharts from "@/components/organisms/StrateGasCharts.vue";
import StrateDepthTimeCharts from "@/components/organisms/StrateDepthTimeCharts.vue";
import CardResumeProfile from "../molecules/CardResumeProfile.vue";

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
      <v-container style="max-width: 1080px" :class="containerClasses">
        <v-card width="100%" :class="['px-15']" :color="'grey900'" rounded>
          <v-row>
            <v-col cols="3">
              <Suspense>
                <CardResumeProfile />
              </Suspense>
            </v-col>
            <v-col cols="6"></v-col>
            <v-col cols="3"></v-col>
          </v-row>
          <section>
            <Suspense>
              <StrateGasCharts />
            </Suspense>
            <Suspense>
              <StrateDepthTimeCharts />
            </Suspense>
          </section>
        </v-card>
      </v-container>
    </template>
  </BaseTemplate>
</template>
