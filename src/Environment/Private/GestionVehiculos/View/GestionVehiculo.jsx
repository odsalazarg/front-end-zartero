import React from 'react'
import Grid from '@mui/material/Grid';
import { ListaVehiculo } from '../Modules/VehiculoList/View';
import { NuevoVehiculo } from '../Modules/NewVehiculo/View';
import { EditarVehiculo } from '../Modules/EditVehiculo/View';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useState } from 'react';
import { useEffect } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';


function GestionVehiculo() {
    
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)

    
  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'#23282b'}}>
                    <DirectionsCarFilledIcon/>
                </div>
                GESTION DE VEHICULOS</div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={6.2}>
                    <ListaVehiculo setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>
                
                
                <Grid item md={5.8}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevoVehiculo renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarVehiculo IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
            </Grid>
        </div>
        <br />
        
    </div>
  )
}

export default GestionVehiculo