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
// import { BorrarInquilino } from '../../../DeleteInquilino';
import { Alert } from '../../../../../Components/Alerts/Alerts'
// import { Loading } from '../../../../../../../Components/Loading';
import { Select } from '../../../GestionInquilinos/Modules/NewInquilino/Components/Select';
import { DateRange } from '@mui/icons-material';

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
    const [DataRes, setDataRes] = useState([])
    const [Id, setId] = useState('')

    const editText=(val,i,input)=>{
        console.log(val)
        console.log(i)
        console.log(input)
        const newDataRes = [...DataRes]; // Crea una copia del estado
        newDataRes[i][input] = val; // Actualiza el valor en la copia
        setDataRes(newDataRes); 
        console.log(DataRes)// Actualiza el estado con la nueva copia
        // console.log(val)
        // console.log(i)
    }

    const cancelarEdit=()=>{
        // console.log('cancelar')
        // console.log(setIdEditGestion)
        // setIdEditGestion(0)
        if(setModal!=false){
            setModal(false)
        }
    }

    const QuerySelect=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Residentes-apartamentos', {
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


    const guardarItem=()=>{
        console.log('guardar')
        
        console.log(Nombre)
        let arr=[]
        if(DataRes.length>0){
            // setLoadingState(true)
            for (let i = 0; i < DataRes.length; i++) {
                const item = DataRes[i];
                console.log(item)
                const obj={
                    Nombre:item.nombre,
                    Apellido:item.apellido,
                    Telefono:item.telefono,
                    Telefono2:item.telefono2,
                    Tipo:item.tipo_residente,
                    Id:item.id,
                    IdApartamento:IdAla,
                }
                arr.push(obj)
            }
            console.log(arr)
            axios.post('http://localhost:3000/Api/Residente-EditGroup', arr)
            .then(function (response) {
                console.log(response.data);
                if(response.data.status===1){
                // alert('Edicion exitosa!')
                // setTimeout(() => {
                    renderizarLista(true)
                    // setModal(false)
                    // setIdEditGestion(0) 
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
                setModal(false)
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
        axios.post('http://localhost:3000/Api/Residente-ByIdApto', {
            IdApto: id,
        })
        .then(function (response) {
            if(response.data.status==1){
                console.log(response.data.data);
                setDataRes(response.data.data)
                setIdAla(response.data.data[0].id_apartamento)
            }else{
                setModal(false)
                alerta.Error({texto:response.data.msg})
            }
            
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
            <Card sx={{ display: 'flex' }} style={{padding:'20px',paddingLeft:'0px',border:'2px solid #1976d2',width:'1200px'}}>
                <Grid container spacing={0} style={{backgroundColor:''}}>
                    <Grid item xs={1} >
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                            <EditNoteIcon style={{fontSize:'35px',color:'#1976d2'}}/>
                            
                        </div>
                    </Grid>
                    
                    <Grid item xs={11}>
                        <Grid item xs={12} style={{margin:'20px 0'}}>
                            <Select titulo={'Apartamento'} data={Data} Value={IdAla} setValue={setIdAla}/>
                        </Grid>
                    {
                        DataRes.length>0?
                            DataRes.map((child,i)=>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Grid container spacing={2}>
                                            
                                            <Grid item xs={2.4}>
                                                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={e=>{editText(e.target.value,i,'nombre')}} value={child.nombre}/>
                                            </Grid>
                                            <Grid item xs={2.4}>
                                                <TextField id="outlined-basic" label="Apellido" variant="outlined" onChange={e=>{editText(e.target.value,i,'apellido')}} value={child.apellido}/>
                                            </Grid>
                                            <Grid item xs={2.4}>
                                                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={e=>{editText(e.target.value,i,'telefono')}} value={child.telefono}/>
                                            </Grid>
                                            <Grid item xs={2.4}>
                                                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={e=>{editText(e.target.value,i,'telefono2')}} value={child.telefono2}/>
                                            </Grid>
                                            <Grid item xs={2.4}>
                                                <Select titulo={'Tipo'} data={TpResidentes} Value={child.tipo_residente} setValue={editText} i={i} input={'tipo_residente'}/>
                                            </Grid>
                                            
                                            
                                        </Grid>
                                        <br />
                                        
                                        
                                    </Box>
                                </Grid>
                            )
                        :''
                    }
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
                                {/* <BorrarInquilino Id={Id} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/> */}
                                
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