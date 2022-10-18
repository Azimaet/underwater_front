// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { ThemeDefinition, createVuetify } from "vuetify";

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#121212",
    surface: "#121212",
    primary: "#0180D4",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
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
