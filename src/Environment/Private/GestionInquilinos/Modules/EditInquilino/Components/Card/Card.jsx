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
import { useEffect } from 'react';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { BorrarInquilino } from '../../../DeleteInquilino';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../../Components/Loading';
import { Select } from '../../../NewInquilino/Components/Select';

export default function MediaControlCard({IdEditGestion,setIdEditGestion,renderizarLista,setModal=false}) {
    const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Telefono2, setTelefono2] = useState('')
    const [Data, setData] = useState([])
    const [IdAla, setIdAla] = useState('')
    const [Tipo, setTipo] = useState(0)
    const [TpResidentes, setTpResidentes] = useState([{value:1,text:'Propietario'},{value:2,text:'Residente'},{value:3,text:'Prop-Res'}])
    const [Id, setId] = useState('')
    const [Correo, setCorreo] = useState('')


    
    const cancelarEdit=()=>{
        // console.log('cancelar')
        // console.log(setIdEditGestion)
        setIdEditGestion(0)
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


    const guardarItem=()=>{
        console.log('guardar')
        
        console.log(Nombre)
        console.log(Correo)
        
        if(Nombre!='' && IdAla!='' && Apellido!='' && Telefono!=''){
            // setLoadingState(true)
            axios.post('http://localhost:3000/Api/Residente-Edit', {
                Nombre:Nombre,
                Apellido:Apellido,
                Telefono:Telefono,
                Telefono2:Telefono2,
                Tipo:Tipo,
                Id:Id,
                IdApartamento:IdAla,
                Correo:Correo

            })
            .then(function (response) {
                console.log(response.data);
                if(response.data.status===1){
                // alert('Edicion exitosa!')
                // setTimeout(() => {
                    renderizarLista(true)
                    setIdEditGestion(0)
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Success()
                    // }, 1300);
                // }, 1000);
                }else{
                    // setTimeout(() => {
                        // setLoadingState(false)
                        // setTimeout(() => {
                            alerta.Error({texto:response.data.msg})
                        // }, 300);
                    // }, 1000);
                }
                if(setModal){
                    setModal(false)   
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
        console.log(id)
        axios.post('http://localhost:3000/Api/Residente-ById', {
            Id: id,
        })
        .then(function (response) {
            console.log(response.data.data);
            // setUsers(response.data.users)
            // setData(response.data.users)
            // console.log(response.data.users[0].username)
            setNombre(response.data.data[0].nombre)
            setApellido(response.data.data[0].apellido)
            setTelefono(response.data.data[0].telefono)
            setId(response.data.data[0].id)
            setIdAla(response.data.data[0].id_apartamento)
            setTipo(response.data.data[0].tipo_residente)
            setTelefono2(response.data.data[0].telefono2)
            setCorreo(response.data.data[0].correo)
        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
        })
    }

    useEffect(() => {
        
        if(IdEditGestion!=0){
            queryEffect(IdEditGestion)
        }
    }, [IdEditGestion])


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
        {
            IdEditGestion!=0?
            <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0px',border:'2px solid #1976d2'}}>
                <Grid container spacing={0} style={{backgroundColor:''}}>
                    <Grid item xs={2} >
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <EditNoteIcon style={{fontSize:'35px',color:'#1976d2'}}/>
                            
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
                                    <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={e=>{setTelefono2(e.target.value)}} value={Telefono2}/>
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
                    <Grid container spacing={0} style={{backgroundColor:'',paddingLeft:'20px'}}>
                        <Grid item xs={1.5} style={{backgroundColor:''}}></Grid>
                        <Grid item xs={4.5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'initial',alignItems:'center'}}>
                                <Button variant="contained" style={{marginRight:'',backgroundColor:"grey"}} onClick={cancelarEdit}>CANCELAR</Button>
                            </div>

                        </Grid>
                        <Grid item xs={4} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained"  style={{marginRight:''}} onClick={guardarItem}>GUARDAR</Button>
                            </div>

                        </Grid>
                        <Grid item xs={2} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <BorrarInquilino Id={Id} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
                                
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            
            
            </Card>:
            <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0',border:'2px solid #1976d2'}}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <EditNoteIcon style={{fontSize:'35px',color:'#1976d2'}}/>
                            
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