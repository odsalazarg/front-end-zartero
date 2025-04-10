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
import Checkbox from '@mui/material/Checkbox';
import Contador from '../Contador/Contador'
import PlusOneIcon from '@mui/icons-material/PlusOne';

export default function MediaControlCard({renderizarLista}) {
    const alerta=new Alert()
    const [Nombre, setNombre] = useState('')
    const [Autos, setAutos] = useState('')
    const [Motos, setMotos] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [IdAla, setIdAla] = useState(0)
    const [Data, setData] = useState([])
    const [checkCarro, setcheckCarro] = useState(false)
    const [checkMoto, setcheckMoto] = useState(false)
    const [IdTorre, setIdTorre] = useState(0)
    const [TorreSelect, setTorreSelect] = useState([])
    const [IdApto, setIdApto] = useState(0)
    const [AptoSelect, setAptoSelect] = useState([])
    const [ArrData, setArrData] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrData.length===paginaActual-1){
            if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!=='' &&IdTorre!=''){
                console.log(Nombre)
                console.log(IdApto)
                console.log(Autos)
                console.log(Motos)
                // console.log(IdAla)
                const obj={
                    Nombre,
                    IdApto,
                    Autos,
                    Motos,
                    IdTorre
                }
                let arr=ArrData
                console.log(arr)
                arr.push(obj)
                setArrData(arr)
                setNombre('')
                setIdApto('')
                setAutos('')
                setMotos('')
                setIdTorre('')
                setPaginaActual(paginaActual+1)
                resetCheck()
            }
        }else{
            // alert('no se encuentra en la ultima pag')
            // let ContadorTemporal=0
            let ContadorTemporal=ArrData.length+1
            setPaginaActual(ContadorTemporal)
            if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!=='' && IdTorre!==''){
                ArrData[paginaActual-1].Nombre=Nombre
                ArrData[paginaActual-1].IdApto=IdApto
                ArrData[paginaActual-1].Autos=Autos
                ArrData[paginaActual-1].Motos=Motos
                ArrData[paginaActual-1].IdTorre=IdTorre
            }
            setNombre('')
            setIdApto('')
            setAutos('')
            setMotos('')
            setIdTorre('')
            resetCheck()
        }
    }

    const atrasContador=()=>{
        console.log(ArrData)
        console.log(paginaActual)
        console.log(ArrData[paginaActual-2])
        if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!=='' && IdTorre!==''){
            ArrData[paginaActual-1].Nombre=Nombre
            ArrData[paginaActual-1].IdApto=IdApto
            ArrData[paginaActual-1].Autos=Autos
            ArrData[paginaActual-1].Motos=Motos
            ArrData[paginaActual-1].IdTorre=IdTorre
        }
        setNombre(ArrData[paginaActual-2].Nombre)
        setIdApto(ArrData[paginaActual-2].IdApto)
        setAutos(ArrData[paginaActual-2].Autos)
        setMotos(ArrData[paginaActual-2].Motos)
        setIdTorre(ArrData[paginaActual-2].IdTorre)
        if(ArrData[paginaActual-2].Autos==='1'){
            SeleccionarCarro()
        }
        if(ArrData[paginaActual-2].Motos==='1'){
            SeleccionarMoto()
        }
        
    }

    const siguienteContador=()=>{
        // console.log(arrCopia[paginaActual-1])
        if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!=='' && IdTorre!==''){
            ArrData[paginaActual-1].Nombre=Nombre
            ArrData[paginaActual-1].IdApto=IdApto
            ArrData[paginaActual-1].Autos=Autos
            ArrData[paginaActual-1].Motos=Motos
            ArrData[paginaActual-1].IdTorre=IdTorre
        }
        // console.log(arrCopia[paginaActual-1])
        console.log(ArrData[paginaActual-1])
        console.log(paginaActual)
        console.log(ArrData[paginaActual])
        if(ArrData[paginaActual]===undefined){
            setNombre('')
            setIdApto('')
            setAutos('')
            setMotos('')
            setIdTorre('')
            resetCheck()
        }else{
            console.log(paginaActual)    
            setNombre(ArrData[paginaActual].Nombre)
            setIdApto(ArrData[paginaActual].IdApto)
            setAutos(ArrData[paginaActual].Autos)
            setMotos(ArrData[paginaActual].Motos)
            setIdTorre(ArrData[paginaActual].IdTorre)
            if(ArrData[paginaActual].Autos==='1'){
                SeleccionarCarro()
            }
            if(ArrData[paginaActual].Motos==='1'){
                SeleccionarMoto()
            }
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrData([])
    }

    const resetCheck=()=>{
        setAutos('')
        setMotos('')
        setcheckCarro(false)
        setcheckMoto(false)
    }

    const cancelarRegistro=()=>{
        setNombre('')
        setAutos('')
        setMotos('')
        setIdApto(0)
        setIdTorre(0)
        setcheckCarro(false)
        setcheckMoto(false)
        resetContador()
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

    const getTorres=()=>{
        axios.get('http://localhost:3000/Api/Torres', {
            
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg,confirmar:true})
                // restartPropietario()
                let arr=[]
                console.log(response.data.data)
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={
                        value:item.id,
                        text:item.nombre
                    }
                    arr.push(obj)
                    // setTorresSelect
                    
                }
                setTorreSelect(arr)
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


    const CrearItem=()=>{
        // console.log('crear user front')
        console.log(Nombre)
        console.log(IdApto)
        console.log(Autos)
        console.log(Motos)
        let arr=ArrData
        if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!=='' || ArrData.length>0){
            if(Nombre!=='' && IdApto!=='' && Autos!=='' && Motos!==''){
                const obj={
                    Nombre,
                    IdApto,
                    Autos,
                    Motos,
                }
                arr.push(obj)
            }
            console.log(arr)
            axios.post('http://localhost:3000/Api/Parqueaderos-Create', arr)
            .then(function (response) {
              console.log(response.data);
              if(response.data.status===1){
                // alert('registro exitoso!')
                // setTimeout(() => {
                    if(renderizarLista){
                        renderizarLista(true)
                    }
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Success()
                //     }, 1300);
                // }, 1000);
              }else{
                // alert(response.data.msg)
                // setTimeout(() => {
                    // cancelarRegistro()
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                    // }, 300);
                // }, 1000);
              }
        
              cancelarRegistro()
        
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
        getTorres()
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
                            <TextField id="outlined-basic" label="Numero" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <Select titulo={'Torre'} data={TorreSelect} Value={IdTorre} setValue={setIdTorre}/>
                        </Grid> */}
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
                <Grid item xs={12}>
                    <Grid container spacing={1} style={{backgroundColor:'',paddingLeft:''}}>
                        <Grid item xs={2} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button variant="contained" onClick={anadir1Mas}><PlusOneIcon/></Button>
                            </div>

                        </Grid>
                        <Grid item xs={5} style={{backgroundColor:''}}>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Contador numContador={ArrData.length} paginaActual={paginaActual} setPaginaActual={setPaginaActual} atrasContador={atrasContador} siguienteContador={siguienteContador}/>
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