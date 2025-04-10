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
import Grid from '@mui/material/Grid';
import './style.css'



function ListaTorres({setIdTorre,setVista}) {
    const alerta=new Alert()
    const [Data, setData] = useState([])

    const handleClick=(id)=>{
        // alert(id)
        setIdTorre(id)
        setVista(2)
    }

    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Torres', {
            
            })
            .then(function (response) {
                if(response.data.status===1){

                    console.log(response.data);
                    setData(response.data.data)
                }
                // setLoadingState(false)
            
            
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
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
            
            
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
            <Grid container spacing={0}>
                {Data.length>0?
                    Data.map((child)=>
                        <Grid key={child.id} item md={2} style={{cursor:'pointer'}} onClick={()=>handleClick(child.id)}>
                            <Card className='cardTorre2' style={{padding:'10px',margin:'10px 10px'}}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <ApartmentIcon style={{fontSize:'70px',color:'#FF3600'}}/>
                                </div>
                                <div className='' style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0',fontSize:'16px',color:'#FF3600'}}>
                                    <b>
                                        {child.nombre}
                                    </b>
                                </div>
                            </Card>
                        </Grid>
                    )
                :''
                }
            </Grid>
        </div>



    </div>
  )
}

export default ListaTorres