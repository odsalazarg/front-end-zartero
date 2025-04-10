import React from 'react'
import Grid from '@mui/material/Grid';
import { ListaAla } from '../Modules/AlaList/View';
import { NuevaAla } from '../Modules/NewAla/View';
import { EditarAla } from '../Modules/EditAla/View';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function GestionAla() {

    const navigate = useNavigate();
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)

    const handleNavigate=(url)=>{
        // alert(url)
        navigate(url);
    }

  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'grey'}}>
                    <IconButton  onClick={()=>handleNavigate('/private/GestionTorres')}>
                        <ApartmentIcon/>
                    </IconButton>
                </div>
                GESTION DE TORRES
                <div style={{margin:'0 5px',color:'grey'}}>
                    <Switch color='primary' defaultChecked sx={{'& .MuiSwitch-track': {backgroundColor: '#1976d2',},'& .MuiSwitch-thumb': {backgroundColor: '#1976d2',},}} onClick={()=>handleNavigate('/private/GestionTorres')}/>
                </div>
                <div style={{margin:'0 5px',color:'grey'}}>
                    <IconButton color="primary">
                        <AccountTreeIcon/>
                    </IconButton>
                </div>
                GESTION DE ALAS
            </div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={6.2}>
                    <ListaAla setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>

                <Grid item md={5.8}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevaAla renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarAla IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
                
                
                
            </Grid>
            
        </div>
        <br />
        
    </div>
  )
}

export default GestionAla