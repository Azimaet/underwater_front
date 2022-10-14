<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProfileTemplate from "@/components/templates/ProfileTemplate.vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";

@Options({
  components: {
    HeaderBar,
    ProfileTemplate,
  },
})
export default class ProfileView extends Vue {}
</script>

<template>
  <HeaderBar />

  <div>
    <ProfileTemplate />
  </div>
</template>
