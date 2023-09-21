import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { SiMicrosoftoutlook } from "react-icons/si";
import Tooltip from "@mui/material/Tooltip";

export const TeamCard = ({ member }) => {
  return (
    <Grid item xs={3}>
      <Card style={{ backgroundColor: "white.main", overflow: "visible" }}>
        <Box sx={{ backgroundColor: "primary.main" }}>
          <img
            src={member.image}
            style={{
              width: "100%",
              height: "100%",
              scale: "0.75",
              translate: "0% -25%",
              boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.75)",
            }}
            alt={member.name}
          />
        </Box>
        <CardContent
          sx={{
            marginTop: "-30%",
            backgroundColor: "white.main",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            align="center"
            paddingBottom={1}
          >
            {member.name}
          </Typography>
          <Typography
            // variant="h7"
            component="div"
            align="center"
            paddingBottom={0.1}
            color="primary.main"
            fontWeight={550}
            fontSize={19}
          >
            {member.role}
          </Typography>
          <Typography variant="h7" component="div" align="center">
            {member.sapid}
          </Typography>
          <Typography variant="h7" component="div" align="center">
            {member.rollNo}
          </Typography>
          <Typography variant="h7" component="div" align="center">
            {member.spec}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Tooltip title={`Call ${member.phone}`}>
              <a href={`tel:${member.phone}`}>
                <Button
                  variant="outlined"
                  aria-label="Phone"
                  sx={{
                    // fontSize: "16px",
                    m: 0,
                    borderRadius: "50%",
                    p: "10px",
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  <BsTelephoneForwardFill style={{ fontSize: "16px" }} />
                </Button>
              </a>
            </Tooltip>
            <Tooltip title={`Mail ${member.email}`}>
              <a href={`mailto:${member.email}`}>
                <Button
                  variant="outlined"
                  aria-label="LinkedIn"
                  sx={{
                    // fontSize: "16px",
                    m: 0,
                    borderRadius: "50%",
                    p: "10px",
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  <SiMicrosoftoutlook style={{ fontSize: "16px" }} />
                </Button>
              </a>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
