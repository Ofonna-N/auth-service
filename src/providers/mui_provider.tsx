"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createAppTheme from "../theme/mui_theme";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, _] = React.useState<"light" | "dark">("dark");
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
