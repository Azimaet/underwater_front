<template>
  <router-link to="/" :class="['subheading']">
    <div :class="['font-barlow']">
      under<span
        :class="['font-weight-bold', 'color-logo_green', 'glow-effect']"
        >www</span
      >ater
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 340px) {
  div {
    font-size: 14px;
  }
}
</style>
