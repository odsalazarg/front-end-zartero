import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';


export default function BasicCard({Nombre,setIdTorre,IdTorre,id,setIdDepa,setNombreTorre}) {

    const handleClick=()=>{
        // alert(id)
        setIdTorre(id)
        setNombreTorre(Nombre)
        setIdDepa(0)
    }

  return (
    <Card onClick={()=>handleClick()} style={{backgroundColor:IdTorre==id?'#091435':'',cursor:'pointer'}}>
      <CardContent style={{padding:'0'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
            <ApartmentIcon style={{fontSize:'50px',color:IdTorre==id?'red':'red'}}/>
        </div>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
            <Typography variant="body2" style={{color:IdTorre==id?'red':'red',fontSize:'9px'}}>
                <b>{Nombre}</b>
            </Typography>
        </div>
      </CardContent>
      
    </Card>
  );
}