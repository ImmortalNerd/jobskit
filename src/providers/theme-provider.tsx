"use client";

import { createTheme, ThemeProvider, CssBaseline, Button } from "@mui/material";
import { ReactNode, useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#1976d2",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: { xs: "5px", sm: "8px", md: "10px" },
          minWidth: "auto",
        }}
        variant="outlined"
      >
        <Icon
          icon={mode === "light" ? "material-symbols:dark-mode" : "carbon:sun"}
          width={20}
          height={20}
        />
      </Button>
      {children}
    </ThemeProvider>
  );
}
