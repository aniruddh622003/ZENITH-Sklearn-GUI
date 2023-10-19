import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
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
      bg_gradient: "radial-gradient(circle, rgba(104,228,152,0.4), rgba(255,255,255,1))",
      contrastThreshold: 1,
    },
    white: {
      main: "#fff",
      contrastText: "#3a853d",
    },
  },
  typography: {
    fontFamily: [
      roboto.style.fontFamily,
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
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
