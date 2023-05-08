<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import { DivingThemeInterface } from "@/types/global/divingTheme";
import { useThemesDataProvider } from "@/composables/charts/themesDataProvider";
import store from "@/store";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";

const { ADD_DIVE } = translations.en.PAGES;
const { TITLE, TEXT } = translations.en.PROFILE.ERROR_DATA;
const owner = "api/users/" + store.state.user.data.id;

const divingEnvironmentsItems: DivingThemeInterface[] =
  await useGqlQueryManager(GraphqlActions.DIVING_ENVIRONMENTS).then(
    (result) => {
      return result["divingEnvironments" as keyof typeof result].edges.map(
        (item: { node: DivingThemeInterface }) => item.node
      );
    }
  );

const divingRolesItems: DivingThemeInterface[] = await useGqlQueryManager(
  GraphqlActions.DIVING_ROLES
).then((result) => {
  return result["divingRoles" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const divingTypesItems: DivingThemeInterface[] = await useGqlQueryManager(
  GraphqlActions.DIVING_TYPES
).then((result) => {
  return result["divingTypes" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const taxonomies = [
  divingEnvironmentsItems,
  divingRolesItems,
  divingTypesItems,
];

console.log(taxonomies);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <ApolloQuery
        :query="require('@/graphql/queries/themesByDives.gql')"
        :variables="{ owner }"
        notifyOnNetworkStatusChange
      >
        <template v-slot="{ result: { loading, error, data } }">
          <template v-if="data && data?.dives?.edges?.length">
            <template v-if="!isMobile.value">
              <v-row>
                <v-col cols="3">
                  <ChartDoughnut
                    :data="useThemesDataProvider(data, taxonomies).doughnuts[0]"
                    :context="'themes_doughnut'"
                  />
                </v-col>
                <v-col cols="3">
                  <ChartDoughnut
                    :data="useThemesDataProvider(data, taxonomies).doughnuts[1]"
                    :context="'themes_doughnut'"
                  />
                </v-col>
                <v-col cols="6">
                  <ChartProgress
                    :data="useThemesDataProvider(data, taxonomies).progress"
                  />
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-col cols="9" :class="['mx-auto']">
                  <ChartDoughnut
                    :data="useThemesDataProvider(data, taxonomies).doughnuts[0]"
                    :context="'themes_doughnut'"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="9" :class="['mx-auto']">
                  <ChartDoughnut
                    :data="useThemesDataProvider(data, taxonomies).doughnuts[1]"
                    :context="'themes_doughnut'"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <ChartProgress
                    :data="useThemesDataProvider(data, taxonomies).progress"
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
