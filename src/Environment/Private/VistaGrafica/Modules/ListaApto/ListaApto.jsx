import React from 'react'
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { Alert } from '../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../Components/Loading';
import axios from 'axios';
import { useState } from 'react';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import './style.css'



function ListaApto({IdTorre,setVista,setIdApto}) {
    const alerta=new Alert()
    const [Data, setData] = useState([])

    const handleClickParqueadero=(idApto)=>{
        console.log(idApto)
        setVista(4)
        setIdApto(idApto)
        // setIdTorre(id)
        // setVista(2)
    }

    const handleClickContacto=(idApto)=>{
        console.log(idApto)
        setVista(3)
        setIdApto(idApto)
    }

    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        
        if(IdTorre===0){
            let url='http://localhost:3000/Api/Departamentos'
            axios.get(url, {
                id:IdTorre
            })
            .then(function (response) {
                // let arr=[]
                console.log(response.data);
                if(response.data.status===1){

                    let arr=[]
                    let indiceTemporal=0
                    for (let i = 0; i < response.data.data.length; i++) {
                        const item = response.data.data[i];
                        const result = arr.filter((molde) => molde.torre===item.torre_nombre);
                        const obj={
                            a_id:item.depa_id,
                            a_numero:item.depa_numero,
                            torre_nombre:item.torre_nombre
                        }
                        if(result.length>0){
                            console.log(result)
                            console.log(result[0].data.push(obj))
                        }else{
                            const objPadre={
                                torre:item.torre_nombre,
                                indice:indiceTemporal++,
                                data:[]
                            }
                            objPadre.data.push(obj)
                            arr.push(objPadre)
                        }
                        
                        
                    }
                    console.log(arr)
                    setData(arr)
                }
                // setLoadingState(false)
            
            
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
        }else{
            let url='http://localhost:3000/Api/Departamentos-ByTorre'
            axios.post(url, {
                id:IdTorre
            })
            .then(function (response) {
            
                let arr=[]
                let indiceTemporal=0
                console.log(response.data)
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const result = arr.filter((molde) => molde.torre===item.torre_nombre);
                    const obj={
                        a_id:item.a_id,
                        a_numero:item.a_numero,
                        torre_nombre:item.torre_nombre
                    }
                    if(result.length>0){
                        console.log(result)
                        console.log(result[0].data.push(obj))
                    }else{
                        const objPadre={
                            torre:item.torre_nombre,
                            indice:indiceTemporal++,
                            data:[]
                        }
                        objPadre.data.push(obj)
                        arr.push(objPadre)
                    }
                    
                    
                }
                console.log(arr)
                setData(arr)
                // setLoadingState(false)
            
            
            })
            .catch(function (error) {
            console.log(error);
                // alerta.ErrorSistem()

            })
        }
        // console.log(url)
        
    }

    useEffect(() => {
        queryEffect()
    }, [])




  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
            <div style={{margin:'0 5px',color:''}}>
                <IconButton color="" style={{color:'#23282b'}}>
                    {/* <ApartmentIcon/> */}
                </IconButton>
            </div>
            {/* APARTAMENTOS */}
            
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
            <Grid container spacing={0}>
                <Grid item md={12} >
                    
                    {
                        Data.length>0?
                            Data.map((padre)=>
                                <Card key={padre.indice} style={{padding:'10px',margin:'20px 10px 50px 10px',backgroundColor:'lightgray'}}>
                                    <Grid container spacing={0}>
                                        <Grid item md={12} >
                                            <div style={{margin:'5px 10px 0 10px',fontSize:'25px',backgroundColor:'#FF3600',padding:'20px',borderRadius:'5px',color:'white'}}>
                                                <b>{padre.torre}</b>
                                            </div>
                                        </Grid>

                                        {Data[padre.indice].data.map((child)=>
                                            <Grid key={child.a_id} item md={3} style={{cursor:'pointer'}} >
                                                <Card className='cardTorre' style={{padding:'10px',margin:'15px 10px'}}>
                                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                        <HomeIcon style={{fontSize:'60px',color:'#FF3600'}}/>
                                                    </div>
                                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0',fontSize:'20px',color:'#FF3600'}}>
                                                        <b>
                                                            {child.a_numero}
                                                        </b>
                                                    </div>
                                                    <Grid container spacing={1}>
                                                        <Grid item md={6} style={{cursor:'pointer'}} onClick={()=>handleClickContacto(child.a_id)}>
                                                            <Button variant="contained" color='success' style={{width:'100%',fontSize:'12px'}}>contactos</Button>
                                                        </Grid>
                                                        <Grid item md={6} style={{cursor:'pointer'}} onClick={()=>handleClickParqueadero(child.a_id)}>
                                                            <Button variant="contained" style={{width:'100%',fontSize:'12px'}}>parqueaderos</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                            )
                                        
                                        }
                                    </Grid>
                                </Card>
                            )
                        :
                        <Grid item md={12} >
                            <div style={{margin:'5px 10px 0 10px',fontSize:'25px',backgroundColor:'#23282b',padding:'20px',borderRadius:'5px',color:'white'}}>
                                <b>SIN RESULTADOS</b>
                            </div>
                        </Grid>
                        
                    }
                    
                </Grid>
            </Grid>
        </div>



    </div>
  )
}

export default ListaApto