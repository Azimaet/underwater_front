<script lang="ts">
export default { name: "FooterBar" };
</script>

<script setup lang="ts">
const githubIcon = {
  name: "mdi-github",
  placement: "prepend",
};

const legalsClasses = [
  "d-flex",
  "flex-direction-row",
  "justify-center",
  "align-center",
];
</script>

<template>
  <v-bottom-navigation>
    <span :class="legalsClasses">
      2022 - Underwwwater - made with
      <v-icon>mdi-symfony</v-icon>
      <v-icon>mdi-vuejs</v-icon>
      <v-icon>mdi-graphql</v-icon>
    </span>

    <ButtonComponent
      :icon="githubIcon"
      :size="'small'"
      :href="'https://github.com/Azimaet'"
      :label="'Visit my Github'"
      :btn-classes="['d-flex']"
    />
  </v-bottom-navigation>
</template>
