<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddDiveTemplate from "@/components/templates/AddDiveTemplate.vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";

@Options({
  components: {
    HeaderBar,
    AddDiveTemplate,
  },
})
export default class LoginView extends Vue {}
</script>

<template>
  <HeaderBar />

  <div>
    <AddDiveTemplate />
  </div>
</template>
