import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    grey900: "#212121",
    grey800: "#424242",
    grey700: "#616161",
    grey600: "#757575",
    grey500: "#9e9e9e",
    grey400: "#bdbdbd",
    grey300: "#e0e0e0",
    grey200: "#eeeeee",
    grey100: "#f5f5f5",
    background: "#121212",
    surface: "#121212",
    primary: "#0180D4",
    secondary: "#03DAC6",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
    },
  },
});
