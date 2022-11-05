<script lang="ts">
export default { name: "BaseTemplate" };
</script>

<template>
  <div
    id="template"
    :style="{
      'background-image':
        'url(' + require(`@/assets/background-animate.svg`) + ')',
      'background-size': 'cover',
      'background-position': 'top',
    }"
  >
    <HeaderBar />
    <AlertsBucket />
    <v-main>
      <slot name="main"> </slot>
    </v-main>
    <FooterBar />
    <MenuDrawer />
  </div>
</template>
