<script setup lang="ts">
import { Colors } from "@/plugins/utils/colors";
import { CalendarHighlightItem } from "@/types/charts/calendar";
import { PanelData } from "../../types/charts/panel";

const props = defineProps<{
  data: PanelData;
}>();
</script>

<template>
  <v-card rounded border>
    <v-list :style="{ overflow: 'hidden' }">
      <v-row v-for="(row, rowIndex) in props.data.rows" :key="rowIndex" dense>
        <v-col v-for="(col, colIndex) in row.cols" :key="colIndex">
          <template v-if="!col.dropdown">
            <v-list-item v-if="col.highlight" :title="col.title">
              <v-list-item-subtitle
                v-for="(subtitle, index) in col.subtitle"
                :key="index"
              >
                <v-icon
                  :icon="'mdi-star'"
                  :size="16"
                  :color="
                    index === 0
                      ? Colors.gold
                      : index === 1
                      ? Colors.silver
                      : Colors.bronze
                  "
                ></v-icon>
                {{ subtitle }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-else
              :title="col.title"
              :subtitle="(col.subtitle[0] as string)"
            ></v-list-item>
          </template>
          <template v-else>
            <v-menu
              :align-self="'center'"
              :class="['text-center', 'align-middle']"
            >
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> Years Stats </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in (col.subtitle as CalendarHighlightItem[])"
                  :key="index"
                >
                  <v-list-item-title>{{
                    item.title +
                    " (" +
                    item.subtitle +
                    "dive" +
                    (item.subtitle > 1 ? "s)" : ")")
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>
