<template>
  <div>
    <LoginTemplate />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginTemplate from "@/components/templates/LoginTemplate.vue";

@Options({
  components: {
    LoginTemplate,
  },
})
export default class LoginView extends Vue {}
</script>
