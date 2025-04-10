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
import { Select } from '../Select';
import { useEffect } from 'react';
import Contador from '../Contador/Contador'
import PlusOneIcon from '@mui/icons-material/PlusOne';

export default function MediaControlCard({renderizarLista,IdApto=false,setModal=false}) {
    const alerta=new Alert()
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Telefono2, setTelefono2] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [IdAla, setIdAla] = useState(IdApto?IdApto:0)
    const [Data, setData] = useState([])
    const [Tipo, setTipo] = useState(0)
    const [TpResidentes, setTpResidentes] = useState([{value:1,text:'Propietario'},{value:2,text:'Residente'},{value:3,text:'Prop-Res'}])
    const [ArrInquilinos, setArrInquilinos] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [Correo, setCorreo] = useState('')

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrInquilinos.length===paginaActual-1){
            if(Nombre!='' && Apellido!='' && Telefono!='' && IdAla!='' && Tipo!=0){
                console.log(Nombre)
                console.log(Apellido)
                console.log(Telefono)
                console.log(IdAla)
                const obj={
                    Nombre,
                    Apellido,
                    Telefono,
                    Telefono2,
                    IdAla,
                    Tipo,
                    Correo
                }
                let arr=ArrInquilinos
                console.log(arr)
                arr.push(obj)
                setArrInquilinos(arr)
                setNombre('')
                setApellido('')
                setTelefono('')
                setTelefono2('')
                setIdAla(IdApto?IdApto:'')
                setTipo('')
                setCorreo('')
                setPaginaActual(paginaActual+1)
            }
        }else{
            // alert('no se encuentra en la ultima pag')
            let ContadorTemporal=ArrInquilinos.length+1
            setPaginaActual(ContadorTemporal)
            if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!=''){
                ArrInquilinos[paginaActual-1].Nombre=Nombre
                ArrInquilinos[paginaActual-1].Apellido=Apellido
                ArrInquilinos[paginaActual-1].Telefono=Telefono
                ArrInquilinos[paginaActual-1].Telefono2=Telefono2
                ArrInquilinos[paginaActual-1].IdAla=IdAla
                ArrInquilinos[paginaActual-1].Tipo=Tipo
            }
            setNombre('')
            setApellido('')
            setTelefono('')
            setTelefono2('')
            setIdAla(IdApto?IdApto:'')
            setTipo('')
        }
    }

    const atrasContador=()=>{
        console.log(ArrInquilinos)
        console.log(paginaActual)
        console.log(ArrInquilinos[paginaActual-2])
        console.log(ArrInquilinos[paginaActual])
        
        if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!=''){
            ArrInquilinos[paginaActual-1].Nombre=Nombre
            ArrInquilinos[paginaActual-1].Apellido=Apellido
            ArrInquilinos[paginaActual-1].Telefono=Telefono
            ArrInquilinos[paginaActual-1].Telefono2=Telefono2
            ArrInquilinos[paginaActual-1].IdAla=IdAla
            ArrInquilinos[paginaActual-1].Tipo=Tipo
            ArrInquilinos[paginaActual-1].Correo=Correo
        }
        setNombre(ArrInquilinos[paginaActual-2].Nombre)
        setApellido(ArrInquilinos[paginaActual-2].Apellido)
        setTelefono(ArrInquilinos[paginaActual-2].Telefono)
        setTelefono2(ArrInquilinos[paginaActual-2].Telefono2)
        setIdAla(ArrInquilinos[paginaActual-2].IdAla)
        setTipo(ArrInquilinos[paginaActual-2].Tipo)
        setCorreo(ArrInquilinos[paginaActual-2].Correo)
        
        
    }

    const siguienteContador=()=>{
        console.log(ArrInquilinos)
        console.log(paginaActual)
        console.log(ArrInquilinos[paginaActual])
        if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!=''){
            ArrInquilinos[paginaActual-1].Nombre=Nombre
            ArrInquilinos[paginaActual-1].Apellido=Apellido
            ArrInquilinos[paginaActual-1].Telefono=Telefono
            ArrInquilinos[paginaActual-1].Telefono2=Telefono2
            ArrInquilinos[paginaActual-1].IdAla=IdAla
            ArrInquilinos[paginaActual-1].Tipo=Tipo
            ArrInquilinos[paginaActual-1].Correo=Correo
        }
        if(ArrInquilinos[paginaActual]===undefined){
            setNombre('')
            setApellido('')
            setTelefono('')
            setIdAla(IdApto?IdApto:'')
            setTelefono2('')
            setTipo('')
            setCorreo('')
        }else{
            console.log(paginaActual)    
            setNombre(ArrInquilinos[paginaActual].Nombre)
            setApellido(ArrInquilinos[paginaActual].Apellido)
            setTelefono(ArrInquilinos[paginaActual].Telefono)
            setIdAla(ArrInquilinos[paginaActual].IdAla)
            setTelefono2(ArrInquilinos[paginaActual].Telefono2)
            setTipo(ArrInquilinos[paginaActual].Tipo)
            setCorreo(ArrInquilinos[paginaActual].Correo)
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrInquilinos([])
    }

    const cancelarRegistro=()=>{
        setNombre('')
        setApellido('')
        setTelefono('')
        setIdAla(IdApto?IdApto:'')
        setTipo(0)
        setTelefono2('')
        setCorreo('')
        resetContador()
        if(setModal!=false){
            setModal(false)
        }
    }

    const QuerySelect=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Residentes-apartamentos', {
        })
        .then(function (response) {
            if(response.data.data.length>0){

                const res=response.data.data
                console.log(res)
                const arr=[]
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    const obj={
                        value:item.id,
                        text:item.numero
                    }
                    arr.push(obj)
                }
                console.log(arr)
    
                setData(arr)
            }
          })
          .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
          })
    }

    const CrearItem=()=>{
        // console.log('crear user front')
        console.log(Nombre)
        let arr=ArrInquilinos
        console.log(arr)
        if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!='' && Tipo!=''|| ArrInquilinos.length>0){
            // setLoadingState(true)
            if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!='' && Tipo!=''){
                const obj={
                    Nombre,
                    Apellido,
                    Telefono,
                    Telefono2,
                    Tipo,
                    IdAla,
                    Correo
                }
                arr.push(obj)
            }
            console.log(arr)
            axios.post('http://localhost:3000/Api/Residentes-Create', arr)
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
                //     setLoadingState(false)
                //     setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                //     }, 300);
                // }, 1000);
              }
        
              cancelarRegistro()
              resetContador()
              if(setModal!=false){
                setModal(false)
                }
        
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

    useEffect(() => {
        QuerySelect()
    }, [])
    

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
                        
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Apellido" variant="outlined" onChange={e=>{setApellido(e.target.value)}} value={Apellido}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={e=>{setTelefono(e.target.value)}} value={Telefono}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Telefono-2" variant="outlined" onChange={e=>{setTelefono2(e.target.value)}} value={Telefono2}/>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Select titulo={'Tipo'} data={TpResidentes} Value={Tipo} setValue={setTipo}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Select titulo={'Apartamento'} data={Data} Value={IdAla} setValue={setIdAla}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Correo" variant="outlined" onChange={e=>{setCorreo(e.target.value)}} value={Correo}/>
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
                                <Contador numContador={ArrInquilinos.length} paginaActual={paginaActual} setPaginaActual={setPaginaActual} atrasContador={atrasContador} siguienteContador={siguienteContador}/>
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