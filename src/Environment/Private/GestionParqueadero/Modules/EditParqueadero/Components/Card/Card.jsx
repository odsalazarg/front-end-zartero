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
import { BorrarParqueadero } from '../../../DeleteParqueadero';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../../Components/Loading';
import { Select } from '../../../NewParqueadero/Components/Select';
import Checkbox from '@mui/material/Checkbox';

export default function MediaControlCard({IdEditGestion,setIdEditGestion,renderizarLista,setModal=false}) {
    const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Nombre, setNombre] = useState('')
    const [Autos, setAutos] = useState('')
    const [Motos, setMotos] = useState('')
    const [Data, setData] = useState([])
    const [IdAla, setIdAla] = useState('')
    const [Id, setId] = useState('')
    const [checkCarro, setcheckCarro] = useState(false)
    const [checkMoto, setcheckMoto] = useState(false)
    const [IdTorre, setIdTorre] = useState(0)
    const [TorreSelect, setTorreSelect] = useState([])
    const [IdApto, setIdApto] = useState(0)
    const [AptoSelect, setAptoSelect] = useState([])

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
        axios.get('http://localhost:3000/Api/Parqueaderos-apartamentos', {
        })
        .then(function (response) {
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
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
    }


    const SeleccionarCarro=()=>{
        // alert(true)
        setAutos('1')
        setMotos('0')
        setcheckCarro(true)
        setcheckMoto(false)
    }
    const SeleccionarMoto=()=>{
        setMotos('1')
        setAutos('0')
        setcheckCarro(false)
        setcheckMoto(true)
    }


    const guardarItem=()=>{
        console.log('guardar')
        
        console.log(Nombre)
        console.log(IdApto)
        console.log(Autos)
        console.log(Motos)
        
        if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!==''){
            // setLoadingState(true)
            axios.post('http://localhost:3000/Api/Parqueaderos-Edit', {
                Nombre:Nombre,
                Autos:Autos,
                Motos:Motos,
                Id:Id,
                IdApartamento:IdApto
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
                    //     }, 300);
                    // }, 1000);
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
        axios.post('http://localhost:3000/Api/Parqueaderos-ById', {
            Id: id,
        })
        .then(function (response) {
            console.log(response.data.data);
            // setUsers(response.data.users)
            // setData(response.data.users)
            // console.log(response.data.users[0].username)
            setNombre(response.data.data[0].numero)
            setAutos(response.data.data[0].num_carros)
            setMotos(response.data.data[0].num_motos)
            setId(response.data.data[0].id)
            setIdApto(response.data.data[0].apartamento_id)
            setIdTorre(response.data.data[0].id_torre)
            if(response.data.data[0].num_carros===1){
                setcheckCarro(true)
                setcheckMoto(false)
            }
            if(response.data.data[0].num_motos===1){
                setcheckMoto(true)
                setcheckCarro(false)
            }

        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
        })
    }


    const buscarTorres=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Torres', {
        })
        .then(function (response) {
            if(response.data.status===1){

                const res=response.data.data
                console.log(res)
                const arr=[]
                for (let i = 0; i < res.length; i++) {
                    const item = res[i];
                    const obj={
                        value:item.id,
                        text:item.nombre
                    }
                    arr.push(obj)
                }
                console.log(arr)
    
                setTorreSelect(arr)
            }
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
    }
    
    const getApto=()=>{
        axios.post('http://localhost:3000/Api/Departamentos-ByTorre', {
            id:IdTorre
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
                setAptoSelect([])
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg,confirmar:true})
                // restartPropietario()
                let arr=[]
                console.log(response.data.data)
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={
                        value:item.a_id,
                        text:item.a_numero
                    }
                    arr.push(obj)
                    // setTorresSelect
                    
                }
                setAptoSelect(arr)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }





    useEffect(() => {
        
        if(IdEditGestion!=0){
            queryEffect(IdEditGestion)
        }
    }, [IdEditGestion])


    useEffect(() => {
        buscarTorres()
        
    }, [])

    useEffect(() => {
        if(IdTorre!=0){
            getApto()
        }
    }, [IdTorre])
    
    

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
                                
                                <Grid item xs={4}>
                                    <TextField id="outlined-basic" label="Numero" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Select titulo={'Torre'} data={TorreSelect} Value={IdTorre} setValue={setIdTorre}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Select titulo={'Apartamento'} data={AptoSelect} Value={IdApto} setValue={setIdApto}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Capacidad Autos" variant="outlined" onChange={e=>{setAutos(e.target.value)}} value={Autos}/>
                                    {/* <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Checkbox checked={checkCarro} onClick={SeleccionarCarro}/>
                                        <span style={{fontSize:'20px'}}>Carro</span>
                                    </div> */}
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Capacidad Motos" variant="outlined" onChange={e=>{setMotos(e.target.value)}} value={Motos}/>
                                    {/* <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Checkbox checked={checkMoto} onClick={SeleccionarMoto}/>
                                        <span style={{fontSize:'20px'}}>Moto</span>
                                    </div> */}
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
                                <BorrarParqueadero Id={Id} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
                                
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