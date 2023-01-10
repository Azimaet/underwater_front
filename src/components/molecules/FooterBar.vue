<script setup lang="ts">
import { ref, onMounted } from "vue";
import { translations } from "@/i18n/index";

const { MADE, CREDITS, GITHUB } = translations.en.FOOTER;

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
        {{ CREDITS }}
      </span>
      <span> {{ MADE }}</span>
      <v-icon :class="['mx-1']">mdi-symfony</v-icon>
      <v-icon :class="['mx-1']">mdi-graphql</v-icon>
      <v-icon :class="['mx-1']">mdi-vuejs</v-icon>
      <v-icon :class="['mx-1']">mdi-vuetify</v-icon>
      |
    </div>
    <v-btn
      :variant="'text'"
      :size="'small'"
      :prepend-icon="'mdi-github'"
      :class="['d-flex']"
      :href="'https://github.com/Azimaet'"
    >
      {{ GITHUB }}
    </v-btn>
  </v-bottom-navigation>
</template>
