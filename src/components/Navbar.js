import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { CatchingPokemon } from "@mui/icons-material"
import Image from "next/image"

const Navbar = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton size="large" edge='start' color="inherit" aria-label="logo">
                <Image
                src="/zenith_logo.drawio.svg"
                width={50}
                height={50}
                alt="logo" 
                />
            </IconButton>
            <Typography variant="h6" component='div' sx={{flexGrow : 1}}>
                ZENiTH
            </Typography>
            <Stack direction='row' spacing={2}>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Team</Button>
                <Button color="inherit">Log In</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar