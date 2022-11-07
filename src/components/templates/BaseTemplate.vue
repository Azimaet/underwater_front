<template>
  <div
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
      <slot name="parallax"> </slot>
      <v-container :style="{ maxWidth: '1280px' }">
        <slot name="main"> </slot>
      </v-container>
    </v-main>
    <FooterBar />
    <MenuDrawer />
  </div>
</template>
