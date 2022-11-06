<script setup lang="ts">
const props = defineProps<{
  avatar: string | null;
  badge: boolean;
  size: number;
}>();
</script>

<template>
  <template v-if="props.badge">
    <v-badge dot color="success">
      <v-avatar
        v-if="props.avatar"
        :image="require('@/assets/avatars/avatar' + props.avatar + '.svg')"
        :size="props.size"
      >
      </v-avatar>
      <v-avatar v-else color="info" :size="props.size">
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-badge>
  </template>
  <template v-else>
    <v-avatar
      v-if="props.avatar"
      :size="props.size"
      :image="require('@/assets/avatars/avatar' + props.avatar + '.svg')"
    >
    </v-avatar>
    <v-avatar v-else color="info" :size="props.size">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>
  </template>
</template>
