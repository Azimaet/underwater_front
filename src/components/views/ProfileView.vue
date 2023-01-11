<script setup lang="ts">
import store from "@/store";
import { translations } from "@/i18n/index";

const { STRATE_CALENDAR, STRATE_DEPTH, STRATE_GAS, STRATE_THEMES } =
  translations.en.PROFILE;

const { PROFILE } = translations.en.PAGES;
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
            <PageTitle :label="PROFILE" :tag="'h2'" />
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
            />
          </v-img>

          <v-container fluid>
            <Suspense>
              <StrateCalendar
                :title="STRATE_CALENDAR.TITLE"
                :subtitle="STRATE_CALENDAR.SUBTITLE"
                :icon="'mdi-calendar'"
              />
            </Suspense>
            <Suspense>
              <StrateDepthCharts
                :title="STRATE_DEPTH.TITLE"
                :subtitle="STRATE_DEPTH.SUBTITLE"
                :icon="'mdi-chart-bell-curve-cumulative'"
              />
            </Suspense>
            <Suspense>
              <StrateGasCharts
                :title="STRATE_GAS.TITLE"
                :subtitle="STRATE_GAS.SUBTITLE"
                :icon="'mdi-gas-cylinder'"
              />
            </Suspense>
            <Suspense>
              <StrateThemesCharts
                :title="STRATE_THEMES.TITLE"
                :subtitle="STRATE_THEMES.SUBTITLE"
                :icon="'mdi-shape'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
