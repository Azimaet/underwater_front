import { ref } from "vue";

export const menu = ref({
  isOpen: false,

  toggleAction() {
    this.isOpen = !this.isOpen;
  },
});
