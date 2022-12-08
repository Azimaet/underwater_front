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
            <v-card-title>Dives List</v-card-title>
            <v-list-item
              v-if="
                store.state.user.data.avatar && store.state.user.data.username
              "
              :prepend-avatar="
                require('@/assets/avatars/avatar' +
                  store.state.user.data.avatar +
                  '.svg')
              "
              :title="store.state.user.data.username"
            ></v-list-item>
          </v-img>

          <v-container fluid>
            <Suspense>
              <DivesList
                :title="'Dives List'"
                :subtitle="'All your dives. You can access each dive, delete or update it.'"
                :icon="'mdi-mdi-format-list-bulleted'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
