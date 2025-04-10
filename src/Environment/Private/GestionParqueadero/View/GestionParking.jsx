import React from 'react'
import Grid from '@mui/material/Grid';

import GarageIcon from '@mui/icons-material/Garage';
import { ListaParqueadero } from '../Modules/ParqueaderoList/View';
import { NuevoParqueadero } from '../Modules/NewParqueadero/View';
import { EditarParqueadero } from '../Modules/EditParqueadero/View';
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert } from '../../../../Components/Alerts/Alerts';
import { useSelector } from "react-redux"

function GestionParking() {
    const alerta=new Alert()
    const userState=useSelector((store)=>store.user);
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [RenderizarLista, setRenderizarLista] = useState(false)
    const [SwitchChecked, setSwitchChecked] = useState(false)
    const [RenderSwitch, setRenderSwitch] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [CUPO_TOTAL_CARRO, setCUPO_TOTAL_CARRO] = useState('')
    const [CUPO_TOTAL_MOTO, setCUPO_TOTAL_MOTO] = useState('')
    const [CUPO_POR_APARTAMENTO_CARRO, setCUPO_POR_APARTAMENTO_CARRO] = useState('')
    const [CUPO_POR_APARTAMENTO_MOTO, setCUPO_POR_APARTAMENTO_MOTO] = useState('')
    const [Bloqueo, setBloqueo] = useState(false)


    

    const SwitchVista=()=>{
        alert('check')
        console.log(userState)
        axios.post('http://localhost:3000/Api/Menu-Permisos', {
            IdUser:userState.id
        })
        .then(function (response) {
            console.log(response.data);
            console.log(response.data.data[0].tp_user)
            if(response.data.status===1){ 
                if(response.data.data[0].tp_user==1){
                    axios.post('http://localhost:3000/Api/Parqueaderos-TipoAlmacen-Update', {
                    })
                    .then(function (response) {
                        console.log(response.data);
                        if(response.data.status===1){
                            setrefresh(!refresh)
                        }else{
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        // alerta.ErrorSistem()
                        // alerta.Error()
                    })
                }else{
                    
                    alerta.Error({texto:'Sin permisos'})
                }
            
            }else{        
            }
    
    
        })
        .catch(function (error) {
            console.log(error);
            
        })
        
        
    }


    const queryEffect=()=>{
        // setRenderSwitch(false)
        axios.get('http://localhost:3000/Api/Parqueaderos-TipoAlmacen', {
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.status===1){
            // alert('Edicion exitosa!')
            console.log(response.data.data[0].id)
                if(response.data.data[0].id===1){
                    setSwitchChecked(false)
                }
                if(response.data.data[0].id===2){
                    setSwitchChecked(true)
                }
            }else{
                
            }
        })
        .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            // alerta.Error()
        })
    }

    // GESTION PARQUEADERO COMUNITARIO/PUBLICO
    const queryEffectComunitario=()=>{
        axios.get('http://localhost:3000/Api/Parqueaderos-Comunitario', {
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.status===1){
                setCUPO_TOTAL_CARRO(response.data.data[0].carros)
                setCUPO_TOTAL_MOTO(response.data.data[0].motos)
                setCUPO_POR_APARTAMENTO_CARRO(response.data.data[0].cupo_carros)
                setCUPO_POR_APARTAMENTO_MOTO(response.data.data[0].cupo_motos)
                
            }else{
                
            }
        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            // alerta.ErrorSistem()
            // alerta.Error()
        })
    }

    const guardarParqueaderoComunitario=()=>{
        axios.post('http://localhost:3000/Api/Parqueaderos-Comunitario-Update', {
            CUPO_TOTAL_CARRO:CUPO_TOTAL_CARRO,
            CUPO_TOTAL_MOTO:CUPO_TOTAL_MOTO,
            CUPO_POR_APARTAMENTO_CARRO:CUPO_POR_APARTAMENTO_CARRO,
            CUPO_POR_APARTAMENTO_MOTO:CUPO_POR_APARTAMENTO_MOTO
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.status===1){
                alerta.Success()
                
            }else{
                
            }
        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            // alerta.Error()
        })
    }


    const menusPermisos=()=>{
        console.log(userState)
        axios.post('http://localhost:3000/Api/Menu-Permisos', {
          IdUser:userState.id
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.data[0].tp_user)
          if(response.data.status===1){ 
              if(response.data.data[0].tp_user===2||response.data.data[0].tp_user===3){
                
                setBloqueo(true)

                }       
            // setMenus(arr)
          }else{ 

          }
    
    
        })
        .catch(function (error) {
          console.log(error);
          
        })
      }








    useEffect(() => {
      queryEffect()
      menusPermisos()
    }, [refresh])

    useEffect(() => {
        setRenderSwitch(false)
        if(SwitchChecked){
            queryEffectComunitario()
        }
        setTimeout(() => {
            setRenderSwitch(true)
        }, 0.1);
    }, [SwitchChecked])
    


  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            {
                Bloqueo?
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                    PARQUEADERO
                </div>
                :
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                    <div style={{margin:'0 5px',color:'#23282b'}}>
                        <HttpsIcon/>
                    </div>
                    PARQUEADEROS PRIVADOS
                    <div style={{margin:'0 5px',color:'grey'}}>
                        {
                            RenderSwitch?
                            <Switch color="default" style={{color:''}} defaultChecked={SwitchChecked} onClick={SwitchVista}/>:''
                        }
                    </div>
                    <div style={{margin:'0 5px',color:'#23282b'}}>
                        <GarageIcon/>
                    </div>
                    PARQUEADEROS COMUNITARIOS
                </div>
            }
            {
                !SwitchChecked?
                <Grid container spacing={2}>
                
                    {/* listado de usuarios */}
                    <Grid item md={6.2}>
                        <ListaParqueadero setIdEditGestion={setIdEditGestion} renderizarLista={RenderizarLista} setRenderizarLista={setRenderizarLista} IdEditGestion={IdEditGestion}/>
                    </Grid>

                    <Grid item md={5.8}>

                        {/* nuevo usuario */}
                        <Grid item md={12}>
                            <NuevoParqueadero renderizarLista={setRenderizarLista}/>
                        </Grid>

                        {/* editar usuario */}
                        <Grid item md={12}>
                            <EditarParqueadero IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>
                        </Grid>

                    </Grid>
                    
                    
                </Grid>
                :
                <Grid container spacing={1} style={{marginTop:'140px',marginBottom:'30px'}}>
                    
                    <Grid item md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{fontSize:'15px'}}>CUPO GENERAL PARA CARROS</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                            <TextField id="outlined-basic" label="" variant="outlined" style={{width:'80%'}} value={CUPO_TOTAL_CARRO} onChange={(e)=>setCUPO_TOTAL_CARRO(e.target.value)}/>
                        </div>
                    </Grid>
                    <Grid item md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{fontSize:'15px'}}>CUPO GENERAL PARA MOTOS</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                            <TextField id="outlined-basic" label="" variant="outlined" style={{width:'80%'}} value={CUPO_TOTAL_MOTO} onChange={(e)=>setCUPO_TOTAL_MOTO(e.target.value)}/>
                        </div>
                    </Grid>
                    <Grid item md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{fontSize:'15px'}}>CUPO DE CARROS POR APTO</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                            <TextField id="outlined-basic" label="" variant="outlined" style={{width:'80%'}} value={CUPO_POR_APARTAMENTO_CARRO} onChange={(e)=>setCUPO_POR_APARTAMENTO_CARRO(e.target.value)}/>
                        </div>
                    </Grid>
                    <Grid item md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{fontSize:'15px'}}>CUPO DE MOTOS POR APTO</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                            <TextField id="outlined-basic" label="" variant="outlined" style={{width:'80%'}} value={CUPO_POR_APARTAMENTO_MOTO} onChange={(e)=>setCUPO_POR_APARTAMENTO_MOTO(e.target.value)}/>
                        </div>
                    </Grid>
                    <Grid item md={12}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px 0'}}>
                            <Button variant="contained" onClick={guardarParqueaderoComunitario}>GUARDAR</Button>
                        </div>
                    </Grid>
                    
                    
                </Grid>
            }
        </div>
        <br /><br />
        
    </div>
  )
}

export default GestionParking