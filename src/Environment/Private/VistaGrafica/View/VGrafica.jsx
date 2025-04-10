import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListaTorres from '../Modules/ListaDeTorres/ListaTorres';
import ListaApto from '../Modules/ListaApto/ListaApto';
import Contacto from '../Modules/Contacto/Contacto';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import{default as ListaParqueadero} from '../Modules/Parqueadero/Parqueadero'
import {default as ListVehiculo} from '../../GestionVehiculos/Modules/VehiculoList/View/ListaVehiculo'
import Dialog from './Modal'
import {NuevoVehiculo} from '../../GestionVehiculos/Modules/NewVehiculo/View'
import {EditarVehiculo} from '../../GestionVehiculos/Modules/EditVehiculo/View'


function VGrafica() {

    const [IdTorre, setIdTorre] = useState(0)
    const [Vista, setVista] = useState(1)
    const [ViewTorre, setViewTorre] = useState(false)
    const [ViewApto, setViewApto] = useState(false)
    const [ViewContactos, setViewContactos] = useState(false)
    const [ViewParqueadero, setViewParqueadero] = useState(false)
    const [IdApto, setIdApto] = useState(0)
    const [DataApto, setDataApto] = useState([])
    const [renderizarLista, setRenderizarLista] = useState(false)
    const [Modal, setModal] = useState(false)
    const [View, setView] = useState(<></>)
    const [Titulo, setTitulo] = useState('')
    const [MaxWidthModal, setMaxWidthModal] = useState(false)

    const queryApto=()=>{
        console.log('queryefect LIST')
                // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Departamentos-Contactos', {
                
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data.data);
                let arr=[]
                if(response.data.status==1){
                    for (let i = 0; i < response.data.data.length; i++) {
                        const item = response.data.data[i];
                        const result = arr.filter((word) => word.IdApto=== item.depa_id);
                        if(result.length===0){
                            const obj={
                                IdApto:item.depa_id
                            }
                            arr.push(obj)
                        }
                        
                    }

                    setDataApto(arr)
                    setViewApto(false)
                    setViewContactos(true)
                    setViewTorre(false)
                }else{
                    setDataApto([])
                    setViewContactos(true)
                }
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
    }

    const RenderizarVista=()=>{
        switch (Vista) {
            // torres
            case 1:
                // alert('torres')
                setViewApto(false)
                setViewContactos(false)
                setViewTorre(true)
                setViewParqueadero(false)
                setIdApto(0)
            break;

            // apartamentos
            case 2:
                // alert('apartamentos')
                setViewApto(true)
                setViewContactos(false)
                setViewTorre(false)
                setViewParqueadero(false)
                setIdApto(0)
            break;

            // contactos
            case 3:
                // alert('contactos')
                if(IdApto!=0){
                    setDataApto([])
                    setViewApto(false)
                    setViewContactos(true)
                    setViewTorre(false)
                    setViewParqueadero(false)
                }else{ 
                    setViewApto(false)
                    setViewTorre(false)
                    setViewParqueadero(false)
                    queryApto()                
                }
                console.log(IdApto)
                
            break;

            case 4:
                // alert('contactos')
                
                    setDataApto([])
                    setViewApto(false)
                    setViewContactos(false)
                    setViewTorre(false)
                    setViewParqueadero(true)
                
                    // queryApto()                
                
                console.log(IdApto)
                
            break;
        }
    }

    const abrirModalCrear=()=>{
        setView(<NuevoVehiculo IdTorreVG={IdTorre} IdAptoVG={IdApto} setModal={setModal} renderizarLista={setRenderizarLista}/>)
        setMaxWidthModal(false)
        setTitulo('')
        setModal(true)

    }

    const abrirModalEditarTotal=(id)=>{
        console.log(id)
        setView(<EditarVehiculo IdEditGestion={id} setModal={setModal} renderizarLista={setRenderizarLista}/>)
        setMaxWidthModal(true)
        setTitulo('')
        setModal(true)
    }


    useEffect(() => {
        RenderizarVista()
    }, [Vista])
    


  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>

            <div style={{display:'flex',justifyContent:'end',alignItems:'center',margin:'10px 0'}}>
                <span style={{margin:'0 5px',color:Vista==1?'blue':'',cursor:'pointer'}} onClick={()=>{setVista(1);setIdTorre(0)}}>
                    TORRES
                </span>
                <span >
                    <b>/</b>
                </span>
                <span style={{margin:'0 5px',color:Vista==2?'blue':'',cursor:'pointer'}} onClick={()=>{setVista(2);setIdTorre(0)}}>
                    APARTAMENTOS
                </span>
                <span>
                    <b>/</b>
                </span>
                <span style={{margin:'0 5px',color:Vista==3?'blue':'',cursor:'pointer'}} onClick={()=>{setVista(3)}}>
                    CONTACTOS
                </span>
                <span>
                    <b>/</b>
                </span>
                <span style={{margin:'0 5px',color:Vista==4?'blue':'',cursor:'pointer'}} onClick={()=>{setVista(4),setIdApto(0)}}>
                    PARQUEADEROS
                </span>

            </div>
            <div style={{display:'flex',justifyContent:'end',alignItems:'center',margin:'20px 0'}}>
                <Button variant="contained" onClick={()=>{{if(Vista!=1){setVista(Vista-1)}}}}>volver</Button>

            </div>
            <Grid container spacing={2}>
                
                {/* listado de usuarios */}
                {
                    ViewTorre?
                    <Grid item md={12}>
                        <ListaTorres setIdTorre={setIdTorre} setVista={setVista}/>
                    </Grid>
                    :''
                }
                
                {
                    ViewApto?
                    <Grid item md={12}>
                        
                        <ListaApto IdTorre={IdTorre} setVista={setVista} setIdApto={setIdApto}/>
                    </Grid>
                    :''
                }
                {
                    ViewContactos?
                    <Grid item md={12}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                            <div style={{margin:'0 5px',color:''}}>
                                CONTACTOS
                            </div>
                            
                            
                        </div>
                        {
                            DataApto.length>0?
                                DataApto.map((child)=>
                                    <Contacto IdApto={child.IdApto} setVista={setVista}/>
                                )
                            :
                            <Contacto IdApto={IdApto} setVista={setVista}/>
                        }
                        
                    </Grid>
                    :''
                }
                {
                    ViewParqueadero?
                    <Grid item md={12}>
                        <Grid container spacing={2}>
                            <Grid item md={10}>
                            </Grid>
                            <Grid item md={2} style={{margin:'10px 0'}}>
                                <Button variant='contained' onClick={abrirModalCrear}>
                                    crear
                                </Button>
                            </Grid>
                        </Grid>
                        <Dialog open={Modal} setOpen={setModal} view={View} titulo={Titulo} maxWidth={MaxWidthModal}/>
                        <ListVehiculo IdTorre={IdTorre} setVista={setVista} setIdApto={setIdApto} IdApto={IdApto} setRenderizarLista={setRenderizarLista} renderizarLista={renderizarLista} editarAccion={abrirModalEditarTotal}
                        />
                    </Grid>
                    :''
                }
                
                
            </Grid>
        </div>
        <br />
        
    </div>
  )
}

export default VGrafica
