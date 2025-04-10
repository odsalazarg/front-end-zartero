import React from 'react'
import './style.css'
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { useState } from 'react';
import {default as RenovarLicenciaJSX} from '../Modules/Login/Modules/RenovarLicencia'
import zarteroIcon from './Img/icono2.png'
import axios from 'axios';

function AuthView({view}) {
  const macState=useSelector((store)=>store.mac);
  const [RenovarLicencia, setRenovarLicencia] = useState(false)
  const [LogoOficial, setLogoOficial] = useState('')


  const logoQuery = () => {
        // setLogoMenu('')
    axios.get('http://localhost:3000/Api/getMarcaBlanca', {
      
    })
    .then(function (response) {
      console.log(response)
      if (response.data.status === 1) {
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          const item = response.data.data[i];
          if(item.nombre==="LOGO_OFICIAL"){
            setLogoOficial(item.url)
          }
          
          
        }
      }
    })
    .catch(function (error) {
      console.log('Error al obtener logos:', error);
    });
  };






  useEffect(() => {
    console.log(macState)
    logoQuery()
    if(!macState.licencia){
      setRenovarLicencia(true)
    }
  }, [])

  
  return (
    <>
      {
        RenovarLicencia?
        <RenovarLicenciaJSX setRenovarLicencia={setRenovarLicencia}/>
        :
        <div style={{backgroundColor:'#091435',padding:'20px'}}>
          <Grid container spacing={0}>
            <Grid item xs={5} style={{backgroundColor:''}}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'95vh',borderRadius:'5px',fontSize:'100px',color:'white'}}>
                {
                  LogoOficial!=''&&LogoOficial!=null?
                  <img src={`data:image/jpeg;base64,${LogoOficial}`} alt="" style={{height:'100%'}}/>
                  :
                  <img src={zarteroIcon} alt="" style={{height:'100%'}}/>
                }
              </div>
              {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'95vh',borderRadius:'5px',fontSize:'100px',color:'white'}}>
                ZARTERO
              </div> */}
            </Grid>
            <Grid item xs={7} >
              <div className='img-fondo' style={{display:'flex',justifyContent:'center',alignItems:'center',height:'95vh',borderRadius:'5px'}}>
                <div style={{border:'8px solid #091435',borderRadius:'12px'}}>
                  {view}
                </div>
              </div>
            </Grid>
          </Grid>
        
        
        </div>
      }
    
    </>
  )
}

export default AuthView