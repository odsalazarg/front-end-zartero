import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '../Modules/Card/Card'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import GraficaVisitante from '../Modules/Graficas/GraficaVisitante'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function Home() {
  const userState=useSelector((store)=>store.user);
  const navigate = useNavigate();
  const [Users, setUsers] = useState('')
  const [Torres, setTorres] = useState('')
  const [APTO, setAPTO] = useState('')
  const [PARK, setPARK] = useState('')
  const [RegVisitanteData, setRegVisitanteData] = useState([])
    const [RegResidenteData, setRegResidenteData] = useState([])
    const [RegVisitantePeatonData, setRegVisitantePeatonData] = useState([])


  const data = [
    { name: '1', value: 2 },
    { name: '2', value: 5.5 },
    { name: '3', value: 2 },
    { name: '5', value: 8.5 },
    { name: '8', value: 1.5 },
    { name: '10', value: 5 },
  ];


  const Permisos=()=>{
    console.log(userState)
    axios.post('http://localhost:3000/Api/Menu-Permisos', {
        IdUser:userState.id
    })
    .then(function (response) {
        console.log(response.data);
        console.log(response.data.data[0].tp_user)
        if(response.data.status===1){ 
            if(response.data.data[0].tp_user==1||response.data.data[0].tp_user==3){
              queryUser1()
            }else{
              queryUser2()
            }
        
        }else{        
        }


    })
    .catch(function (error) {
        console.log(error);
        
    })
  }

  const queryUser1=()=>{
    console.log('queryefect LIST')
    // setLoadingState(true)
      axios.post('http://localhost:3000/Api/Users', {
          IdUser:userState.id
        })
        .then(function (response) {
            if(response.data.status===1){

              console.log(response.data);
              setUsers(response.data.data.length)
              // setLoadingState(false)
            }
          
          
        })
        .catch(function (error) {
          console.log(error);
          // alerta.ErrorSistem()
        })
  }

  const queryUser2=()=>{
    console.log('queryefect LIST')
    // setLoadingState(true)
      axios.get('http://localhost:3000/Api/UsersOperarios', {
          
        })
        .then(function (response) {
            if(response.data.status===1){
              console.log(response.data);
              setUsers(response.data.data.length)

            }else{
              setUsers('0')
            }
            // setLoadingState(false)
          
          
        })
        .catch(function (error) {
          console.log(error);
          // alerta.ErrorSistem()
        })
  }


  const queryUsuarios=()=>{
    axios.get('http://localhost:3000/Api/Users', {

    })
    .then(function (response) {
    // setTimeout(() => {
      if(response.data.status===1){
        setUsers(response.data.data.length)
      }else{
        setUsers('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const queryAPTO=()=>{
    axios.get('http://localhost:3000/Api/Departamentos', {

    })
    .then(function (response) {
    // setTimeout(() => {
      if(response.data.status===1){
        setAPTO(response.data.data.length)
      }else{
        setAPTO('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }
  const queryPARK=()=>{ 
    axios.get('http://localhost:3000/Api/ParqueaderosDASHBOARD', {

    })
    .then(function (response) {
    // setTimeout(() => {
      if(response.data.status===1){
        if(response.data.tipo_almacen[0].id===1){
          setPARK(response.data.data.length)
        }
        if(response.data.tipo_almacen[0].id===2){
          console.log(response.data.data)
          let cantidad=response.data.data[0].motos+response.data.data[0].carros
          setPARK(cantidad)
        }
        
      }else{
        setPARK('0')
      }
        console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const queryTorres=()=>{
    axios.get('http://localhost:3000/Api/Torres', {

    })
    .then(function (response) {
    // setTimeout(() => {
      if(response.data.status===1){
        setTorres(response.data.data.length)
      }else{
        setTorres('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const queryVisitantes=()=>{
    axios.get('http://localhost:3000/Api/Dashboard', {

    })
    .then(function (response) {
    // setTimeout(() => {
      console.log(response.data)
      let arr=[]
      if(response.data.status===1){
        for (let i = 0; i < response.data.data.length; i++) {
          const item = response.data.data[i];
          console.log(item)
          const fechaBD = item.fecha_ingreso; // Fecha que te manda el BD
          const fecha = new Date(fechaBD);
          const año = fecha.getFullYear();
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const dia = fecha.getDate().toString().padStart(2, '0');

          const fechaFormateada = `${año}-${mes}-${dia}`;
          console.log(fechaFormateada); // Salida: "2025-01-28"
          const res=compararFechas(fechaFormateada)
          if(res){
            const result = arr.filter((molde) => molde.name===fechaFormateada);
            const obj={
              name:fechaFormateada,
              value:1,
            }
            if(result.length>0){
              console.log(result)
              console.log(result[0].value++)
            }else{
              arr.push(obj)
            }
          }
          
           // Salida: "2025-01-28"


        }
        console.log(arr)
        setRegVisitanteData(arr)
        // setTorres(response.data.data.length)
      }else{
        // setTorres('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const queryVisitantesPeaton=()=>{
    axios.get('http://localhost:3000/Api/Dashboard-VisitantesPeaton', {

    })
    .then(function (response) {
    // setTimeout(() => {
      console.log(response.data)
      let arr=[]
      if(response.data.status===1){
        for (let i = 0; i < response.data.data.length; i++) {
          const item = response.data.data[i];
          console.log(item)
          const fechaBD = item.fecha_ingreso; // Fecha que te manda el BD
          const fecha = new Date(fechaBD);
          const año = fecha.getFullYear();
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const dia = fecha.getDate().toString().padStart(2, '0');

          const fechaFormateada = `${año}-${mes}-${dia}`;
          console.log(fechaFormateada); // Salida: "2025-01-28"
          const res=compararFechas(fechaFormateada)
          function checkIfStartsWithCI(inputString) {
            // Verifica si la cadena es válida (no es null o undefined)
            if (!inputString) return false;
            
            // Convierte a string en caso de que se pase otro tipo de dato
            const str = String(inputString);
            
            // Verifica si comienza con 'ci-' (case sensitive)
            return str.startsWith('ci-');
            
            // Alternativa usando expresión regular:
            // return /^ci-/.test(str);
          }
          if(checkIfStartsWithCI(item.placa)){
            if(res){
              const result = arr.filter((molde) => molde.name===fechaFormateada);
              const obj={
                name:fechaFormateada,
                value:1,
              }
              if(result.length>0){
                console.log(result)
                console.log(result[0].value++)
              }else{
                arr.push(obj)
              }
            }
          }
          
           // Salida: "2025-01-28"


        }
        console.log(arr)
        setRegVisitantePeatonData(arr)
        // setTorres(response.data.data.length)
      }else{
        // setTorres('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const compararFechas=(fechaVariable)=> {
    const fechaActual = new Date();
    const fecha30DiasAtras = new Date(fechaActual.getTime() - 30 * 24 * 60 * 60 * 1000);
  
    const fechaVariableDate = new Date(fechaVariable);
    const fecha30DiasAtrasDate = new Date(fecha30DiasAtras);
  
    if (fechaVariableDate >= fecha30DiasAtrasDate) {
      return true;
    } else {
      return false;
    }
  }
  

  const queryResidentes=()=>{
    axios.get('http://localhost:3000/Api/Dashboard-Residentes', {

    })
    .then(function (response) {
    // setTimeout(() => {
      console.log(response.data)
      let arr=[]
      if(response.data.status===1){
        for (let i = 0; i < response.data.data.length; i++) {
          const item = response.data.data[i];
          console.log(item)
          const fechaBD = item.fecha_ingreso; // Fecha que te manda el BD
          const fecha = new Date(fechaBD); 
          const año = fecha.getFullYear();
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const dia = fecha.getDate().toString().padStart(2, '0');

          const fechaFormateada = `${año}-${mes}-${dia}`;
          console.log(fechaFormateada); 
          const res=compararFechas(fechaFormateada)// Salida: "2025-01-28"
          if(res){
            const result = arr.filter((molde) => molde.name===fechaFormateada);
            const obj={
              name:fechaFormateada,
              value:1,
            }
            if(result.length>0){
              console.log(result)
              console.log(result[0].value++)
            }else{
              arr.push(obj)
            }
          }
          
           // Salida: "2025-01-28"


        } 
        console.log(arr)
        setRegResidenteData(arr)
        // setTorres(response.data.data.length)
      }else{
        // setTorres('0')
      }
        // console.log(response.data);
        // setData(response.data.data)
        // setLoadingState(false)
    // }, 1000);

    })
    .catch(function (error) {
    console.log(error);
    // alerta.ErrorSistem()
    })
  }

  const redireccion=()=>{
    console.log(userState)
    axios.post('http://localhost:3000/Api/Menu-Permisos', {
      IdUser:userState.id
    })
    .then(function (response) {
      console.log(response.data);
      // console.log(response.data.data[0].tp_user)
      if(response.data.status===1){ 
        if(response.data.data[0].tp_user==4){
          navigate('/private/Operario');
        }
      }else{        
      }


    })
    .catch(function (error) {
      console.log(error);
      
    })
  }

  const queryEffect=()=>{
    redireccion()
    // queryUsuarios()
    queryTorres()
    queryAPTO()
    queryPARK()
    queryVisitantes()
    queryResidentes()
    queryVisitantesPeaton()
    Permisos()
  }

  useEffect(() => {
    queryEffect()
  }, [])
  
    
    
  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px',marginBottom:'45px'}}>


          <Grid container spacing={2}>
            {/* arriba */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Card titulo={'USUARIOS'} contenido={Users}/>
                </Grid>
                <Grid item xs={3}>
                  <Card titulo={'TORRES'} contenido={Torres}/>
                </Grid>
                <Grid item xs={3}>
                  <Card titulo={'APARTAMENTOS'} contenido={APTO}/>
                </Grid>
                <Grid item xs={3}>
                  <Card titulo={'PARQUEADEROS'} contenido={PARK}/>
                </Grid>
              </Grid>


            </Grid>
            {/* abajo */}
            <Grid item xs={12}>
            
              <Grid container spacing={2}>
                <Grid item xs={4} >
                  <GraficaVisitante title={'Vehículos Visitantes Registrados'} data={RegVisitanteData}/>
                  
                </Grid>

                <Grid item xs={4} >
                  
                  <GraficaVisitante title={'Vehículos Residentes Registrados'} data={RegResidenteData}/>
                  
                </Grid>

                <Grid item xs={4} >
                  
                  <GraficaVisitante title={'Visitantes Registrados'} data={RegVisitantePeatonData}/>
                  
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          
        
        
    </div>
  )
}

export default Home