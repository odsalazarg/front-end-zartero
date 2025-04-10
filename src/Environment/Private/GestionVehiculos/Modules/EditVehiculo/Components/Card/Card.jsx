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
import { BorrarVehiculo } from '../../../DeleteVehiculo';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../../Components/Loading';
import { Select } from '../Select';

export default function MediaControlCard({IdEditGestion,setIdEditGestion,renderizarLista,setModal=false}) {
    const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Placa, setPlaca] = useState('')
    const [Tipo, setTipo] = useState([{text:'Carro',value:1},{text:'Moto',value:2}])
    const [IdTipoVehiculo, setIdTipoVehiculo] = useState(0)
    const [IdTorre, setIdTorre] = useState(0)
    const [TorreSelect, setTorreSelect] = useState([])
    const [IdApto, setIdApto] = useState(0)
    const [AptoSelect, setAptoSelect] = useState([])
    const cancelarEdit=()=>{
        // console.log('cancelar')
        // console.log(setIdEditGestion)
        
        if(setModal!=false){
            setModal(false)
        }else{
            setIdEditGestion(0)
        }
    }

    const buscarTorres=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Torres', {
        })
        .then(function (response) {
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


    const guardarItem=()=>{
        console.log('guardar')
        
        console.log(Placa)
        console.log(IdTipoVehiculo)
        console.log(IdTorre)
        console.log(IdApto)
        
        if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0){
            // setLoadingState(true)
            axios.post('http://localhost:3000/Api/Vehiculo-Edit', {
                Placa: Placa,
                IdTipoVehiculo:IdTipoVehiculo,
                IdTorre:IdTorre,
                IdApto:IdApto,
                Id:IdEditGestion
            })
            .then(function (response) {
                console.log(response.data);
                if(response.data.status===1){
                // alert('Edicion exitosa!')
                // setTimeout(() => {
                    renderizarLista(true)
                    if(setModal!=false){
                        setModal(false)
                    }else{
                        setIdEditGestion(0)
                    }
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Success()
                //     }, 1300);
                // }, 1000);
                }else{
                    // setTimeout(() => {
                    //     setLoadingState(false)
                    //     setTimeout(() => {
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
        axios.post('http://localhost:3000/Api/Vehiculo-ById', {
            Id: id,
        })
        .then(function (response) {
            console.log(response.data.data);
            // setUsers(response.data.users)
            // setData(response.data.users)
            // console.log(response.data.users[0].username)
            setPlaca(response.data.data[0].vehiculo_placa)
            setIdTipoVehiculo(response.data.data[0].vehiculo_tipo)
            setIdTorre(response.data.data[0].torre_id)
            setIdApto(response.data.data[0].apto_id)

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
                                
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Placa" variant="outlined" onChange={e=>{setPlaca(e.target.value)}} value={Placa} style={{width:'100%'}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select titulo={'Tipo'} data={Tipo} Value={IdTipoVehiculo} setValue={setIdTipoVehiculo}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select titulo={'Torre'} data={TorreSelect} Value={IdTorre} setValue={setIdTorre}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select titulo={'Apto'} data={AptoSelect} Value={IdApto} setValue={setIdApto}/>
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
                                <BorrarVehiculo Id={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
                                
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