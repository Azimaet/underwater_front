<template>
  <div class="profile">
    <ResumeProfile />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ResumeProfile from "@/components/templates/ResumeProfile.vue";

@Options({
  components: {
    ResumeProfile,
  },
})
export default class ProfileView extends Vue {}
</script>
