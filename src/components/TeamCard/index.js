// import React from "react";

// const TeamCard = ({ member }) => {
//   return <div>{member.name}</div>;
// };

// export default TeamCard;

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export const TeamCard = ({ member }) => {
  return (
    <Grid item xs={3}>
      <Card>
        <img
          src={"/img.jpg"}
          style={{ width: "100%", height: "auto" }}
          alt={member.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {member.name}
          </Typography>
          <Typography variant="body2">{member.sapid}</Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Grid>
  );
};
