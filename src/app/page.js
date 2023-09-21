import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        maxHeight: "100vh",
        minHeight: "100vh",
        background:
          "radial-gradient(circle, rgba(104,228,152,0.4), rgba(255,255,255,1))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{ textAlign: "center", paddingTop: "10rem" }}
        >
          ZENiTH
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          Drag n Drop Interactive ML Model Maker
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
            paddingBottom: "14rem",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            // sx={{ marginRight: "1rem" }}
          >
            Get Started
          </Button>
          {/* <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: "1rem" }}
          >
            Button 2
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: "1rem" }}
          >
            Button 3
          </Button> */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
