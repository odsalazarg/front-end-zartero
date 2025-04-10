import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({titulo,contenido}) {
  return (
    <Card >
      <CardContent>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'25px',margin:'20px 0'}}>
            {titulo}
        </div>
        {/* <br /> */}
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'50px',margin:'20px 0'}}>
            {contenido}
        </div>
      </CardContent>
      
    </Card>
  );
}