<script lang="ts">
export default { name: "AlertsBucket" };
</script>

<script setup lang="ts">
import store from "@/store";

const divClasses = ["alerts--container"];
const alertClasses = ["px-4", "py-4"];
</script>

<template>
  <div :class="divClasses">
    <v-alert
      v-for="(component, index) in store.state.alerts"
      :class="alertClasses"
      :key="index"
      :type="component.type"
      closable
      width="100%"
      @click="store.commit('removeAlert', index)"
    >
      {{ component.message }}
    </v-alert>
  </div>
</template>

<style lang="scss" scoped>
.alerts--container {
  position: fixed;
  width: 100%;
  top: 64px; // header height
  z-index: 10;
}
</style>
