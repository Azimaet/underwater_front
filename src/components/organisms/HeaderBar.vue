<script setup lang="ts">
import { FormActions } from "@/types/models/form";
import { isLogged, useAuthLogout } from "@/composables/auth";
import { isMobile } from "@/composables/utils/isMobile";
import { menu } from "@/store/menu";
import { onMounted, ref } from "vue";
import { translations } from "@/i18n/index";
import { useAlertFactory } from "@/composables/alertFactory";
import store from "@/store";

const scrollPosition = ref(0);
const { LOGOUT } = translations.en.FORM_WORDING;
const { LOGOUT_ACCOUNT } = translations.en.ALERTS;

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});
</script>

<template>
  <v-app-bar
    :elevation="0"
    :color="'transparent'"
    :class="[
      scrollPosition > 0 ? 'bg-background' : 'bg-transparent',
      'bg-transition',
      'px-4',
    ]"
    :style="{
      position: 'fixed',
      height: '64px',
      left: 0,
      right: 0,
      zIndex: 1,
    }"
  >
    <template v-slot:prepend>
      <v-btn
        variant="plain"
        icon="mdi-menu"
        :size="'large'"
        @click="menu.toggleAction()"
      />
    </template>
    <v-app-bar-title>
      <LogoType />
    </v-app-bar-title>
    <template v-slot:append>
      <div :class="['d-flex', 'justify-center', 'align-center']">
        <p
          v-if="isLogged()"
          v-html="store.state.user.data.username"
          :class="['d-none', 'd-sm-flex', 'mx-2']"
        />
        <v-badge v-if="isLogged()" dot color="success" :class="['mx-2']">
          <v-avatar
            v-if="store.state.user.data.avatar"
            :image="
              require('@/assets/avatars/avatar' +
                store.state.user.data.avatar +
                '.png')
            "
            :size="isMobile.value ? 30 : 45"
          />
          <v-avatar v-else color="info" :size="isMobile.value ? 30 : 45">
            <v-icon icon="mdi-account-circle" />
          </v-avatar>
        </v-badge>
        <v-btn
          v-if="isLogged()"
          color="error"
          :class="['ml-2', 'd-none', 'd-md-flex']"
          :size="'default'"
          @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
        >
          {{ LOGOUT }}
        </v-btn>
        <v-btn
          v-if="isLogged()"
          color="error"
          icon="mdi-exit-to-app"
          :class="['ml-2', 'd-md-none']"
          :size="'default'"
          @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
        />
        <FormUserModal v-if="!isLogged()" :action="FormActions.LOGIN" />
      </div>
    </template>
  </v-app-bar>
</template>
