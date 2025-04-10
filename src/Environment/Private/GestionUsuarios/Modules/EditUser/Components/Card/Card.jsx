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
import EditNoteIcon from '@mui/icons-material/EditNote';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { BorrarUser } from '../../../DeleteUser/view';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../../Components/Loading';
import {default as Select} from '../Select/Select'
export default function MediaControlCard({IdEditGestion,setIdEditGestion,renderizarLista}) {
    const alerta=new Alert()
     const [LoadingState, setLoadingState] = useState(false)
     const userState=useSelector((store)=>store.user);
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Cedula, setCedula] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Id, setId] = useState('')
    const [TpUsuario, setTpUsuario] = useState([{value:1,text:'Team Principal'},{value:2,text:'Admin'},{value:3,text:'Integrador'},{value:4,text:'Operario'}])
    const [IdTpUsuario, setIdTpUsuario] = useState(0)
    const [Correo, setCorreo] = useState('')
    const [BloqueoPermisos, setBloqueoPermisos] = useState(false)

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



    const cancelarEdit=()=>{
        // console.log('cancelar')
        // console.log(setIdEditGestion)
        setIdEditGestion(0)
    }
    const CambiarTpUser=(val)=>{
        // console.log(val)
        if(IdTpUsuario!=2){
            setCorreo('')
            // console.log(ArrUsers)

            // setCorreo(ArrUsers[paginaActual].Correo)
        }
        setIdTpUsuario(val)
    }
    const guardarUsuario=()=>{
        console.log('guardar')
        console.log(Username)
        console.log(Password)
        console.log(Nombre)
        console.log(Apellido)
        console.log(Cedula)
        console.log(Telefono)
        if(Username!="" && Password!='' && Nombre!='' && Apellido!='' && Cedula!='' && Telefono!='' && IdTpUsuario!=0){
            // setLoadingState(true)
            axios.post('http://localhost:3000/Api/User-Edit', {
                Username: Username,
                Password: Password,
                Nombre:Nombre,
                Apellido:Apellido,
                Cedula:Cedula,
                Telefono:Telefono,
                Id:Id,
                Correo:Correo,
                IdTpUsuario:IdTpUsuario
            })
            .then(function (response) {
                console.log(response.data);
                if(response.data.status===1){
                // alert('Edicion exitosa!')
                
                    renderizarLista(true)
                    setIdEditGestion(0)
                    alerta.Success()
                    
                }else{
                    
                    alerta.Error({texto:response.data.msg})
                        
                }
            })
            .catch(function (error) {
                console.log(error);
                alerta.ErrorSistem()
                // alerta.Error()
            })
        }else{
            // alert('Campos Vacios')
            alerta.Error({texto:'Campos vacios'})
        }
    }
    
    const queryEffect=async(id)=>{
        axios.post('http://localhost:3000/Api/User-ById', {
            Id: id,
        })
        .then(function (response) {
            console.log(response.data);
            // setUsers(response.data.users) 
            // setData(response.data.users)
            console.log(response.data.data[0].tp_user)
            setUsername(response.data.data[0].username)
            setPassword(response.data.data[0].password)
            setNombre(response.data.data[0].nombre)
            setApellido(response.data.data[0].apellido)
            setCedula(response.data.data[0].cedula)
            setTelefono(response.data.data[0].telefono)
            setId(response.data.data[0].id)
            setCorreo(response.data.data[0].correo)
            setIdTpUsuario(response.data.data[0].tp_user)
           
        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
        })
    }

    useEffect(() => {
        if(IdEditGestion!=0){
            Permisos()
            queryEffect(IdEditGestion)
        }
    }, [IdEditGestion])
    

  const theme = useTheme();

  return (
    <>
        {
            LoadingState?
            <Loading/>
            :''
        }
        {
            IdEditGestion!=0?
            <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0px',border:'2px solid #1976d2'}}>
                <Grid container spacing={0} style={{backgroundColor:''}}>
                    <Grid item xs={2} >
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            {/* <EditNoteIcon style={{fontSize:'35px',color:'#1976d2'}}/> */}
                            
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
                    <Grid container spacing={0} style={{backgroundColor:'',paddingLeft:'20px'}}>
                        <Grid item xs={1.5} style={{backgroundColor:''}}></Grid>
                        <Grid item xs={4.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'initial',alignItems:'center'}}>
                                <Button variant="contained" style={{marginRight:'',backgroundColor:"grey"}} onClick={cancelarEdit}>CANCELAR</Button>
                            </div>

                        </Grid>
                        <Grid item xs={4} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained"  style={{marginRight:''}} onClick={guardarUsuario}>GUARDAR</Button>
                            </div>

                        </Grid>
                        <Grid item xs={2} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <BorrarUser Id={Id} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
                                
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            
            
            </Card>:
            <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0',border:'2px solid #1976d2'}}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            {/* <EditNoteIcon style={{fontSize:'35px',color:'#1976d2'}}/> */}
                            
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                                SELECCIONE UN ITEM
                            </div>
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            
            
            </Card>
            
        }
    </>
  );
}