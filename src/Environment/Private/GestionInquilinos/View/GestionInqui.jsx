import React from 'react'
import Grid from '@mui/material/Grid';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import { ListaInquilino } from '../Modules/InquilinoList/View';
import { NuevoInquilino } from '../Modules/NewInquilino/View';
import { EditarInquilino } from '../Modules/EditInquilino/View';
import { useState } from 'react';
import { useEffect } from 'react';

function GestionInqui() {
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)

  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'#23282b'}}>
                    <Diversity3Icon/>
                </div>
                GESTION DE RESIDENTES
            </div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={6.2}>
                    <ListaInquilino setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>

                <Grid item md={5.8}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevoInquilino renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarInquilino IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
                
            </Grid>
        </div>
        <br /><br />
        <br /><br />
        
    </div>
  )
}

export default GestionInqui