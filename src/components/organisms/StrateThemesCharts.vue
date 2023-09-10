<script setup lang="ts">
// import { useGqlQueryManager } from "@/composables/gqlQueryManager";
// import { GraphqlActions } from "@/types/models/graphql";
import { DivingThemeInterface } from "@/types/global/divingTheme";
import { useThemesDataProvider } from "@/composables/charts/themesDataProvider";
import store from "@/store";
import { isMobile } from "@/composables/utils/isMobile";
import { translations } from "@/i18n/index";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

import divingRoles from "../../graphql/queries/divingRoles.gql";

// import { divingEnvironments } from "../../graphql/queries/queryDivingEnvironment";
// import { divingEnvironments } from '@/graphql/queries/divingEnvironments';
// console.log(divingEnvironments);
const { ADD_DIVE } = translations.en.PAGES;
const { TITLE, TEXT } = translations.en.PROFILE.ERROR_DATA;
const owner = "api/users/" + store.state.user.data.id;

// const divingEnvironmentsItems: DivingThemeInterface[] =
//   await useGqlQueryManager(GraphqlActions.DIVING_ENVIRONMENTS).then(
//     (result) => {
//       return result["divingEnvironments" as keyof typeof result].edges.map(
//         (item: { node: DivingThemeInterface }) => item.node
//       );
//     }
//   );

// const divingEnvironmentsItems: DivingThemeInterface[] =
//   await useGqlQueryManager(GraphqlActions.DIVING_ENVIRONMENTS).then(
//     (result) => {
//       return result["divingEnvironments" as keyof typeof result].edges.map(
//         (item: { node: DivingThemeInterface }) => item.node
//       );
//     }
//   );

// const { result } = useQuery("@/graphql/divingEnvironments");
// const divingEnvironmentsItems: DivingThemeInterface[] = await result.then(
//   (result: any) => {
//     return result["divingEnvironments" as keyof typeof result].edges.map(
//       (item: { node: DivingThemeInterface }) => item.node
//     );
//   }
// );

// const divingRolesItems: DivingThemeInterface[] = await useGqlQueryManager(
//   GraphqlActions.DIVING_ROLES
// ).then((result) => {
//   return result["divingRoles" as keyof typeof result].edges.map(
//     (item: { node: DivingThemeInterface }) => item.node
//   );
// });

// const divingTypesItems: DivingThemeInterface[] = await useGqlQueryManager(
//   GraphqlActions.DIVING_TYPES
// ).then((result) => {
//   return result["divingTypes" as keyof typeof result].edges.map(
//     (item: { node: DivingThemeInterface }) => item.node
//   );
// });

const { result, loading, error } = useQuery(
  gql`
    ${divingRoles}
  `
);

// const { result: types } = useQuery(gql`"@/graphql/queries/divingTypes"`);
// const { result: environments } = useQuery(
//   gql`"@/graphql/queries/divingEnvironments"`
// );

// await Promise.all([roles, types, environments]);

console.log(result);

// const divingEnvironmentsItems: DivingThemeInterface[] =
//   environments?.divingEnvironments?.edges?.map(
//     (edge: { node: DivingThemeInterface }) => edge.node
//   ) || [];

// const divingRolesItems: DivingThemeInterface[] =
//   roles.data?.divingRoles?.edges?.map(
//     (edge: { node: DivingThemeInterface }) => edge.node
//   ) || [];

// const divingTypesItems: DivingThemeInterface[] =
//   types.data?.divingTypes?.edges?.map(
//     (edge: { node: DivingThemeInterface }) => edge.node
//   ) || [];

// const taxonomies = [
//   divingEnvironmentsItems,
//   divingRolesItems,
//   divingTypesItems,
// ];

// const taxonomies: never[] = [];

// console.log(taxonomies);
</script>

<template>
  <div>Hello</div>
  <!-- <StrateTemplate>
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
  </StrateTemplate> -->
</template>
