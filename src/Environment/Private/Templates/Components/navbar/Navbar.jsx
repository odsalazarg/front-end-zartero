import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
// import { supabase } from '../../../../../services/supabaseConfig';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../../../redux/states/user';
import { updateMac } from '../../../../../redux/states/mac';
import { Drawer } from './components';
import {default as Drawer2} from './components/drawer/Drawer2'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux"
import { Alert } from '../../../../../Components/Alerts/Alerts';

// import { Contador } from '../../modules/contadorMisTorneos/view';

export default function ButtonAppBar({view}) {
  const alerta=new Alert()
  const navigate = useNavigate();
  const macState=useSelector((store)=>store.mac);
  const userState=useSelector((store)=>store.user);
  const macOFFState=useSelector((store)=>store.macOFF);
  const [OpenDrawer, setOpenDrawer] = useState(false)
  const [ViewModel, setViewModel] = useState(<></>)
  
  // const [ContadorJSX, setContadorJSX] = useState(<></>)
    const dispatch=useDispatch();

    const cerrarSesion=async()=>{
      console.log(userState)
        axios.post('http://localhost:3000/Api/operario-cierreSesion', {
          IdUser:userState.id
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data.status===1){
            // dispatch(createUser({userName:response.data.user,token:response.data.accessToken,id:response.data.id}))
            // navigate("/private");
            dispatch(resetUser())
            
          }else{
            alert(response.data.msg)
            
          }
    
    
    
        })
        .catch(function (error) {
          console.log(error);
        })

        
        // navigate('/awdadwd');
    }
    const handleDrawer=()=>{
      // alert('click')
      // setContadorJSX(<Contador/>)
      setOpenDrawer(true)
    }

    const handleNavigate=(url)=>{
      // alert(url)
      navigate(url);
    }

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

    function compararFechas(fecha_actual, fecha_limite) {
      // Convertimos los strings a objetos Date
      const actual = new Date(fecha_actual);
      const limite = new Date(fecha_limite);
      
      // Eliminamos las horas/minutos/segundos para comparar solo fechas
      actual.setHours(0, 0, 0, 0);
      limite.setHours(0, 0, 0, 0);
      
      // Retornamos true si actual es menor que límite
      return actual < limite;
  }
    

    const LicenciaMAC=()=>{ 
      console.log(macState)
      // cerrarSesion() 
      axios.get(`https://zartero.checkon.pro/api/check-license?mac=${macState.mac}`, {
      })
      .then(function (response) {
      // setTimeout(() => {
        console.log(response.data);
        if(response.data.end_plan!=true){
          console.log('entro no licencia')
          dispatch(updateMac({licencia:false}))
          cerrarSesion()
        } 
          
      })
      .catch(function (error) {
      console.log(error);
      console.log(macOFFState)
        if(!macOFFState.licencia){
          dispatch(updateMac({licencia:false}))
          cerrarSesion()
        }
        if(macOFFState.licencia){
          // verificar la fecha con el stateMacOFF 
          if(compararFechas(getCurrentDate(),macOFFState.fecha) && macState.mac===macOFFState.mac){
            dispatch(updateMac({licencia:true}))
          }else{
            dispatch(updateMac({licencia:false}))
            cerrarSesion()
          }
          
        }
      })
    }

    useEffect(() => {
      // Ejecutar verificación inicial
      LicenciaMAC();
      
      // Configurar intervalo para ejecutar cada hora
      const intervalId = setInterval(() => {
        LicenciaMAC();
      }, 3600000); // 3600000 ms = 1 hora
      
      // Limpieza del intervalo cuando el componente se desmonte
      return () => {
        clearInterval(intervalId);
      };
    }, []); 
    

    useEffect(() => {
      if(view!=ViewModel){
        // LicenciaMAC()
        setViewModel(view)
      }
        // alert('cambio de pantalla')
        // console.log(view)
      
    }, [view])
    
    

  return (
    <Box sx={{ flexGrow: 1 }} >
      
      <Drawer2 setOpenDrawer={setOpenDrawer} OpenDrawer={OpenDrawer} view={view} cerrarSesion={cerrarSesion}/>
    </Box>
  );
}