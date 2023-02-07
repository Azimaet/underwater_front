import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiAccountCircle,
  mdiCalendar,
  mdiChartBellCurveCumulative,
  mdiClockOutline,
  mdiCog,
  mdiDivingScuba,
  mdiExitToApp,
  mdiFormatListBulleted,
  mdiGasCylinder,
  mdiGithub,
  mdiGraphql,
  mdiLockOutline,
  mdiMenu,
  mdiPencil,
  mdiPlus,
  mdiPodium,
  mdiShape,
  mdiStar,
  mdiSymfony,
  mdiTrashCanOutline,
  mdiViewDashboard,
  mdiVuejs,
  mdiVuetify,
} from "@mdi/js";

import { Colors } from "@/plugins/utils/colors";

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: Colors,
};

export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      accountCircle: mdiAccountCircle,
      calendar: mdiCalendar,
      chartBellCurveCumulative: mdiChartBellCurveCumulative,
      clockOutline: mdiClockOutline,
      cog: mdiCog,
      divingScuba: mdiDivingScuba,
      exitToApp: mdiExitToApp,
      formatListBulleted: mdiFormatListBulleted,
      gasCylinder: mdiGasCylinder,
      github: mdiGithub,
      graphql: mdiGraphql,
      lockOutline: mdiLockOutline,
      menu: mdiMenu,
      pencil: mdiPencil,
      plus: mdiPlus,
      podium: mdiPodium,
      shape: mdiShape,
      star: mdiStar,
      symfony: mdiSymfony,
      trashCanOutline: mdiTrashCanOutline,
      viewDashboard: mdiViewDashboard,
      vuejs: mdiVuejs,
      vuetify: mdiVuetify,
    },
    sets: {
      mdi,
    },
  },
});
