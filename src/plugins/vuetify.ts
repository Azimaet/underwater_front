import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ThemeDefinition, createVuetify } from "vuetify";

import colors from "@/scss/_export.module.scss";

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    grey900: colors.grey900,
    grey800: colors.grey800,
    grey700: colors.grey700,
    grey600: colors.grey600,
    grey500: colors.grey500,
    grey400: colors.grey400,
    grey300: colors.grey300,
    grey200: colors.grey200,
    grey100: colors.grey100,
    background: colors.background,
    surface: colors.surface,
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
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
