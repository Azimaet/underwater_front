<script setup lang="ts">
import { translations } from "@/i18n/index";

const { TITLE, SUBTITLE, DIVE_LOGGING, GET_STARTED } = translations.en.HOME;
</script>

<template>
  <BaseTemplate>
    <template #parallax>
      <ParallaxHeading
        :title="TITLE"
        :subtitle="SUBTITLE"
        :image="require('@/assets/bg.jpg')"
      />
    </template>
    <template #main>
      <section>
        <article>
          <HomeParagraph
            :title="DIVE_LOGGING.TITLE"
            :texts="[DIVE_LOGGING.TEXT]"
          />
        </article>
        <br />
        <article>
          <HomeParagraph
            :title="GET_STARTED.TITLE"
            :texts="[GET_STARTED.TEXT, GET_STARTED.MORE]"
          />
        </article>
      </section>
    </template>
  </BaseTemplate>
</template>
