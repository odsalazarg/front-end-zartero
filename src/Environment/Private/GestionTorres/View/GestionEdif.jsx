import React from 'react'
import Grid from '@mui/material/Grid';
import { ListaTorres } from '../Modules/TorresList/View';
import { NuevaTorre } from '../Modules/NewTorre/View';
import { EditarTorre } from '../Modules/EditTorre/View';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function GestionEdif() {
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
                <div style={{margin:'0 5px',color:''}}>
                    <IconButton color="" style={{color:'#23282b'}}>
                        <ApartmentIcon/>
                    </IconButton>
                </div>
                GESTION TORRES
                
            </div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={6.2}>
                    <ListaTorres setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>
                
                <Grid item md={5.8}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevaTorre renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarTorre IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
                
            </Grid>
        </div>
        <br />
        
    </div>
  )
}

export default GestionEdif