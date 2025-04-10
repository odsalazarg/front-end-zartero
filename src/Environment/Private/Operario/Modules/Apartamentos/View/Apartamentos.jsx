import React from 'react'
import { Card as Card2 } from '../Components';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';
import axios from 'axios';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function Apartamentos({IdTorre,setIdDepa,IdDepa,setNombreDepa}) {

     const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Data, setData] = useState([])
    const [paginacion, setpaginacion] = useState([])
    
    const cambiarPaginacion=(i)=>{
        setData(paginacion[i])
    }



    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        let arrPadre=[]
        let arr=[]
        axios.post('http://localhost:3000/Api/Departamentos-ByTorre', {
            id:IdTorre
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.status===0){
                    // setData(arrPadre[0])
                    setpaginacion(0)
                    setData([])
                    // setLoadingState(false)
                }else{
                    for (let i = 0; i < response.data.data.length; i++) {
                        const item = response.data.data[i];
                        arr.push(item)
                        console.log(arr.length)
                        if(arr.length===32 || i==response.data.data.length-1){
                            console.log(arr)
                            arrPadre.push(arr)
                            arr=[]
                        }
                    }
                    console.log(arrPadre[0])
                    setData(arrPadre[0])
                    if(arrPadre.length>1){
                        setpaginacion(arrPadre)
                    }
                    
                    // setLoadingState(false)
                }
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
    }

    useEffect(() => {
        if(IdTorre!==0){
            queryEffect()
        }else{
            setData([])
        }
    }, [IdTorre])

  return (
    <div style={{margin:'20px 0',backgroundColor:'lightgrey',padding:'20px 20px',borderRadius:'5px',height:'280px',overflowY:'auto',paddingTop:'40px'}}>
        <Grid container spacing={1}>
            {
                LoadingState?
                <Loading/>
                :''
            }
            {
                Data.length>0?
                    Data.map((child)=>
                        <Grid key={child.a_id} item md={1.5} style={{backgroundColor:''}}>
                            <Card2 Nombre={child.a_numero} setIdDepa={setIdDepa} IdDepa={IdDepa} id={child.a_id} setNombreDepa={setNombreDepa}/>
                        </Grid>
                    )
                    :
                    <Grid item md={12} style={{backgroundColor:''}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>
                            <b>NOT FOUND</b>
                        </div>
                    </Grid>
            }
            {
                paginacion.length>0?
                    paginacion.map((child,i)=>
                        <Grid key={i} item md={1.5} style={{backgroundColor:''}}>
                            <Card onClick={()=>cambiarPaginacion(i)} style={{backgroundColor:'',cursor:'pointer'}}>
                                <CardContent style={{padding:'0'}}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
                                    <AutoStoriesIcon style={{fontSize:'50px',color:'red'}}/>
                                </div>
                                
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'5px'}}>
                                    <Typography variant="body2" style={{color:'red',fontSize:'9px'}}>
                                        <b>{i+1}</b>
                                    </Typography>
                                </div>
                                </CardContent>
                                
                            </Card>
                        </Grid>
                    )
                :
                ''
            }
        </Grid>
    </div>
  )
}

export default Apartamentos