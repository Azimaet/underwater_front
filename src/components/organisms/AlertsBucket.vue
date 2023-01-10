<script setup lang="ts">
import store from "@/store";
</script>

<template>
  <ul :class="['alerts_container', 'position-fixed']">
    <v-alert
      v-for="(component, index) in store.state.alerts"
      :tag="'li'"
      :class="['px-4', 'py-4']"
      :key="index"
      :type="component.type"
      closable
      width="100%"
      @click="store.commit('removeAlert', index)"
    >
      {{ component.message }}
    </v-alert>
  </ul>
</template>

<style lang="scss" scoped>
.alerts_container {
  width: 100%;
  top: 64px;
  z-index: 10;
}
</style>
