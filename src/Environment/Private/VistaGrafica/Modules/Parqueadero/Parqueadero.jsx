import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Alert } from '../../../../../Components/Alerts/Alerts';
import { useState } from 'react';
import {default as Card} from '../../../GestionParqueadero/Modules/ParqueaderoList/Components/Card/Card'
import Button from '@mui/material/Button';
import {default as ModalJSX} from '../Contacto/Modal'
import TextField from '@mui/material/TextField';
import {default as NuevoParqueadero} from '../../../GestionParqueadero/Modules/NewParqueadero/Components/Card/Card'
import {default as EditParqueadero} from '../../../GestionParqueadero/Modules/EditParqueadero/Components/Card/Card' 
// import {default as ParqueaderoComunitario} from '../../../GestionParqueadero/'

function Parqueadero({IdApto}) {
    const alerta=new Alert()
    const [Data, setData] = useState([])
    const [IdEditGestion, setIdEditGestion] = useState(0)
    const [ModalView, setModalView] = useState(false)
    const [View, setView] = useState(<></>)
    const [RenderizarLista, setRenderizarLista] = useState(false)
    const [Titulo, setTitulo] = useState('')
    const [AlmacenPrivado, setAlmacenPrivado] = useState(true)
    const [CUPO_TOTAL_CARRO, setCUPO_TOTAL_CARRO] = useState('')
    const [CUPO_TOTAL_MOTO, setCUPO_TOTAL_MOTO] = useState('')
    const [CUPO_POR_APARTAMENTO_CARRO, setCUPO_POR_APARTAMENTO_CARRO] = useState('')
    const [CUPO_POR_APARTAMENTO_MOTO, setCUPO_POR_APARTAMENTO_MOTO] = useState('')

    const abrirModalEditar=(id)=>{
        // console.log(IdEditGestion)
        setView(<EditParqueadero IdEditGestion={id} setIdEditGestion={setIdEditGestion} setModal={setModalView} renderizarLista={setRenderizarLista}/>)
        // setMaxWidthModal(false)
        setTitulo('Editar Parqueadero')
        setModalView(true)

    }

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

    const queryParqueaderos=()=>{
        setData([])
        console.log(IdApto) 
        axios.post('http://localhost:3000/Api/Parqueadero-ByIdApto', {
            IdApto:IdApto 
        })
        .then(function (response) { 
        
            console.log(response.data);
            if(response.data.status==1){
                setData(response.data.data)
            }else{
                setData([])
            }
            
        
        })
        .catch(function (error) {
        console.log(error);
        
        })
    }

    const crearParqueadero=()=>{
        // alert('a')
        setView(<NuevoParqueadero IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={setRenderizarLista}/>)
        setTitulo('Crear Parqueadero')
        setModalView(true)
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
    



    const queryefect=()=>{
        axios.get('http://localhost:3000/Api/Parqueaderos-TipoAlmacen', {
        
        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            console.log(response.data.data[0].id)
            if(response.data.status==1){
                if(response.data.data[0].id===1){
                    // priv
                    queryParqueaderos()
                    setAlmacenPrivado(true)
                }
                if(response.data.data[0].id===2){
                    // comunitario
                    queryEffectComunitario()
                    setAlmacenPrivado(false)
                }
            }
            // setData(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
        
    }

    useEffect(() => {
        if(RenderizarLista){
            setModalView(false)
            queryefect()
            setRenderizarLista(false)
        }
      }, [RenderizarLista])
 
    useEffect(() => {
      
        queryefect()
     
    }, [])
    

  return (
    <div>
        {
            ModalView?
            <ModalJSX view={View} open={ModalView} setOpen={setModalView} titulo={Titulo}/>
            :''
        }
        {
            AlmacenPrivado?
            <div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                Lista de Parqueaderos
                </div>
                <div style={{display:'flex',justifyContent:'end',alignItems:'center',margin:'5px'}}>
                    <Button variant="contained" onClick={()=>{crearParqueadero()}}>crear</Button>
                </div>
                {
                    Data.length>0?
                        <Card titulos={[
                            // { field: 'status', headerName: 'status' },
                            { field: 'Numero', headerName: 'Numero' },
                            { field: 'Capacidad Autos', headerName: 'Capacidad Autos' },
                            { field: 'Capacidad Motos', headerName: 'Capacidad Motos' },
                            { field: 'Apartamento', headerName: 'Torre' },
                            { field: 'Apartamento', headerName: 'Apartamento' },
                            { field: 'Acciones', headerName: 'Acciones' },
                            // { field: 'id', headerName: 'id' },
                        ]}
                            data={Data}
                            setIdEditList={setIdEditGestion}
                            IdEditGestion={IdEditGestion}
                            acciones={true}
                            renderizarLista={setRenderizarLista}
                            editAccion={abrirModalEditar}
                        />
                    :''
                }
            </div>
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
  )
}

export default Parqueadero