import React from 'react'
import Grid from '@mui/material/Grid';
import { ListaUsuarios } from '../Modules/UserList/View';
import { NuevoUsuario } from '../Modules/NewUser/View';
import { EditarUsuario } from '../Modules/EditUser/View';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useState } from 'react';
import { useEffect } from 'react';


function GestionUser() {
    
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)

    
  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px',width:'100%'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'#23282b'}}>
                    <SupervisedUserCircleIcon/>
                </div>
                GESTION DE USUARIOS</div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                <Grid item md={5.2}>
                    <ListaUsuarios setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                </Grid>
                
                
                <Grid item md={5}>

                    {/* nuevo usuario */}
                    <Grid item md={12}>
                        <NuevoUsuario renderizarLista={setRenderizarLista}/>
                    </Grid>

                    {/* editar usuario */}
                    <Grid item md={12}>
                        <EditarUsuario IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                    </Grid>

                </Grid>
                
            </Grid>
        </div>
        <br />
        
    </div>
  )
}

export default GestionUser