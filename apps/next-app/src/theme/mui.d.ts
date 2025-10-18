import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand?: Palette["primary"];
  }
  interface PaletteOptions {
    brand?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand?: true;
  }
}
