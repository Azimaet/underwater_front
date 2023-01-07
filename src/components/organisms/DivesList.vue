<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ref } from "vue";
import { useDivesCollectionLoader } from "../../composables/utils/divesCollectionLoader";
import { useGasNameProvider } from "@/composables/gasNameProvider";
import { Colors } from "@/plugins/utils/colors";
import { translations } from "@/i18n/index";
import { format } from "date-fns";
import FormDiveDeleteModal from "./FormDiveDeleteModal.vue";
import { DiveInterface } from "@/types/global/dive";

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
  return useDivesCollectionLoader(result) as DiveInterface[];
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
          <v-list :tag="'ul'" density="compact">
            <v-list-item
              v-for="(dive, index) in divesCollection"
              :key="index"
              :value="dive"
              active-color="primary"
              :lines="'one'"
              :tag="'li'"
            >
              <v-list-item-title
                :class="['d-flex', 'flex-row', 'justify-space-between']"
              >
                <span>
                  {{ "#" + (divesCollection.length - index) }}
                </span>
                <span>
                  {{ format(new Date(dive.date), "PP") }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle
                :class="[
                  'd-flex',
                  'justify-space-between',
                  'align-self-center',
                ]"
              >
                <v-container :class="['d-none', 'd-md-flex']">
                  <v-row>
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
                    <v-col :cols="7">
                      <v-chip
                        size="small"
                        :variant="'outlined'"
                        :color="Colors['theme_' + dive.divingEnvironment?.token.replaceAll('%', '') as keyof typeof Colors]"
                      >
                        {{ dive.divingEnvironment?.label }}
                      </v-chip>
                      <v-chip
                        size="small"
                        :color="Colors['theme_' + dive.divingRole?.token.replaceAll('%', '') as keyof typeof Colors]"
                        :variant="'text'"
                      >
                        {{ dive.divingRole?.label }}
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
                        @click="
                          $router.push({
                            name: 'dive_form',
                            state: { dive: dive },
                          })
                        "
                      />
                      <FormDiveDeleteModal :id="dive.id" />
                    </v-col>
                  </v-row>
                </v-container>

                <v-container :class="['d-md-none']">
                  <v-row>
                    <v-col :cols="9">
                      <div>
                        <v-row>
                          <v-col :class="['d-flex', 'flex-row']">
                            <div :class="['mr-4']">
                              <v-icon icon="mdi-clock-outline" />
                              {{ dive.totalTime }}mn
                            </div>
                            <div :class="['mr-4']">
                              <v-icon icon="mdi-chart-bell-curve-cumulative" />
                              {{ dive.maxDepth }}mt
                            </div>
                            <div :class="['mr-4']">
                              <v-icon icon="mdi-gas-cylinder" />
                              {{
                                useGasNameProvider(dive.gasTanks[0].gasMix)
                                  .title
                              }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-chip
                              size="small"
                              :variant="'outlined'"
                              :color="Colors['theme_' + dive.divingEnvironment?.token.replaceAll('%', '') as keyof typeof Colors]"
                            >
                              {{ dive.divingEnvironment?.label }}
                            </v-chip>
                            <v-chip
                              size="small"
                              :color="Colors['theme_' + dive.divingRole?.token.replaceAll('%', '') as keyof typeof Colors]"
                              :variant="'text'"
                            >
                              {{ dive.divingRole?.label }}
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
                        </v-row>
                      </div>
                    </v-col>
                    <v-col :cols="3">
                      <ButtonComponent
                        :label="EDIT"
                        :color="'warning'"
                        :responsive="true"
                        @click="
                          $router.push({
                            name: 'dive_form',
                            state: { dive: dive },
                          })
                        "
                      />
                      <FormDiveDeleteModal :id="dive.id" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
