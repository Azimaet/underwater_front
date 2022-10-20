<script lang="ts">
export default { name: "HeaderBar" };
</script>

<script setup lang="ts">
import MenuBurger from "@/components/organisms/MenuBurger.vue";
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";
import AvatarProfileChip from "@/components/molecules/AvatarProfileChip.vue";
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";
import { FormActions } from "@/composables/types/form";
import UserFormModal from "../organisms/UserFormModal.vue";
</script>

<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <MenuBurger />
    </template>
    <v-app-bar-title>
      <router-link to="/" class="subheading mx-3"> Underwwwater </router-link>
    </v-app-bar-title>
    <template v-slot:append>
      <div v-if="isLogged()" class="d-flex justify-center align-center">
        <AvatarProfileChip />
        <div v-html="store.state.user.data.username" class="mx-5" />
        <ButtonComponent
          :label="'Logout'"
          :color="'error'"
          :size="'x-large'"
          @click="useAuthLogout"
        />
      </div>
      <div v-else class="d-flex justify-center align-center">
        <UserFormModal :action="FormActions.LOGIN" />
      </div>
    </template>
  </v-app-bar>
</template>
