<script lang="ts">
import { defineComponent } from "vue";
import BaseTemplate from "@/components/templates/BaseTemplate.vue";
import FormSettingsEdit from "@/components/organisms/FormSettingsEdit.vue";
import { FormActions } from "@/composables/types/form";

export default defineComponent({
  name: "SettingsView",
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
          <FormSettingsEdit />
        </section>
      </v-container>
    </template>
  </BaseTemplate>
</template>
