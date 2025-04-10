import React, { Fragment, useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card as CardList } from '../../../GestionInquilinos/Modules/InquilinoList/Components';
import { useState } from 'react';
import axios from 'axios';
import Dialog from './Modal'
import {default as NuevoResidente} from '../../../GestionInquilinos/Modules/NewInquilino/Components/Card/Card'
import {default as EditResidente} from '../../../GestionInquilinos/Modules/EditInquilino/Components/Card/Card'
import { Alert } from '../../../../../Components/Alerts/Alerts';
import {default as EditarContactos} from './EditarContactos'

function Contacto({IdApto}) {
    const alerta=new Alert()
    const [Data, setData] = useState([])
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [Modal, setModal] = useState(false)
    const [View, setView] = useState(<></>)
    const [Titulo, setTitulo] = useState('')
    const [renderizarLista, setRenderizarLista] = useState(false)
    const [DataTorre, setDataTorre] = useState([])
    const [MaxWidthModal, setMaxWidthModal] = useState(false)
    
    const DeleteTotal=()=>{
        console.log('queryefect LIST')
        
        // setLoadingState(true)
        axios.post('http://localhost:3000/Api/Residente-DeleteByApto', {
                IdApto:IdApto
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.status==1){
                    // setData(response.data.data)
                    alerta.Success()
                }else{
                    // setData([])
                    alerta.Error({texto:response.data.msg})
                }
                // setData([])
                setRenderizarLista(true)
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
    }

    const abrirModalEditarTotal=()=>{
        setView(<EditarContactos IdEditGestion={IdApto} setModal={setModal} renderizarLista={setRenderizarLista}/>)
        setMaxWidthModal(true)
        setTitulo('Editar Contactos')
        setModal(true)
    }

    const abrirModalEditar=(id)=>{
        // console.log(IdEditGestion)
        setView(<EditResidente IdEditGestion={id} setIdEditGestion={setIdEditGestion} setModal={setModal} renderizarLista={setRenderizarLista}/>)
        setMaxWidthModal(false)
        setTitulo('Editar Contacto')
        setModal(true)

    }

    const abrirModalCrear=()=>{
        setView(<NuevoResidente IdApto={IdApto} setModal={setModal} renderizarLista={setRenderizarLista}/>)
        setMaxWidthModal(false)
        setTitulo('Crear Contacto')
        setModal(true)

    }

    const queryNameApto=()=>{
        axios.post('http://localhost:3000/Api/Departamento-ById', {
            Id:IdApto
        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status==1){
                setDataTorre(response.data.data)
            }else{
                setDataTorre([])
            }
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        axios.post('http://localhost:3000/Api/Residente-ByIdApto', {
                IdApto:IdApto
            })
            .then(function (response) { 
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.status==1){
                    setData(response.data.data)
                }else{
                    setData([])
                }
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
    }

    

    useEffect(() => {
        
        queryEffect()
        queryNameApto()
    }, [])
    
    useEffect(() => {
        if(IdEditGestion!=0){
            console.log(IdEditGestion)
        }
    }, [IdEditGestion])

    useEffect(() => {
      if(renderizarLista!=false){
        setData([])
        queryEffect()
        setRenderizarLista(false)
      }
    }, [renderizarLista])
    




  return (
    <div>
        <Dialog open={Modal} setOpen={setModal} view={View} titulo={Titulo} maxWidth={MaxWidthModal}/>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
            <Grid container spacing={0}>
                <Grid item md={12} >
                    
                <Card key={2} style={{padding:'10px',margin:'20px 10px 50px 10px',backgroundColor:'lightgray'}}>
                    <Grid container spacing={0}>
                        <Grid item md={12} >
                            
                            <div style={{margin:'5px 10px 0 10px',fontSize:'25px',backgroundColor:'#FF3600',padding:'20px',borderRadius:'5px',color:'white'}}>
                                <Grid container spacing={0}>
                                    <Grid item md={7}>
                                        {
                                            DataTorre.length>0?
                                            <b>{DataTorre[0].depa_numero}</b>
                                            :
                                            <b>APARTAMENTO</b>
                                        }
                                    </Grid>
                                    <Grid item md={3}>
                                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <Button variant="contained" color='primary' onClick={abrirModalCrear} >
                                                crear contacto
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item md={1}>
                                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <Button variant="contained" color='success' onClick={abrirModalEditarTotal}>
                                                <BorderColorIcon/>
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item md={1}>
                                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <Button variant="contained" color='error' onClick={()=>alerta.Delete(()=>DeleteTotal())}>
                                                <DeleteIcon/>
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                
                            </div>
                        </Grid>
                        

                        
                        <Grid key={1} item md={12} style={{cursor:'pointer'}} >
                            {
                                Data.length>0?
                                    <Card  style={{padding:'10px',margin:'15px 10px'}}>
                                        <CardList titulos={[
                                        // { field: 'status', headerName: 'status' },
                                            { field: 'Apartamento', headerName: 'Apartamento' },
                                            { field: 'Nombre', headerName: 'Nombre' },
                                            { field: 'Apellido', headerName: 'Apellido' },
                                            { field: 'Correo', headerName: 'Correo' },
                                            // { field: 'Telefono-2', headerName: 'Telefono-2' },
                                            { field: 'Tipo', headerName: 'Tipo' },
                                            { field: 'Acciones', headerName: 'Acciones' },
                                        ]}
                                            data={Data}
                                            setIdEditList={setIdEditGestion}
                                            IdEditGestion={IdEditGestion}
                                            acciones={true}
                                            editAccion={abrirModalEditar}
                                            renderizarLista={setRenderizarLista}
                                        />
                                    </Card>
                                :
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    SIN RESULTADOS
                                </div>
                            }
                        </Grid>
                            
                        
                        
                    </Grid>
                </Card>
                    
                </Grid>
            </Grid>
        </div>



    </div>
  )
}

export default Contacto