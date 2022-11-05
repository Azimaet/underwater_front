<script lang="ts">
export default { name: "LogoType" };
</script>

<template>
  <router-link to="/" :class="['subheading', 'mx-3']">
    <div :class="['font-barlow', 'text-h5']">
      under<span
        :class="['font-weight-bold', 'color-logo-green', 'glow-effect']"
        >www</span
      >ater
    </div>
  </router-link>
</template>

<style></style>
