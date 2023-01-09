<template>
  <v-card
    :color="'primary'"
    :border="true"
    :elevation="10"
    :tag="'section'"
    width="100%"
    rounded
  >
    <slot name="card"></slot>
  </v-card>
</template>
