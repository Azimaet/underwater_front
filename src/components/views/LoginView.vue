<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginTemplate from "@/components/templates/LoginTemplate.vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";

@Options({
  components: {
    HeaderBar,
    LoginTemplate,
  },
})
export default class LoginView extends Vue {}
</script>

<template>
  <HeaderBar />

  <div>
    <LoginTemplate />
  </div>
</template>
