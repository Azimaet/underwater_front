<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ref } from "vue";
import { useDivesCollectionLoader } from "../../composables/utils/divesCollectionLoader";
import { useGasNameProvider } from "@/composables/gasNameProvider";
import { Colors } from "@/plugins/utils/colors";
import { translations } from "@/i18n/index";

const { EDIT } = translations.en.FORM_WORDING;

const props = defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
}>();

const isDives = ref(false);

const divesCollection = await useGqlQueryManager(GraphqlActions.DIVES, {
  owner: "api/users/" + store.state.user.data.id,
}).then((result) => {
  isDives.value = result.dives.edges.length;
  return useDivesCollectionLoader(result);
});
</script>

<template>
  <v-row :class="['mb-8']">
    <v-col>
      <v-card
        :title="props.title"
        :subtitle="props.subtitle"
        :append-icon="icon"
        :elevation="10"
        border
        rounded
      >
        <v-card-text>
          <v-list density="compact">
            <v-list-subheader>DIVES</v-list-subheader>

            <v-list-item
              v-for="(dive, index) in divesCollection"
              :key="index"
              :value="dive"
              active-color="primary"
              :lines="'one'"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="'#' + (divesCollection.length - index)"
                />
                <v-list-item-subtitle
                  :class="[
                    'd-flex',
                    'justify-space-between',
                    'align-self-center',
                  ]"
                >
                  <v-row>
                    <v-col :cols="1">
                      {{ dive.date.toString().split("T")[0] }}
                    </v-col>
                    <v-col :cols="1">
                      <v-icon icon="mdi-clock-outline" />
                      {{ dive.totalTime }}mn
                    </v-col>
                    <v-col :cols="1">
                      <v-icon icon="mdi-chart-bell-curve-cumulative" />
                      {{ dive.maxDepth }}mt
                    </v-col>
                    <v-col :cols="1">
                      <v-icon icon="mdi-gas-cylinder" />
                      {{ useGasNameProvider(dive.gasTanks[0].gasMix).title }}
                    </v-col>
                    <v-col :cols="6">
                      <v-chip
                        size="small"
                        :variant="'outlined'"
                        :color="Colors['theme_' + dive.divingEnvironment.token.replaceAll('%', '') as keyof typeof Colors]"
                      >
                        {{ dive.divingEnvironment.label }}
                      </v-chip>
                      <v-chip
                        size="small"
                        :color="Colors['theme_' + dive.divingRole.token.replaceAll('%', '') as keyof typeof Colors]"
                        :variant="'text'"
                      >
                        {{ dive.divingRole.label }}
                      </v-chip>
                      <v-chip
                        v-for="theme in dive.divingType.edges"
                        :key="theme"
                        size="small"
                        :color="Colors['theme_' + theme.node.token.replaceAll('%', '') as keyof typeof Colors]"
                        :variant="'tonal'"
                      >
                        {{ theme.node.label }}
                      </v-chip>
                    </v-col>
                    <v-col :cols="2">
                      <ButtonComponent
                        :label="EDIT"
                        :color="'warning'"
                        :responsive="true"
                        :class="['ml-2']"
                        @click="
                          $router.push({
                            name: 'dive_form',
                            state: { dive: dive },
                          })
                        "
                      />
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
