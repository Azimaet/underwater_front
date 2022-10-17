<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiveFormTemplate from "@/components/templates/DiveFormTemplate.vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";

@Options({
  components: {
    HeaderBar,
    DiveFormTemplate,
  },
})
export default class DiveFormView extends Vue {}
</script>

<template>
  <HeaderBar />

  <div>
    <DiveFormTemplate />
  </div>
</template>
