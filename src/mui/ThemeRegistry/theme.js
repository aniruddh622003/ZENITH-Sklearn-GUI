import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a853d",
      grey: "#f0f0f0",
      darkGrey: "#aaa",
      red: "#ff0000",
      yellow: " #FFFACD",
      silver: "#C0C0C0",
      aqua: "#00FFFF",
      coral: "#E9967A",
      salmon: "#FFD700",
      green: " #7CFC00",
      blue: "	#FFFFF0",
      bg: "#eee",
      contrastThreshold: 1,
    },
    white: {
      main: "#fff",
      contrastText: "#3a853d",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
