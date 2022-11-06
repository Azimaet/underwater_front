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
