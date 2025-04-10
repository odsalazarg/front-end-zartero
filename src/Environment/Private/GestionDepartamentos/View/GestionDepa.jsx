import React from 'react'
import Grid from '@mui/material/Grid';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { ListaDepa } from '../Modules/DepaList/View';
import { NuevoDepa } from '../Modules/NewDepa/View';
import { EditarDepa } from '../Modules/EditDepa/View';
import { useState } from 'react';
import { useEffect } from 'react';

function GestionDepa() {

    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)


  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'#23282b'}}>
                    <MapsHomeWorkIcon/>
                </div>
                GESTION DE APARTAMENTOS
            </div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={6.2}>
                    <ListaDepa setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>

                <Grid item md={5.8}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevoDepa renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarDepa IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
                
            </Grid>
        </div>
        <br /><br /><br />
        
    </div>
  )
}

export default GestionDepa