<script lang="ts">
export default { name: "HeaderBar" };
</script>

<script setup lang="ts">
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";
import { FormActions } from "@/composables/types/form";
import { useAlertFactory } from "@/composables/alertFactory";
import { onMounted, ref } from "vue";

const scrollPosition = ref(0);

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});
</script>

<template>
  <div
    :class="[
      scrollPosition > 64 ? 'bg-background' : 'bg-transparent',
      'bg-transition',
      'text-center',
      'px-4',
      'mx-auto',
      'w-100',
    ]"
    :style="{ position: 'fixed', height: '64px', left: 0, right: 0, zIndex: 1 }"
  >
    <v-app-bar
      :elevation="0"
      :color="'transparent'"
      :style="{ maxWidth: '1280px', left: 0, right: 0 }"
      :class="['text-center', 'px-4', 'mx-auto']"
    >
      <template v-slot:prepend>
        <MenuBurger />
      </template>
      <v-app-bar-title>
        <LogoType />
      </v-app-bar-title>
      <template v-slot:append>
        <div v-if="isLogged()" class="d-flex justify-center align-center">
          <AvatarProfileChip
            :avatar="store.state.user.data.avatar"
            :badge="true"
            :size="50"
          />
          <div v-html="store.state.user.data.username" class="mx-5" />
          <ButtonComponent
            :label="'Logout'"
            :color="'error'"
            :size="'x-large'"
            @click="
              useAuthLogout(),
                useAlertFactory('success', 'You have been correctly logout.')
            "
          />
        </div>
        <div v-else class="d-flex justify-center align-center">
          <FormUserModal :action="FormActions.LOGIN" />
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
