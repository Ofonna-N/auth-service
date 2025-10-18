"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { PaletteMode, ThemeOptions } from "@mui/material";

// Theme factory: returns a theme configured for the requested color mode.
// Exporting a factory lets consumers (and tests) generate light/dark themes.
export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    // Primary/secondary remain stable across modes; background and other
    // tokens change based on the active color scheme.
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
    },
    // Custom brand token — useful for brand-specific buttons, links, and
    // components. Type augmentation (`mui.d.ts`) enables `color="brand"`.
    brand: {
      main: mode === "light" ? "#0b5fff" : "#86b7ff",
      contrastText: "#ffffff",
    },
    background:
      mode === "light"
        ? { default: "#f7fafc", paper: "#ffffff" }
        : { default: "#121212", paper: "#1e1e1e" },
  },
  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default function createAppTheme(mode: PaletteMode) {
  // cast to any to avoid strict type differences between ThemeOptions and
  // CssVarsThemeOptions in projects that don't use CssVarsProvider.
  let theme = createTheme(getDesignTokens(mode));
  theme = responsiveFontSizes(theme);
  return theme;
}
