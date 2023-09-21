"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Grid,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { teamDetails } from "./team";
import { TeamCard } from "@/components/TeamCard";
import { AiOutlineSwapLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <Box
      sx={{
        paddingTop: "2rem",
        backgroundColor: "primary.bg",
        minHeight: "100vh",
        pb: "100px",
      }}
    >
      <IconButton
        aria-label="delete"
        sx={{ ml: "50px", mb: "50px", fontSize: "20px", borderRadius: "20px" }}
        onClick={() => router.back()}
      >
        <AiOutlineSwapLeft style={{ marginRight: "10px" }} /> Back
      </IconButton>
      <Grid container spacing={2} rowSpacing={15}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          {/* First Flex Box */}
          <Container>
            <Typography
              style={{
                //   color: "blue",
                marginBottom: "1rem",
              }}
              gutterBottom
              variant="h2"
              align="center"
              // className={style.heading}
            >
              <b>MEET OUR TEAM</b>
            </Typography>
            <Box
              sx={{
                backgroundColor: "primary.main",
                height: "10px",
                width: "100%",
              }}
            />
          </Container>
        </Grid>
        <Grid item xs={5}>
          {/* Second Flex Box */}
          <Container>
            <Box
              sx={{
                // backgroundColor: "primary.yellow",
                padding: "1rem",
                pt: 0,
              }}
            >
              <Typography color="primary.darkGrey" fontSize="17px">
                Our team is making a{" "}
                <Typography
                  color="primary.main"
                  fontSize="20px"
                  component="span"
                  fontWeight="800"
                >
                  ZERO EFFORT NETWORK ITERATION AND TUNING HELPER.
                </Typography>{" "}
                It is basically a drag and drop interface for ML models, through
                which we'll eliminate extensive coding. We are aiming at{" "}
                <Typography
                  color="primary.main"
                  fontSize="20px"
                  component="span"
                  fontWeight="800"
                >
                  Empowering Beginners in Machine Learning
                </Typography>{" "}
                with practical and engaging learning experience.
              </Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {teamDetails.map((ele) => (
              <TeamCard member={ele} key={ele.sapid} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
}

export default Page;
