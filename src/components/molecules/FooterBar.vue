<script setup lang="ts">
import { ref, onMounted } from "vue";

const scrolledToBottom = ref(false);

const updateScroll = () => {
  scrolledToBottom.value =
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? true
      : false;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", updateScroll);
});
</script>

<template>
  <v-bottom-navigation
    :elevation="0"
    :class="[
      scrolledToBottom !== true ? 'bg-background' : 'bg-transparent',
      'bg-transition',
    ]"
  >
    <div
      :class="[
        'd-flex',
        'flex-direction-row',
        'justify-center',
        'align-center',
      ]"
    >
      <span :class="['mr-1', 'd-none', 'd-sm-flex']">
        2022 - Underwwwater -
      </span>
      <span> made with</span>
      <v-icon :class="['mx-1']">mdi-symfony</v-icon>
      <v-icon :class="['mx-1']">mdi-graphql</v-icon>
      <v-icon :class="['mx-1']">mdi-vuejs</v-icon>
      <v-icon :class="['mx-1']">mdi-vuetify</v-icon>
      |
    </div>

    <ButtonComponent
      :variant="'text'"
      :icon="{
        name: 'mdi-github',
        placement: 'responsive',
      }"
      :size="'small'"
      :href="'https://github.com/Azimaet'"
      :label="'Visit my Github'"
      :class="['d-flex']"
      :responsive="true"
    />
  </v-bottom-navigation>
</template>
