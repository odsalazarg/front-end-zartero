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

export default function MediaControlCard({renderizarLista}) {
    const alerta=new Alert()
    const [Nombre, setNombre] = useState('')
    const [LoadingState, setLoadingState] = useState(false)
    const [IdAla, setIdAla] = useState(0)
    const [Data, setData] = useState([])

    const cancelarRegistro=()=>{
        setNombre('')
        setIdAla(0)
        
    }

    const QueryAlasTorres=()=>{
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

            setData(arr)
          })
          .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
          })
    }

    const CrearItem=()=>{
        // console.log('crear user front')
        console.log(Nombre)
        
        if(Nombre!='' && IdAla!=''){
            setLoadingState(true)
            axios.post('http://localhost:3000/Api/Alas-Create', {
                Nombre:Nombre,
                IdTorre:IdAla
            })
            .then(function (response) {
              console.log(response.data);
              if(response.data.status===1){
                // alert('registro exitoso!')
                setTimeout(() => {
                    renderizarLista(true)
                    setLoadingState(false)
                    setTimeout(() => {
                        alerta.Success()
                    }, 1300);
                }, 1000);
              }else{
                // alert(response.data.msg)
                setTimeout(() => {
                    setLoadingState(false)
                    setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                    }, 300);
                }, 1000);
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
                        <AddIcon style={{fontSize:'35px'}} color='success'/>
                        
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={2}>
                        
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Ala" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Select titulo={'Torre'} data={Data} Value={IdAla} setValue={setIdAla}/>
                        </Grid>
                        
                        </Grid>
                        <br />
                        <Grid container spacing={0} style={{backgroundColor:'',paddingLeft:''}}>

                            <Grid item xs={6} style={{backgroundColor:''}}>

                                <div style={{display:'flex',justifyContent:'',alignItems:'center'}}>
                                    <Button variant="contained" style={{marginRight:'',backgroundColor:"grey"}} onClick={cancelarRegistro}>CANCELAR</Button>
                                </div>

                            </Grid>
                            

                            <Grid item xs={6} style={{backgroundColor:''}}>

                                <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                    <Button variant="contained" color="success" onClick={CrearItem}>Registrar</Button>
                                </div>

                            </Grid>

                        </Grid>
                        
                        
                    </Box>
                </Grid>
            </Grid>
        
        
        </Card>
    </>
  );
}