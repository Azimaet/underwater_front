<template>
  <div
    :style="{
      'background-size': 'cover',
      'background-position': 'top',
      'background-image':
        'url(' + require(`@/assets/background-animate.svg`) + ')',
    }"
  >
    <HeaderBar />
    <AlertsBucket />
    <v-main>
      <slot name="parallax"> </slot>
      <v-container :style="{ maxWidth: '1280px' }">
        <slot name="main"> </slot>
      </v-container>
    </v-main>
    <FooterBar />
    <MenuDrawer />
  </div>
</template>
