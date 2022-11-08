<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <v-card rounded border>
    <v-list :style="{ overflow: 'hidden' }">
      <v-row v-for="row in props.data.rows" :key="row" dense>
        <v-col v-for="col in row.cols" :key="col">
          <template v-if="col.subtitle.length === 1">
            <v-list-item v-if="col.highlight" :title="col.title">
              <v-list-item-subtitle>
                <v-icon :icon="'mdi-star'" :size="16" :color="'gold'"></v-icon>
                {{ col.subtitle[0] }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-else
              :title="col.title"
              :subtitle="col.subtitle"
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
                <v-list-item v-for="item in col.subtitle" :key="item">
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
