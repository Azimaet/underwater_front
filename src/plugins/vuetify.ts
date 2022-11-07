import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";

import colors from "@/scss/_export.module.scss";

const regex = /^#([0-9a-f]{3}){1,2}$/i;

for (const key in colors) {
  if (!regex.test(colors[key])) {
    delete colors[key];
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: colors,
};

export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
    },
  },
});
