<script lang="ts">
export default { name: "AvatarProfileChip" };
</script>

<script setup lang="ts">
import store from "@/store";
</script>

<template>
  <v-badge dot color="success">
    <v-avatar
      v-if="store.state.user.data.avatar"
      :image="
        require('@/assets/avatars/avatar' +
          store.state.user.data.avatar +
          '.svg')
      "
    >
    </v-avatar>
    <v-avatar v-else color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>
  </v-badge>
</template>
