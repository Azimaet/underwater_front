<script lang="ts">
import { defineComponent } from "vue";

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
          </v-row>

          <Suspense>
            <StrateDateLocation />
          </Suspense>

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
