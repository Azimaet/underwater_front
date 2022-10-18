<script lang="ts">
import { defineComponent } from "vue";
import HeaderBar from "@/components/organisms/HeaderBar.vue";
import FooterBar from "@/components/molecules/FooterBar.vue";
import HomeParallax from "@/components/molecules/HomeParallax.vue";

export default defineComponent({
  name: "HomeView",

  data() {
    return {
      links_logged_off: [
        {
          text: "Login",
          href: "/login",
        },
      ],
      links_logged_on: [
        {
          text: "Add A Dive",
          href: "/dive_form",
        },
      ],
    };
  },
});
</script>

<script setup lang="ts">
import { isLogged } from "@/composables/auth";

const title = "Welcome to Underwwwater";

const subtitle =
  "Underwwwater is a community dive log. Quickly reference your dives to get your global performances underwater as datas and charts.";

const containerClasses = ["mt-15"];

const rowClasses = ["text-center", "mb-15"];

const h2Classes = ["mb-5"];
</script>

<template>
  <HeaderBar />
  <v-main>
    <HomeParallax :title="title" :subtitle="subtitle" />
    <v-container style="max-width: 960px" :class="containerClasses">
      <section>
        <v-row :class="rowClasses">
          <v-col>
            <article>
              <h2 :class="h2Classes">Set your dives online!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit
                amet tempor tortor, ac efficitur leo. Proin bibendum elit
                lectus, elementum sollicitudin ligula venenatis quis. In aliquet
                id ante eu mattis. Duis ullamcorper tincidunt leo, nec porta
                erat ullamcorper sed. Nulla convallis lacus id justo aliquet
                pulvinar.
              </p>
            </article>
          </v-col>
          <v-col>
            <v-img
              :aspect-ratio="1"
              max-height="125"
              cover
              :src="require('@/assets/mockup_charts/dark-bubble.png')"
            ></v-img>
          </v-col>
        </v-row>
        <v-row :class="rowClasses">
          <v-col>
            <article>
              <h2 :class="h2Classes">
                Get a complete review of your performances
              </h2>
              <p>
                Nullam laoreet arcu ac eros sollicitudin, nec auctor turpis
                pellentesque. Proin vulputate id libero quis tempus. Donec a
                justo bibendum, feugiat lacus quis, interdum velit. Cras
                lacinia, nibh in varius posuere, metus ante ultrices nibh, eu
                convallis nibh lectus sed nibh. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Nam dui
                nisi, ornare vitae placerat vel, pellentesque et quam. Praesent
                hendrerit semper lorem a auctor.
              </p>
            </article>
          </v-col>
          <v-col>
            <v-img
              :aspect-ratio="1"
              max-height="125"
              cover
              :src="require('@/assets/mockup_charts/dark-bar.png')"
            ></v-img>
          </v-col>
        </v-row>
        <v-row :class="rowClasses">
          <v-col>
            <article>
              <h2 :class="h2Classes">Review your dives!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit
                amet tempor tortor, ac efficitur leo. Proin bibendum elit
                lectus, elementum sollicitudin ligula venenatis quis. In aliquet
                id ante eu mattis. Duis ullamcorper tincidunt leo, nec porta
                erat ullamcorper sed. Nulla convallis lacus id justo aliquet
                pulvinar.
              </p>
            </article>
          </v-col>
          <v-col>
            <v-img
              :aspect-ratio="1"
              max-height="125"
              cover
              :src="require('@/assets/mockup_charts/dark-line.png')"
            ></v-img>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-main>
  <FooterBar />
</template>
