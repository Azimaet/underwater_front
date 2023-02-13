<script setup lang="ts">
import { useDepthDataProvider } from "@/composables/charts/depthDataProvider";
import store from "@/store";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";

const { ADD_DIVE } = translations.en.PAGES;
const { TITLE, TEXT } = translations.en.PROFILE.ERROR_DATA;
const owner = "api/users/" + store.state.user.data.id;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <ApolloQuery
        :query="require('@/graphql/queries/depthByDives.gql')"
        :variables="{ owner }"
        notifyOnNetworkStatusChange
      >
        <template v-slot="{ result: { loading, error, data } }">
          <template v-if="data && data?.dives?.edges?.length">
            <template v-if="!isMobile.value">
              <v-row>
                <v-col cols="3">
                  <ChartPie
                    :data="useDepthDataProvider(data).pie"
                    :context="'depth_pie'"
                    :height="277"
                  />
                  <PanelTemplate
                    :data="useDepthDataProvider(data).panel"
                    :class="['mb-4']"
                  />
                </v-col>
                <v-col cols="9">
                  <ChartLine
                    :data="useDepthDataProvider(data).line"
                    :context="'depth_line'"
                  />
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-col>
                  <PanelTemplate
                    :data="useDepthDataProvider(data).panel"
                    :class="['mb-4']"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="9" :class="['mx-auto']">
                  <ChartPie
                    :data="useDepthDataProvider(data).pie"
                    :context="'depth_pie'"
                    :height="277"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <ChartLine
                    :data="useDepthDataProvider(data).line"
                    :context="'depth_line'"
                  />
                </v-col>
              </v-row>
            </template>
          </template>

          <template v-else>
            <PlaceholderStrateQuery
              :type="error ? 'error' : 'info'"
              :title="
                error ? TITLE.ERROR : loading ? TITLE.LOADING : TITLE.MISSING
              "
              :text="error ? TEXT.ERROR : loading ? TEXT.LOADING : TEXT.MISSING"
            >
              <template #progress v-if="loading">
                <v-progress-linear
                  color="secondary"
                  indeterminate
                  :class="['my-4']"
              /></template>
              <template #button v-if="!error && !loading">
                <v-btn
                  variant="outlined"
                  value="add-dive"
                  link
                  :class="['mx-4']"
                  @click="$router.push('dive_form')"
                >
                  {{ ADD_DIVE }}
                </v-btn>
              </template>
            </PlaceholderStrateQuery>
          </template>
        </template>
      </ApolloQuery>
    </template>
  </StrateTemplate>
</template>
