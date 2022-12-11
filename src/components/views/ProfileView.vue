<script setup lang="ts">
import store from "@/store";
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
            <v-card-title>Profile</v-card-title>

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
                :title="'Dates'"
                :subtitle="'Here is the calendar of your recent dives, and more data.'"
                :icon="'mdi-calendar'"
              />
            </Suspense>
            <Suspense>
              <StrateDepthCharts
                :title="'Depths'"
                :subtitle="'Data of yours dives depth.'"
                :icon="'mdi-chart-bell-curve-cumulative'"
              />
            </Suspense>
            <Suspense>
              <StrateGasCharts
                :title="'Gas & Consumption'"
                :subtitle="'Data of gasTanks used.'"
                :icon="'mdi-gas-cylinder'"
              />
            </Suspense>
            <Suspense>
              <StrateThemesCharts
                :title="'Themes'"
                :subtitle="'Data of the types of dives you made.'"
                :icon="'mdi-shape'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
