"use client";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return pathname != "/team" ? (
    <AppBar position="fixed">
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Image
            src="/zenith_logo.drawio.svg"
            width={50}
            height={50}
            alt="logo"
          />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ZENiTH
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About Us</Button>
          {/* <Button color="inherit">Log In</Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  ) : (
    <div></div>
  );
};

export default Navbar;
