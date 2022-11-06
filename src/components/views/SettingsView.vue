<script setup lang="ts">
const containerClasses = ["mt-15"];
</script>

<template>
  <BaseTemplate>
    <template #main>
      <v-container style="max-width: 960px" :class="containerClasses">
        <section>
          <FormSettingsEdit />
          <v-divider :class="'my-10'"></v-divider>
          <FormSettingsDelete />
        </section>
      </v-container>
    </template>
  </BaseTemplate>
</template>
