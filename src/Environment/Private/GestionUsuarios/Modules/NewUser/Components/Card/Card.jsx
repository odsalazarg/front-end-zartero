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
import { useSelector } from "react-redux"
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
import {default as Select} from '../Select/Select'
import { useEffect } from 'react';

export default function MediaControlCard({renderizarLista}) {
    const alerta=new Alert()
    const userState=useSelector((store)=>store.user);
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Cedula, setCedula] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [ArrUsers, setArrUsers] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [TpUsuario, setTpUsuario] = useState([{value:1,text:'Team Principal'},{value:3,text:'Intregador'},{value:2,text:'Admin'},{value:4,text:'Operario'}])
    const [IdTpUsuario, setIdTpUsuario] = useState(0)
    const [Correo, setCorreo] = useState('')
    const [BloqueoPermisos, setBloqueoPermisos] = useState(false)

    const cancelarRegistro=()=>{
        setUsername('')
        setPassword('')
        setNombre('')
        setApellido('')
        setCedula('')
        setTelefono('')
        setCorreo('')
        BloqueoPermisos?setIdTpUsuario(4):setIdTpUsuario(0)
        resetContador()
    }

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrUsers.length===paginaActual-1){
            if(Nombre!='' && Apellido!='' && Telefono!='' && Password!='' && Username!='' && Cedula!='' & IdTpUsuario!=0){
                console.log(Nombre)
                console.log(Apellido)
                console.log(Telefono)
                console.log(Password)
                console.log(Username)
                console.log(Cedula)
                // console.log(IdAla)
                const obj={
                    Nombre,
                    Apellido,
                    Telefono,
                    Password,
                    Username,
                    Cedula,
                    IdTpUsuario,
                    Correo
                    // IdAla
                }
                let arr=ArrUsers
                console.log(arr)
                arr.push(obj)
                setArrUsers(arr)
                setNombre('')
                setApellido('')
                setTelefono('')
                setPassword('')
                setCedula('')
                setCorreo('')
                BloqueoPermisos?setIdTpUsuario(4):setIdTpUsuario(0)
                setUsername('')
                // setIdAla('')
                setPaginaActual(paginaActual+1)
            }
        }else{
            // alert('no se encuentra en la ultima pag')
            // let ContadorTemporal=0
            let ContadorTemporal=ArrUsers.length+1
            setPaginaActual(ContadorTemporal)
            if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' && IdTpUsuario!=0){
                ArrUsers[paginaActual-1].Nombre=Nombre
                ArrUsers[paginaActual-1].Apellido=Apellido
                ArrUsers[paginaActual-1].Telefono=Telefono
                ArrUsers[paginaActual-1].Password=Password
                ArrUsers[paginaActual-1].Username=Username
                ArrUsers[paginaActual-1].Cedula=Cedula
                ArrUsers[paginaActual-1].Correo=Correo
                ArrUsers[paginaActual-1].IdTpUsuario=IdTpUsuario
            }
            setNombre('')
            setApellido('')
            setTelefono('')
            setPassword('')
            setCedula('')
            setUsername('')
            setCorreo('')
            BloqueoPermisos?setIdTpUsuario(4):setIdTpUsuario(0)
        }
    }

    const atrasContador=()=>{
        console.log(ArrUsers)
        console.log(paginaActual)
        console.log(ArrUsers[paginaActual-2])
        if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' &&IdTpUsuario!=0){
            ArrUsers[paginaActual-1].Nombre=Nombre
            ArrUsers[paginaActual-1].Apellido=Apellido
            ArrUsers[paginaActual-1].Telefono=Telefono
            ArrUsers[paginaActual-1].Password=Password
            ArrUsers[paginaActual-1].Username=Username
            ArrUsers[paginaActual-1].Cedula=Cedula
            ArrUsers[paginaActual-1].Correo=Correo
            ArrUsers[paginaActual-1].IdTpUsuario=IdTpUsuario
        }
        setNombre(ArrUsers[paginaActual-2].Nombre)
        setApellido(ArrUsers[paginaActual-2].Apellido)
        setTelefono(ArrUsers[paginaActual-2].Telefono)
        setPassword(ArrUsers[paginaActual-2].Password)
        setUsername(ArrUsers[paginaActual-2].Username)
        setCedula(ArrUsers[paginaActual-2].Cedula)
        setCorreo(ArrUsers[paginaActual-2].Correo)
        setIdTpUsuario(ArrUsers[paginaActual-2].IdTpUsuario)
        
        // setIdAla(ArrInquilinos[paginaActual-2].IdAla)
        
    }

    const siguienteContador=()=>{
        console.log(ArrUsers)
        // let arrCopia=ArrUsers
        console.log(Nombre)
        console.log(Apellido)
        console.log(Telefono)
        console.log(Password)
        console.log(Username)
        console.log(Cedula)
        // console.log(arrCopia[paginaActual-1])
        if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' && IdTpUsuario!=0){
            ArrUsers[paginaActual-1].Nombre=Nombre
            ArrUsers[paginaActual-1].Apellido=Apellido
            ArrUsers[paginaActual-1].Telefono=Telefono
            ArrUsers[paginaActual-1].Password=Password
            ArrUsers[paginaActual-1].Username=Username
            ArrUsers[paginaActual-1].Cedula=Cedula
            ArrUsers[paginaActual-1].Correo=Correo
            ArrUsers[paginaActual-1].IdTpUsuario=IdTpUsuario
        }
        // console.log(arrCopia[paginaActual-1])
        console.log(ArrUsers[paginaActual-1])
        console.log(paginaActual)
        console.log(ArrUsers[paginaActual])
        if(ArrUsers[paginaActual]===undefined){
            setNombre('')
            setApellido('')
            setTelefono('')
            setCedula('')
            setPassword('')
            setUsername('')
            setCorreo('')
            BloqueoPermisos?setIdTpUsuario(4):setIdTpUsuario(0)
            // setIdAla('')
        }else{
            console.log(paginaActual)    
            setNombre(ArrUsers[paginaActual].Nombre)
            setApellido(ArrUsers[paginaActual].Apellido)
            setTelefono(ArrUsers[paginaActual].Telefono)
            setPassword(ArrUsers[paginaActual].Password)
            setUsername(ArrUsers[paginaActual].Username)
            setCedula(ArrUsers[paginaActual].Cedula)
            setCorreo(ArrUsers[paginaActual].Correo)
            setIdTpUsuario(ArrUsers[paginaActual].IdTpUsuario)
            // setIdAla(ArrUsers[paginaActual].IdAla)
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrUsers([])
    }

    const CrearUser=()=>{
        // console.log('crear user front')
        console.log(Username)
        console.log(Password)
        console.log(Nombre)
        console.log(Apellido)
        console.log(Cedula)
        console.log(Telefono)
        let arr=ArrUsers
        console.log(arr)
        if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' && IdTpUsuario!=0|| ArrUsers.length>0){
            // setLoadingState(true)
           if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' && IdTpUsuario!=0){
               const obj={
                   Nombre,
                   Apellido,
                   Telefono,
                   Username,
                   Password,
                   Cedula,
                   Correo,
                   IdTpUsuario
               }
               arr.push(obj)
           }
           axios.post('http://localhost:3000/Api/User-Create', arr)
           .then(function (response) {
             console.log(response.data);
             if(response.data.status===1){
               // alert('registro exitoso!')
               
               renderizarLista(true)
               alerta.Success()
               // setLoadingState(false)
                   
               
             }else{
               
               // setLoadingState(false)
               
               alerta.Error({texto:response.data.msg})
                   
               
             }
       
             cancelarRegistro()
             resetContador()
       
           })
           .catch(function (error) {
             console.log(error);
             alerta.ErrorSistem()
           })
       }
       else{
           // alert('Campos Vacios')
           alerta.Error({texto:'Campos vacios'})
       }
        
        
    }

    const CambiarTpUser=(val)=>{
        if(IdTpUsuario!=2){
            setCorreo('')
            console.log(ArrUsers)

            // setCorreo(ArrUsers[paginaActual].Correo)
        }
        setIdTpUsuario(val)
    }

    const Permisos=()=>{
        console.log(userState)
        axios.post('http://localhost:3000/Api/Menu-Permisos', {
            IdUser:userState.id
        })
        .then(function (response) {
            console.log(response.data);
            console.log(response.data.data[0].tp_user)
            if(response.data.status===1){ 
                if(response.data.data[0].tp_user==2||response.data.data[0].tp_user==3){
                    setTpUsuario([{value:4,text:'Operario'}])
                    setBloqueoPermisos(true)
                    setIdTpUsuario(4)
                }
            
            }else{        
            }
    
    
        })
        .catch(function (error) {
            console.log(error);
            
        })
    }

    
    useEffect(() => {
        Permisos()
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
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=>{setUsername(e.target.value)}} value={Username}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Password"  variant="outlined" onChange={e=>{setPassword(e.target.value)}} value={Password}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Cedula" variant="outlined" onChange={e=>{setCedula(e.target.value)}} value={Cedula}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Apellido" variant="outlined" onChange={e=>{setApellido(e.target.value)}} value={Apellido}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={e=>{setTelefono(e.target.value)}} value={Telefono}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Select titulo={'Tipo'} data={TpUsuario} Value={IdTpUsuario} setValue={CambiarTpUser}/>
                        </Grid>
                        {
                            IdTpUsuario===2?
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Correo" variant="outlined" onChange={e=>{setCorreo(e.target.value)}} value={Correo}/>
                                </Grid>
                            :''
                        }
                        
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
                                <Contador numContador={ArrUsers.length} paginaActual={paginaActual} setPaginaActual={setPaginaActual} atrasContador={atrasContador} siguienteContador={siguienteContador}/>
                            </div>

                        </Grid>

                        <Grid item xs={2.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'',alignItems:'center'}}>
                                <Button variant="contained" style={{marginRight:'',backgroundColor:"grey"}} onClick={cancelarRegistro}>CANCELAR</Button>
                            </div>

                        </Grid>
                        

                        <Grid item xs={2.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained" color="success" onClick={CrearUser}>crear</Button>
                            </div>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        
        
        </Card>
    </>
  );
}