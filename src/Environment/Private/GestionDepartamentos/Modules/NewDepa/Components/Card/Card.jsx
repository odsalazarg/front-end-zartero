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

export default function MediaControlCard({renderizarLista}) {
    const alerta=new Alert()
    const [Numero, setNumero] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [IdAla, setIdAla] = useState(0)
    const [Data, setData] = useState([])
    const [ArrData, setArrData] = useState([])
    const [paginaActual, setPaginaActual] = useState(1);

    const anadir1Mas=()=>{
        // alert('1 mas')
        if(ArrData.length===paginaActual-1){
            if(Numero!='' && IdAla!=''){
                // console.log(Nombre)
                // console.log(Apellido)
                console.log(Numero)
                console.log(IdAla)
                const obj={
                    Numero,
                    IdAla
                }
                let arr=ArrData
                console.log(arr)
                arr.push(obj)
                setArrData(arr)
                setNumero('')
                // setApellido('')
                // setTelefono('')
                setIdAla(IdAla)
                setPaginaActual(paginaActual+1)
            }
        }else{
            // alert('no se encuentra en la ultima pag')
            let ContadorTemporal=ArrData.length+1
            setPaginaActual(ContadorTemporal)
            if(Numero!='' && IdAla!=''){
                ArrData[paginaActual-1].Numero=Numero
                ArrData[paginaActual-1].IdAla=IdAla
            }
            setNumero('')
            setIdAla('')
        }
    }

    const atrasContador=()=>{
        console.log(ArrData)
        console.log(paginaActual)
        console.log(ArrData[paginaActual-2])
        if(Numero!='' && IdAla!=''){
            ArrData[paginaActual-1].Numero=Numero
            ArrData[paginaActual-1].IdAla=IdAla
        }
        setNumero(ArrData[paginaActual-2].Numero)
        setIdAla(ArrData[paginaActual-2].IdAla)
        
    }

    const siguienteContador=()=>{
        console.log(ArrData)
        console.log(paginaActual)
        console.log(ArrData[paginaActual])
        if(Numero!='' && IdAla!=''){
            ArrData[paginaActual-1].Numero=Numero
            ArrData[paginaActual-1].IdAla=IdAla
        }
        if(ArrData[paginaActual]===undefined){
            setNumero('')
            setIdAla('')
        }else{
            console.log(paginaActual)    
            setNumero(ArrData[paginaActual].Numero)
            setIdAla(ArrData[paginaActual].IdAla)
        }
    }

    const resetContador=()=>{
        setPaginaActual(1)
        setArrData([])
    }

    const cancelarRegistro=()=>{
        setNumero('')
        setIdAla(0)
        resetContador()
    }

    const QueryAlasTorres=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Torres', {
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
                        text:item.nombre
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
        console.log(Numero)
        let arr=ArrData
        console.log(arr)
        if(Numero!='' && IdAla!='' || ArrData.length>0){
            // setLoadingState(true)
            if(Numero!='' && IdAla!=''){
                const obj={
                    Numero,
                    IdAla
                }
                arr.push(obj)
            }
            axios.post('http://localhost:3000/Api/Departamentos-Create', arr)
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

    useEffect(() => {
        QueryAlasTorres()
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
                            <TextField id="outlined-basic" label="# Apartamento" variant="outlined" onChange={e=>{setNumero(e.target.value)}} value={Numero}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Select titulo={'Torres'} data={Data} Value={IdAla} setValue={setIdAla}/>
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