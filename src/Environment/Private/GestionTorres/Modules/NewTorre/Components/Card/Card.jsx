import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { Loading } from '../../../../../../../Components/Loading';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import Contador from '../Contador/Contador'
import PlusOneIcon from '@mui/icons-material/PlusOne';

export default function MediaControlCard({renderizarLista}) {
    const alerta=new Alert()
    const [Nombre, setNombre] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [ArrTorres, setArrTorres] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);

    

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrTorres.length===paginaActual-1){
            if(Nombre!=''){
                console.log(Nombre)
                // console.log(Apellido)
                // console.log(Telefono)
                // console.log(Password)
                // console.log(Username)
                // console.log(Cedula)
                // console.log(IdAla)
                const obj={
                    Nombre,
                    
                    // IdAla
                }
                let arr=ArrTorres
                console.log(arr)
                arr.push(obj)
                setArrTorres(arr)
                setNombre('')
                // setApellido('')
                // setTelefono('')
                // setPassword('')
                // setCedula('')
                // setUsername('')
                // setIdAla('')
                setPaginaActual(paginaActual+1)
            }
        }else{
            let ContadorTemporal=ArrTorres.length+1
            setPaginaActual(ContadorTemporal)
            if(Nombre!=''){
                ArrTorres[paginaActual-1].Nombre=Nombre
            }
            setNombre('')
        }
    }

    const atrasContador=()=>{
        console.log(ArrTorres)
        console.log(paginaActual)
        console.log(ArrTorres[paginaActual-2])
        if(Nombre!=''){
            ArrTorres[paginaActual-1].Nombre=Nombre
        }
        setNombre(ArrTorres[paginaActual-2].Nombre) 
        // setApellido(ArrTorres[paginaActual-2].Apellido)
        // setTelefono(ArrTorres[paginaActual-2].Telefono)
        // setPassword(ArrTorres[paginaActual-2].Password)
        // setUsername(ArrTorres[paginaActual-2].Username)
        // setCedula(ArrTorres[paginaActual-2].Cedula)
        // setIdAla(ArrInquilinos[paginaActual-2].IdAla)
        
    }

    const siguienteContador=()=>{
        console.log(ArrTorres)
        console.log(paginaActual)
        console.log(ArrTorres[paginaActual])
        if(Nombre!=''){
            ArrTorres[paginaActual-1].Nombre=Nombre
        }
        
        if(ArrTorres[paginaActual]===undefined){
            setNombre('')
            // setApellido('')
            // setTelefono('')
            // setCedula('')
            // setPassword('')
            // setUsername('')
            // setIdAla('')
        }else{
            console.log(paginaActual)    
            setNombre(ArrTorres[paginaActual].Nombre)
            // setApellido(ArrTorres[paginaActual].Apellido)
            // setTelefono(ArrTorres[paginaActual].Telefono)
            // setPassword(ArrTorres[paginaActual].Password)
            // setUsername(ArrTorres[paginaActual].Username)
            // setCedula(ArrTorres[paginaActual].Cedula)
            // setIdAla(ArrUsers[paginaActual].IdAla)
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrTorres([])
    }

    const cancelarRegistro=()=>{
        setNombre('')
        resetContador()
    }

    const CrearItem=()=>{
        // console.log('crear user front')
        console.log(Nombre)
        
        if(Nombre!='' || ArrTorres.length>0){
            // setLoadingState(true)
            let arr=ArrTorres
            if(Nombre!=''){
                const obj={
                    Nombre
                }
                arr.push(obj)
            }
            axios.post('http://localhost:3000/Api/Torre-Create', arr)
            .then(function (response) {
              console.log(response.data);
              if(response.data.status===1){
                // alert('registro exitoso!')
                // setTimeout(() => {
                    renderizarLista(true)
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Success()
                    // }, 1300);
                // }, 1000);
              }else{
                // alert(response.data.msg)
                // setTimeout(() => {
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                    // }, 300);
                // }, 1000);
              }
        
              cancelarRegistro()
              resetContador()
        
            })
            .catch(function (error) {
              console.log(error);
              alerta.ErrorSistem()
            })
            
        }else{
            // alert('Campos Vacios')
            alerta.Error({texto:'Campos vacios'})
        }
        
    }

  const theme = useTheme();

  return (
    <>
        {
            LoadingState?
            <Loading/>
            :''
        }
        <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0',border:'2px solid green'}}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                        {/* <AddIcon style={{fontSize:'35px'}} color='success'/> */}
                        
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={2}>
                        
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                        </Grid>
                        
                        </Grid>
                        <br />
                        
                        
                        
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} style={{backgroundColor:'',paddingLeft:''}}>
                        <Grid item xs={2} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button variant="contained" onClick={anadir1Mas}><PlusOneIcon/></Button>
                            </div>

                        </Grid>
                        <Grid item xs={5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Contador numContador={ArrTorres.length} paginaActual={paginaActual} setPaginaActual={setPaginaActual} atrasContador={atrasContador} siguienteContador={siguienteContador}/>
                            </div>

                        </Grid>

                        <Grid item xs={2.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'',alignItems:'center'}}>
                                <Button variant="contained" style={{marginRight:'',backgroundColor:"grey"}} onClick={cancelarRegistro}>CANCELAR</Button>
                            </div>

                        </Grid>
                        

                        <Grid item xs={2.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained" color="success" onClick={CrearItem}>crear</Button>
                            </div>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        
        
        </Card>
    </>
  );
}