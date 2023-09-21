import Image from 'next/image'
import styles from './page.module.css'
import { Alert, AlertTitle, Box, Button, Drawer, Grid, List, ListItem, Typography } from '@mui/material'
import MediaCard from '@/components/MediaCard'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <Box sx={{
      maxHeight: '100vh',
      minHeight: '100%',
      // background: 'radial-gradient(circle, #ccfcec, #eafccc, #effabb)'
      // background: '#68E498',
      background: 'radial-gradient(circle, rgba(104,228,152,0.4), rgba(255,255,255,1))'
    }}>
      
      <Typography variant="h1" sx={{ textAlign: 'center', paddingTop:'10rem' }}>ZENiTH</Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>Drag n Drop Interactive ML Model Maker</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', paddingBottom: '14rem' }}>
        
        <Button variant="outlined" color="primary" sx={{ marginRight: '1rem' }}>Get Started</Button>
        <Button variant="outlined" color="primary" sx={{ marginRight: '1rem' }}>Button 2</Button>
        <Button variant="outlined" color="primary" sx={{ marginRight: '1rem' }}>Button 3</Button>
      
      </Box>
    </Box>
  )
}
