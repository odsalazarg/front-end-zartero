import React from 'react'
import { Card as Card2} from '../Components'
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

function Torres({setIdTorre,IdTorre,setIdDepa,setNombreTorre}) {
    const alerta=new Alert()
    const [LoadingState, setLoadingState] = useState(false)
    const [Data, setData] = useState([])
    // const [DataTotal, setDataTotal] = useState([])
    const [paginacion, setpaginacion] = useState([])

    const cambiarPaginacion=(i)=>{
        setData(paginacion[i])
    }


    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        let arrPadre=[]
        let arr=[]
        axios.get('http://localhost:3000/Api/Torres', {
            
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
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
                // setpaginacion(arrPadre)
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
    }

    useEffect(() => {
      queryEffect()
    }, [])
    


  return (
    <div style={{margin:'20px 0',backgroundColor:'lightgrey',padding:'20px',borderRadius:'5px',backgroundColor:'lightgrey',overflowY:'auto',height:'285px',paddingTop:''}}>
        <Grid container spacing={1} style={{paddingTop:'20px',backgroundColor:''}}>
            {/* <br /><br /><br /><br /> */}
            {
                LoadingState?
                <Loading/>
                :''
            }
            {
                Data.length>0?
                    Data.map((child,i)=>
                        <Grid key={child.id} item md={1.5} style={{backgroundColor:''}}>
                            <Card2 Nombre={child.nombre} setIdTorre={setIdTorre} IdTorre={IdTorre} id={child.id} setIdDepa={setIdDepa} setNombreTorre={setNombreTorre}/>
                        </Grid>
                    )
                :
                <Grid item md={12} style={{backgroundColor:'',height:'100%'}}>
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

export default Torres