<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DiveFormView",
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
          <FormDiveCreate />
        </section>
      </v-container>
    </template>
  </BaseTemplate>
</template>
