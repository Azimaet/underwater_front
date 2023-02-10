<script setup lang="ts">
import { useCalendarDataProvider } from "@/composables/charts/calendarDataProvider";
import store from "@/store";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";

const { ADD_DIVE } = translations.en.PAGES;
const owner = "api/users/" + store.state.user.data.id;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <ApolloQuery
        :query="require('@/graphql/queries/datesByDives.gql')"
        :variables="{ owner }"
        notifyOnNetworkStatusChange
      >
        <template v-slot="{ result: { loading, error, data } }">
          <template v-if="data && data?.dives?.edges?.length">
            <template v-if="!isMobile.value">
              <v-row>
                <v-col cols="8">
                  <ChartCalendar
                    :data="useCalendarDataProvider(data).heatmap"
                  />
                </v-col>
                <v-col cols="4">
                  <PanelTemplate :data="useCalendarDataProvider(data).panel" />
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-col>
                  <ChartCalendar
                    :data="useCalendarDataProvider(data).heatmap"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <PanelTemplate :data="useCalendarDataProvider(data).panel" />
                </v-col>
              </v-row>
            </template>
          </template>

          <template v-else-if="loading">
            <v-alert
              type="info"
              title="Loading Dives..."
              text="Dives are currently fetching from the server, please waits few seconds..."
              variant="outlined"
              :class="['text-center']"
            >
              <v-progress-linear
                color="secondary"
                indeterminate
                :class="['my-4']"
              />
            </v-alert>
          </template>

          <template v-else-if="error">An error occurred</template>

          <template v-else>
            <v-alert
              type="info"
              title="Missing Dives!"
              text="You don't have any dives yet. You can add it here."
              variant="outlined"
              :class="['text-center']"
            >
              <v-btn
                variant="outlined"
                value="add-dive"
                link
                :class="['mx-4']"
                @click="$router.push('dive_form')"
              >
                {{ ADD_DIVE }}</v-btn
              >
            </v-alert>
          </template>
        </template>
      </ApolloQuery>
    </template>
  </StrateTemplate>
</template>
