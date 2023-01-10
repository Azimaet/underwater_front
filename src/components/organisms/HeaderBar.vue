<script setup lang="ts">
import { isLogged, useAuthLogout } from "@/composables/auth";
import store from "@/store";
import { FormActions } from "@/types/models/form";
import { useAlertFactory } from "@/composables/alertFactory";
import { onMounted, ref } from "vue";
import { menu } from "@/store/menu";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";

const { LOGOUT } = translations.en.FORM_WORDING;
const { LOGOUT_ACCOUNT } = translations.en.ALERTS;

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
      scrollPosition > 0 ? 'bg-background' : 'bg-transparent',
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
        <v-btn
          variant="plain"
          icon="mdi-menu"
          :size="'large'"
          @click="menu.toggleAction()"
        ></v-btn>
      </template>
      <v-app-bar-title>
        <LogoType />
      </v-app-bar-title>
      <template v-slot:append>
        <div v-if="isLogged()" class="d-flex justify-center align-center">
          <div
            v-html="store.state.user.data.username"
            :class="['d-none', 'd-sm-flex', 'mx-2']"
          />
          <v-badge dot color="success" :class="['mx-2']">
            <v-avatar
              v-if="store.state.user.data.avatar"
              :image="
                require('@/assets/avatars/avatar' +
                  store.state.user.data.avatar +
                  '.png')
              "
              :size="isMobile.value ? 30 : 45"
            >
            </v-avatar>
            <v-avatar v-else color="info" :size="isMobile.value ? 30 : 45">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-badge>
          <v-btn
            color="error"
            :class="['ml-2', 'd-none', 'd-md-flex']"
            :size="'default'"
            @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
          >
            {{ LOGOUT }}
          </v-btn>
          <v-btn
            color="error"
            icon="mdi-exit-to-app"
            :class="['ml-2', 'd-md-none']"
            :size="'default'"
            @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
          ></v-btn>
        </div>
        <div v-else :class="['d-flex', 'justify-center', 'align-center']">
          <FormUserModal :action="FormActions.LOGIN" />
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
