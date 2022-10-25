<script lang="ts">
import { defineComponent } from "vue";
import BaseTemplate from "@/components/templates/BaseTemplate.vue";
import StrateGasCharts from "@/components/organisms/StrateGasCharts.vue";
import StrateDepthTimeCharts from "@/components/organisms/StrateDepthTimeCharts.vue";

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
      <v-container style="max-width: 960px" :class="containerClasses">
        <section>
          <Suspense>
            <StrateGasCharts />
          </Suspense>
          <Suspense>
            <StrateDepthTimeCharts />
          </Suspense>
        </section>
      </v-container>
    </template>
  </BaseTemplate>
</template>
