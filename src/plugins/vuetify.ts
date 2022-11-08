import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";

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
});
