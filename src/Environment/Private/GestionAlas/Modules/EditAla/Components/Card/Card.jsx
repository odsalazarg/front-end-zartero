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
import { BorrarAla } from '../../../DeleteAla';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../../Components/Loading';
import { Select } from '../../../NewAla/Components/Select';

export default function MediaControlCard({IdEditGestion,setIdEditGestion,renderizarLista}) {
    const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Nombre, setNombre] = useState('')
    const [Data, setData] = useState([])
    const [IdAla, setIdAla] = useState('')
    const [Id, setId] = useState('')
    const cancelarEdit=()=>{
        // console.log('cancelar')
        // console.log(setIdEditGestion)
        setIdEditGestion(0)
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


    const guardarItem=()=>{
        console.log('guardar')
        
        console.log(Nombre)
        
        if(Nombre!='' && IdAla!=''){
            setLoadingState(true)
            axios.post('http://localhost:3000/Api/Alas-Edit', {
                Nombre:Nombre,
                Id:Id,
                IdTorre:IdAla
            })
            .then(function (response) {
                console.log(response.data);
                if(response.data.status===1){
                // alert('Edicion exitosa!')
                setTimeout(() => {
                    renderizarLista(true)
                    setIdEditGestion(0)
                    setLoadingState(false)
                    setTimeout(() => {
                        alerta.Success()
                    }, 1300);
                }, 1000);
                }else{
                    setTimeout(() => {
                        setLoadingState(false)
                        setTimeout(() => {
                            alerta.Error({texto:response.data.msg})
                        }, 300);
                    }, 1000);
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
        axios.post('http://localhost:3000/Api/Alas-ById', {
            Id: id,
        })
        .then(function (response) {
            console.log(response.data.data);
            // setUsers(response.data.users)
            // setData(response.data.users)
            // console.log(response.data.users[0].username)
            setNombre(response.data.data[0].nombre)
            setId(response.data.data[0].id)
            setIdAla(response.data.data[0].id_torre)

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
                                    <TextField id="outlined-basic" label="Ala" variant="outlined" onChange={e=>{setNombre(e.target.value)}} value={Nombre}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <Select titulo={'Torre'} data={Data} Value={IdAla} setValue={setIdAla}/>
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
                                <BorrarAla Id={Id} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
                                
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