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

export default function MediaControlCard({renderizarLista,IdTorreVG=false,IdAptoVG=false,setModal=false}) {
    const alerta=new Alert()
    const [Placa, setPlaca] = useState('')
    const [Tipo, setTipo] = useState([{text:'Carro',value:1},{text:'Moto',value:2}])
    const [IdTipoVehiculo, setIdTipoVehiculo] = useState(0)
    const [IdTorre, setIdTorre] = useState(IdTorreVG!=false?IdTorreVG:0)
    const [TorreSelect, setTorreSelect] = useState([])
    const [IdApto, setIdApto] = useState(IdAptoVG!=false?IdAptoVG:0)
    const [AptoSelect, setAptoSelect] = useState([])
    // const [Nombre, setNombre] = useState('')
    // const [Apellido, setApellido] = useState('')
    // const [Cedula, setCedula] = useState('')
    // const [Telefono, setTelefono] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [ArrData, setArrData] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrData.length===paginaActual-1){
            if(Placa!='' && IdTipoVehiculo!='' && IdTorre!='' && IdApto!=''){
                console.log(Placa)
                console.log(IdTipoVehiculo)
                console.log(IdTorre)
                console.log(IdApto)
                const obj={
                    Placa,
                    IdTipoVehiculo,
                    IdTorre,
                    IdApto
                }
                let arr=ArrData
                console.log(arr)
                arr.push(obj)
                setArrData(arr)
                setPlaca('')
                setIdTipoVehiculo('')
                setIdTorre(IdTorreVG!=false?IdTorreVG:0)
                setIdApto(IdAptoVG!=false?IdAptoVG:0)
                setPaginaActual(paginaActual+1)
            }
        }else{
            // alert('no se encuentra en la ultima pag')
            let ContadorTemporal=ArrData.length+1
            setPaginaActual(ContadorTemporal)
            if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0){
                ArrData[paginaActual-1].Placa=Placa
                ArrData[paginaActual-1].IdTipoVehiculo=IdTipoVehiculo
                ArrData[paginaActual-1].IdTorre=IdTorre
                ArrData[paginaActual-1].IdApto=IdApto
            }
            setPlaca('')
            setIdTipoVehiculo('')
            setIdTorre(IdTorreVG!=false?IdTorreVG:0)
            setIdApto(IdAptoVG!=false?IdAptoVG:0)
        }
    }

    const atrasContador=()=>{
        console.log(ArrData)
        console.log(paginaActual)
        console.log(ArrData[paginaActual-2])
        if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0){
            ArrData[paginaActual-1].Placa=Placa
            ArrData[paginaActual-1].IdTipoVehiculo=IdTipoVehiculo
            ArrData[paginaActual-1].IdTorre=IdTorre
            ArrData[paginaActual-1].IdApto=IdApto
        }
        setPlaca(ArrData[paginaActual-2].Placa)
        setIdApto(ArrData[paginaActual-2].IdApto)
        setIdTipoVehiculo(ArrData[paginaActual-2].IdTipoVehiculo)
        setIdTorre(ArrData[paginaActual-2].IdTorre)
        
    }

    const siguienteContador=()=>{
        console.log(ArrData)
        console.log(paginaActual)
        console.log(ArrData[paginaActual])
        if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0){
            ArrData[paginaActual-1].Placa=Placa
            ArrData[paginaActual-1].IdTipoVehiculo=IdTipoVehiculo
            ArrData[paginaActual-1].IdTorre=IdTorre
            ArrData[paginaActual-1].IdApto=IdApto
        }
        if(ArrData[paginaActual]===undefined){
            setPlaca('')
            setIdApto(IdAptoVG!=false?IdAptoVG:0)
            setIdTorre(IdTorreVG!=false?IdTorreVG:0)
            setIdTipoVehiculo('')
        }else{
            console.log(paginaActual)    
            setPlaca(ArrData[paginaActual].Placa)
            setIdApto(ArrData[paginaActual].IdApto)
            setIdTorre(ArrData[paginaActual].IdTorre)
            setIdTipoVehiculo(ArrData[paginaActual].IdTipoVehiculo)
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrData([])
    }

    const cancelarRegistro=()=>{
        setPlaca('')
        setIdTipoVehiculo(0)
        setIdTorre(0)
        setIdApto(0)
        setAptoSelect([])
        resetContador()
        if(setModal!=false){
            setModal(false)
        }
        // setPassword('')
        // setNombre('')
        // setApellido('')
        // setCedula('')
        // setTelefono('')
    }

    const CrearItem=()=>{
        // console.log('crear user front')
        console.log(Placa)
        console.log(IdTipoVehiculo)
        console.log(IdTorre)
        console.log(IdApto)
        // console.log(Nombre)
        // console.log(Apellido)
        // console.log(Cedula)
        // console.log(Telefono)
        // console.log(Numero)
        let arr=ArrData
        console.log(arr)
        if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0|| ArrData.length>0){
            // setLoadingState(true)
            if(Placa!="" && IdTipoVehiculo!=0 && IdTorre!=0 && IdApto!=0){
                const obj={
                    Placa,
                    IdTipoVehiculo,
                    IdTorre,
                    IdApto
                }
                arr.push(obj)
            }
            axios.post('http://localhost:3000/Api/Vehiculos-Create', arr)
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
                // setTimeout(() => {
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                //     }, 300);
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

  const theme = useTheme();

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
                if(response.data.data.length>0){
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




    const queryEffect=()=>{
        getTorres()
    }



    useEffect(() => {
        queryEffect()
    }, [])

    useEffect(() => {
      if(IdTorre!=0){
        getApto()
      }
    }, [IdTorre])
    
    


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