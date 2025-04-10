import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';


export default function BasicCard({Nombre,setIdDepa,IdDepa,id,setNombreDepa}) {

    const handleClick=()=>{
        // alert(id)
        setIdDepa(id)
        setNombreDepa(Nombre)
    }

  return (
    <Card onClick={()=>handleClick()} style={{backgroundColor:IdDepa==id?'#091435':'',cursor:'pointer'}}>
      <CardContent style={{padding:'0'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
            <ApartmentIcon style={{fontSize:'50px',color:IdDepa==id?'red':'red'}}/>
        </div>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
            <Typography variant="body2" style={{color:IdDepa==id?'red':'red',fontSize:'9px'}}>
                <b>{Nombre}</b>
            </Typography>
        </div>
      </CardContent>
      
    </Card>
  );
}