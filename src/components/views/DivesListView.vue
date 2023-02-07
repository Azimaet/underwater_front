<script setup lang="ts">
import store from "@/store";
import { translations } from "@/i18n/index";

const { DIVES_LIST } = translations.en.PAGES;
const { TITLE, SUBTITLE } = translations.en.DIVES_LIST;
</script>

<template>
  <BaseTemplate>
    <template #main>
      <CardTemplate>
        <template #card>
          <v-img
            height="150"
            :src="require('@/assets/bg-card-profile.jpg')"
            cover
            :class="['text-white']"
          >
            <PageTitle :label="DIVES_LIST" :tag="'h2'" />
            <v-list-item
              v-if="
                store.state.user.data.avatar && store.state.user.data.username
              "
              :prepend-avatar="
                require('@/assets/avatars/avatar' +
                  store.state.user.data.avatar +
                  '.png')
              "
              :title="store.state.user.data.username"
            ></v-list-item>
          </v-img>

          <v-container fluid>
            <Suspense>
              <DivesList
                :title="TITLE"
                :subtitle="SUBTITLE"
                :icon="'$formatListBulleted'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
