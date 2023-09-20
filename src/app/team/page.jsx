"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Grid,
  Box,
} from "@mui/material";
import { teamDetails } from "./team";
import { TeamCard } from "@/components/TeamCard";

function Page() {
  return (
    <div style={{ paddingTop: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* First Flex Box */}
          <Container>
            <Typography
              style={{
                //   color: "blue",
                marginBottom: "1rem",
              }}
              color="textPrimary"
              gutterBottom
              variant="h2"
              align="center"
              // className={style.heading}
            >
              Hii, Meet Our Team
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
        <Grid item xs={6}>
          {/* Second Flex Box */}
          <Container>
            <Box
              sx={{
                backgroundColor: "primary.grey",
                padding: "1rem",
              }}
            >
              <Typography>Other content</Typography>
            </Box>
          </Container>
        </Grid>
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
    </div>
  );
}

export default Page;
