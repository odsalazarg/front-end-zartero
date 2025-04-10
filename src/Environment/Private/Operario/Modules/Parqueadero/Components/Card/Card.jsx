import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Alert } from '../../../../../../../Components/Alerts/Alerts';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Modal } from '../Modal';
import Switch from '@mui/material/Switch';
import { Select } from './Components';
import { Modal as ModalVisitante} from './Components';


export default function BasicCard() {
    const alerta=new Alert()
    const [Placa, setPlaca] = useState('')
    const [Placa2, setPlaca2] = useState('')
    const [Observaciones, setObservaciones] = useState('')
    const [MostrarBotonEntrada, setMostrarBotonEntrada] = useState(false)
    const [MostrarBotonSalida, setMostrarBotonSalida] = useState(false)
    const [Apartamento, setApartamento] = useState('')
    const [Propietario, setPropietario] = useState('')
    const [Vehiculo, setVehiculo] = useState('')
    const [MostrarModal, setMostrarModal] = useState(false)
    const [MostrarModalVisitante, setMostrarModalVisitante] = useState(false)
    const [DataList, setDataList] = useState([])
    const [ParqueaderoPriv, setParqueaderoPriv] = useState(true)
    const [TorresSelect, setTorresSelect] = useState([])
    const [AptoSelect, setAptoSelect] = useState([])
    const [TipoSelect, setTipoSelect] = useState([])
    const [IDTORRE, setIDTORRE] = useState(0)
    const [IDAPTO, setIDAPTO] = useState(0)
    const [IDTIPO, setIDTIPO] = useState(0)
    const [Cedula, setCedula] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [AutorizacionResi, setAutorizacionResi] = useState([])
    const [TipoVisitante, setTipoVisitante] = useState([])
    const [IdTipoVisitante, setIdTipoVisitante] = useState(0)
    const [CrearVisitante, setCrearVisitante] = useState(false)
    const [IdAutorizacionResi, setIdAutorizacionResi] = useState(0)
    const [ID_VISITANTE, setID_VISITANTE] = useState(0)
    const [UrlFotoPerfilVisitante, setUrlFotoPerfilVisitante] = useState('')
    const [RenderCam, setRenderCam] = useState(false)
    const [PuestosCarros, setPuestosCarros] = useState('')
    const [PuestosMotos, setPuestosMotos] = useState('')
    const [VisitantePeaton, setVisitantePeaton] = useState(false)
    const [Peaton, setPeaton] = useState(false)
    const [EntradaPeaton, setEntradaPeaton] = useState(false)
    const [SalidaPeaton, setSalidaPeaton] = useState(false)
    const [LLAVELOGICA_checkingPuestosVisitante, setLLAVELOGICA_checkingPuestosVisitante] = useState(false)
    // const [ModalStatus, setModalStatus] = useState(false)

    const cerrarModal=()=>{
        setMostrarModal(false)
    }
    const cerrarModalVisitante=()=>{
        setMostrarModalVisitante(false)
    }

    function limpiarFecha(fechaString) {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
      }
      


    const Consulta=()=>{
        axios.get('http://localhost:3000/Api/Operario-Consulta', {
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
            }
            if(response.data.status===1){
                setMostrarModal(true)
                
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    let obj={
                        apartamento: item.apartamento,
                        // torre:item.torre,
                        fecha_ingreso: limpiarFecha(item.fecha_ingreso),
                        fecha_salida: item.fecha_salida===null?'Sin Datos':limpiarFecha(item.fecha_salida),
                        // id: 2,
                        observacion: item.observacion===null?'Sin Datos':item.observacion,
                        observacion_salida: item.observacion_salida===null?'Sin Datos':item.observacion_salida,
                        placa: item.placa,
                        tipo: item.tipo===1?'Carro':'Moto'
                    }
                    arr.push(obj)
                    console.log(obj)
                }

                setDataList(arr)


                // setMostrarModal(true)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    function formatearString(str) {
        if (str.toLowerCase().startsWith('ci-')) {
          return str.replace(/ci-/i, 'Cc.');
        } else {
          return str;
        }
      }
      

    const ConsultaVisitante=()=>{
        // alert(1)
        axios.get('http://localhost:3000/Api/Operario-Consulta-Visitante', {
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
            }
            if(response.data.status===1){
                setMostrarModal(true)
                
                let arr=[]
                console.log(response.data.data[0])
                for (let i = 0; i < response.data.data.length; i++) { 
                    const item = response.data.data[i];
                    console.log(item)
                    let obj={
                        visitante:item.visitante_nombre+' '+item.visitante_apellido,
                        autoriza:item.residente_nombre+' '+item.residente_apellido,
                        // torre:item.torre,
                        foto:item.visitante_foto,
                        apartamento: item.numero,
                        fecha_ingreso: limpiarFecha(item.fecha_ingreso),
                        fecha_salida: item.fecha_salida===null?'Sin Datos':limpiarFecha(item.fecha_salida),
                        // id: 2,
                        observacion: item.observacion===null?'Sin Datos':item.observacion,
                        observacion_salida: item.observacion_salida===null?'Sin Datos':item.observacion_salida,
                        placa: formatearString(item.placa),
                        tipo:item.tipo_vehiculo===1?'Carro':'Moto'
                    }
                    arr.push(obj)
                    console.log(obj)
                }

                setDataList(arr)


                // setMostrarModal(true)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }


    const Entrada=()=>{

        if(ParqueaderoPriv){
            console.log(Placa)
            if(Placa!==''){
                axios.post('http://localhost:3000/Api/Operario-InfoPlaca', {
                    Placa:Placa
                })
                .then(function (response) {
                setTimeout(() => {
                    console.log(response.data);
                    if(response.data.status===0){
                        alerta.Error({texto:response.data.msg})
                    }
                    if(response.data.status===1){
                        // alerta.Success({titulo:response.data.msg})
                        setMostrarBotonEntrada(true)
                       
                        setVehiculo('')
                        setApartamento('')
                        setPropietario('')
                        setPuestosCarros('')
                        setPuestosMotos('')
                        axios.post('http://localhost:3000/Api/Operario-Entrada', {
                            Placa:Placa,
                            Observacion:Observaciones
                        })
                        .then(function (response) {
                        setTimeout(() => {
                            console.log(response.data);
                            if(response.data.status===0){
                                alerta.Error({texto:response.data.msg})
                            }
                            if(response.data.status===1){
                                alerta.Success({titulo:response.data.msg,confirmar:true})
                                restartPropietario()
                            }
                            // setUsers(response.data.data)
                            // setLoadingState(false)
                        }, 1000);
                        
                        })
                        .catch(function (error) {
                        console.log(error);
                        alerta.ErrorSistem()
                        })

                    }
                    setVehiculo(response.data.data.vehiculo)
                    setApartamento(response.data.data.apartamento)
                    setPropietario(response.data.data.propietario)
                    setPuestosCarros(response.data.data.puesto_carro)
                    setPuestosMotos(response.data.data.puesto_moto)
                    setMostrarBotonSalida(true)
                    console.log(response.data.data)
                    console.log('a')
                    // setUsers(response.data.data)
                    // setLoadingState(false)
                }, 1000);
                
                })
                .catch(function (error) {
                console.log(error);
                alerta.ErrorSistem()
                })
            }else{
                alerta.Error({texto:'Campos Vacios'})
            }
        }

        
    }
    const Salida=()=>{
        setVehiculo('')
        setApartamento('')
        setPropietario('')
        setPuestosCarros('')
        setPuestosMotos('')
        axios.post('http://localhost:3000/Api/Operario-Salida', {
            Placa:Placa,
            Observacion:Observaciones
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
            }
            if(response.data.status===1){
                alerta.Success({titulo:response.data.msg,confirmar:true})
                restartPropietario()
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const VisitantePeatonModal=()=>{
        // setPeaton(true)
        setMostrarModalVisitante(true)
        setNombre('')
        setApellido('')
        setCedula(Placa2)
        setIdTipoVisitante(0)
        setCrearVisitante(false)
        setUrlFotoPerfilVisitante('')
        // if(IDAPTO!=0){
        //     setPeaton(true)
        //     setMostrarModalVisitante(true)
        //     setNombre('')
        //     setApellido('')
        //     setCedula('')
        //     setIdTipoVisitante(0)
        //     setCrearVisitante(false)
        //     setUrlFotoPerfilVisitante('')
        // }else{
        //     alerta.Error({texto:"Seleccione el Apto destino del visitante"})
        // }
    }

    const EntradaVisitante=()=>{

        console.log(Placa)
        console.log(IDTORRE)
        console.log(IDAPTO)
        console.log(IDTIPO)
        if(Placa!=='' && IDTORRE!=''&& IDAPTO!='' && IDTIPO!=''){
            axios.post('http://localhost:3000/Api/Operario-InfoPlaca-Visitante', {
                Placa:Placa,
                IdTorre:IDTORRE,
                IdApto:IDAPTO,
                IdTipo:IDTIPO
            })
            .then(function (response) {
            setTimeout(() => {
                console.log(response.data);
                if(response.data.status===0){
                    setMostrarModalVisitante(false)
                    alerta.Error({texto:response.data.msg})
                }
                if(response.data.status===1){
                    // alerta.Success({titulo:response.data.msg})
                    // setMostrarBotonEntrada(true)
                    setLLAVELOGICA_checkingPuestosVisitante(true)
                    
                }
                setVehiculo(response.data.data.vehiculo)
                setApartamento(response.data.data.apartamento)
                setPropietario(response.data.data.propietario)
                setPuestosCarros(response.data.data.puesto_carro)
                setPuestosMotos(response.data.data.puesto_moto)
                console.log(response.data.data)
                setMostrarBotonSalida(true)
                
            }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
        }else{
            if(Placa!=''){
                setMostrarBotonSalida(true)
            }
            setMostrarModalVisitante(false)
            alerta.Error({texto:'Campos Vacios'})
        }






        // // alert('entrada visitante')
        // setPeaton(false)
        // setMostrarModalVisitante(true)
        // // setRenderCam(true)
        // setNombre('')
        // setApellido('')
        // setCedula('')
        // setIdTipoVisitante(0)
        // setCrearVisitante(false)
        // setUrlFotoPerfilVisitante('')
        // // axios.post('http://localhost:3000/Api/Operario-Entrada', {
        // //     Placa:Placa,
        // //     Observacion:Observaciones
        // // })
        // // .then(function (response) {
        // // setTimeout(() => {
        // //     console.log(response.data);
        // //     if(response.data.status===0){
        // //         alerta.Error({texto:response.data.msg})
        // //     }
        // //     if(response.data.status===1){
        // //         alerta.Success({titulo:response.data.msg,confirmar:true})
        // //         restartPropietario()
        // //     }
        // //     // setUsers(response.data.data)
        // //     // setLoadingState(false)
        // // }, 1000);
        
        // // })
        // // .catch(function (error) {
        // // console.log(error);
        // // alerta.ErrorSistem()
        // // })
    }
    const SalidaVisitante=()=>{
        axios.post('http://localhost:3000/Api/Operario-Salida-Visitante', {
            Placa:Placa,
            Observacion:Observaciones
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
                setMostrarModalVisitante(false)
            }
            if(response.data.status===1){
                alerta.Success({titulo:response.data.msg,confirmar:true})
                setMostrarModalVisitante(false)
                restartPropietario()
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        setMostrarModalVisitante(false)
        })
    }

    const setearSelects=()=>{
        buscarTorres()
        setTimeout(() => {
            setTipoSelect([{value:1,text:'CARRO'},{value:2,text:'MOTO'},{value:3,text:'PEATON'}])
        }, 1000);
    }

    const switchParqueo=(val)=>{
        if(!val){
            setearSelects()
        }
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
        setParqueaderoPriv(val)
    }


    const resetValuesPeaton=()=>{
        // alert('reset peaton')
        // setIDTORRE(0)
        // setIDAPTO(0)
        
        setSalidaPeaton(false)
        setEntradaPeaton(false)
    }


    const registroVisitante=()=>{
        // alert('registro')
        console.log(Cedula)
        console.log(Nombre)
        console.log(Apellido)
        console.log(IdTipoVisitante)
        console.log(IdAutorizacionResi)
        console.log(UrlFotoPerfilVisitante)
        if(Cedula!='' && Nombre!='' && Apellido!='' && IdTipoVisitante!=0 && IdAutorizacionResi!=0 && UrlFotoPerfilVisitante!=""){
            console.log(Cedula)
            console.log(Nombre)
            console.log(Apellido)
            console.log(IdTipoVisitante)
            console.log(IdAutorizacionResi)
            if(CrearVisitante){
                // alert('registro VISITANTE NO EXISTE')
                axios.post('http://localhost:3000/Api/Visitante-Create', {
                    Nombre:Nombre,
                    Apellido:Apellido,
                    Cedula:Cedula,
                    IdTipoVisitante:IdTipoVisitante,
                    UrlFotoPerfilVisitante:UrlFotoPerfilVisitante
                })
                .then(function (response) {
                    setTimeout(() => {
                        console.log(response.data);
                        if(response.data.status===0){
                            alerta.Error({texto:response.data.msg})
                        }
                        if(response.data.status===1){
                            console.log(response.data.data[0])
                            // setID_VISITANTE(response.data.data[0])

                            // continuamos haciendo el registro en la tabla reg_visitante
                            // console.log(ID_VISITANTE)
                            console.log(IdAutorizacionResi)
                            // Operario-Entrada-Visitante
                            if(Peaton){
                                if(EntradaPeaton){
                                    axios.post('http://localhost:3000/Api/Operario-Entrada-Visitante-Peaton', {
                                        // ID_VISITANTE:response.data.data[0],
                                        Observacion:Observaciones,
                                        Cedula:Cedula,
                                        ID_APTO:IDAPTO,
                                        IdAutorizacionResi:IdAutorizacionResi
                                    })
                                    .then(function (response) {
                                    setTimeout(() => {
                                        console.log(response.data);
                                        if(response.data.status===0){
                                            setMostrarModalVisitante(false)
                                            resetValuesPeaton()
                                            setPeaton(false)
                                            alerta.Error({texto:response.data.msg})
                                        }
                                        if(response.data.status===1){
                                            console.log(response.data.data)
                                            // alert('registro exitoso')
                                            setMostrarModalVisitante(false)
                                            setTimeout(() => {
                                                alerta.Success({titulo:response.data.msg,confirmar:true})
                                                restartPropietario()
                                            }, 200);
                                            // setID_VISITANTE(response.data.data[0])
                                            // continuamos haciendo el registro en la tabla reg_visitante
                                            
                                        }
                                        
                                    }, 1000);
                                    
                                    })
                                    .catch(function (error) {
                                    console.log(error);
                                    alerta.ErrorSistem()
                                    })
                                }

                                if(SalidaPeaton){
                                    axios.post('http://localhost:3000/Api/Operario-Salida-Visitante-Peaton', {
                                        // ID_VISITANTE:response.data.data[0],
                                        Observacion:Observaciones,
                                        Cedula:Cedula,
                                        ID_APTO:IDAPTO,
                                        IdAutorizacionResi:IdAutorizacionResi
                                    })
                                    .then(function (response) {
                                    setTimeout(() => {
                                        console.log(response.data);
                                        if(response.data.status===0){
                                            resetValuesPeaton()
                                            setMostrarModalVisitante(false)
                                            alerta.Error({texto:response.data.msg})
                                        }
                                        if(response.data.status===1){
                                            console.log(response.data.data)
                                            // alert('registro exitoso')
                                            setMostrarModalVisitante(false)
                                            setTimeout(() => {
                                                alerta.Success({titulo:response.data.msg,confirmar:true})
                                                restartPropietario()
                                            }, 200);
                                            // setID_VISITANTE(response.data.data[0])
                                            // continuamos haciendo el registro en la tabla reg_visitante
                                            
                                        }
                                        
                                    }, 1000);
                                    
                                    })
                                    .catch(function (error) {
                                    console.log(error);
                                    alerta.ErrorSistem()
                                    })
                                }

                                if(!EntradaPeaton && !SalidaPeaton){
                                    setPeaton(false)
                                    resetValuesPeaton()
                                    setMostrarModalVisitante(false)
                                    alerta.Error({texto:'Seleccione la accion a registrar (ENTRADA / SALIDA)'})
                                }
                                
                            }else{
                                console.log(Placa)
                                console.log(Observaciones)
                                console.log(ID_VISITANTE)
                                console.log(IDAPTO)
                                console.log(IDTIPO)
                                console.log(IdAutorizacionResi)
                                axios.post('http://localhost:3000/Api/Operario-Entrada-Visitante', {
                                    Placa:Placa,
                                    Observacion:Observaciones,
                                    ID_VISITANTE:ID_VISITANTE,
                                    ID_APTO:IDAPTO,
                                    TP_VEHICULO:IDTIPO,
                                    IdAutorizacionResi:IdAutorizacionResi
                                })
                                .then(function (response) {
                                setTimeout(() => {
                                    console.log(response.data);
                                    if(response.data.status===0){
                                        setMostrarModalVisitante(false)
                                        alerta.Error({texto:response.data.msg})
                                        setLLAVELOGICA_checkingPuestosVisitante(false)
                                    }
                                    if(response.data.status===1){
                                        console.log(response.data.data)
                                        // alert('registro exitoso')
                                        setMostrarModalVisitante(false)
                                        setTimeout(() => {
                                            alerta.Success({titulo:response.data.msg,confirmar:true})
                                            restartPropietario()
                                        }, 200);
                                        // setID_VISITANTE(response.data.data[0])
                                        // continuamos haciendo el registro en la tabla reg_visitante
                                        
                                    }
                                    
                                }, 1000);
                                
                                })
                                .catch(function (error) {
                                console.log(error);
                                alerta.ErrorSistem()
                                })
                            }
                        }
                        
                    }, 1000);
                
                })
                .catch(function (error) {
                console.log(error);
                alerta.ErrorSistem()
                })
    
    
            }else{
                // alert('registro VISITANTE EXISTENTE')
                console.log(ID_VISITANTE)
                console.log(IdAutorizacionResi)
                // Operario-Entrada-Visitante
                if(Peaton){
                    if(EntradaPeaton){
                        // alert(EntradaPeaton)
                        axios.post('http://localhost:3000/Api/Operario-Entrada-Visitante-Peaton', {
                            // ID_VISITANTE:response.data.data[0],
                            Observacion:Observaciones,
                            Cedula:Cedula,
                            ID_APTO:IDAPTO,
                            IdAutorizacionResi:IdAutorizacionResi
                        })
                        .then(function (response) {
                        setTimeout(() => {
                            console.log(response.data);
                            if(response.data.status===0){
                                setMostrarModalVisitante(false)
                                resetValuesPeaton()
                                setPeaton(false)
                                alerta.Error({texto:response.data.msg})
                            }
                            if(response.data.status===1){
                                console.log(response.data.data)
                                // alert('registro exitoso')
                                setMostrarModalVisitante(false)
                                setTimeout(() => {
                                    alerta.Success({titulo:response.data.msg,confirmar:true})
                                    restartPropietario()
                                }, 200);
                                // setID_VISITANTE(response.data.data[0])
                                // continuamos haciendo el registro en la tabla reg_visitante
                                
                            }
                            
                        }, 1000);
                        
                        })
                        .catch(function (error) {
                        console.log(error);
                        alerta.ErrorSistem()
                        })
                    }

                    if(SalidaPeaton){
                        axios.post('http://localhost:3000/Api/Operario-Salida-Visitante-Peaton', {
                            // ID_VISITANTE:response.data.data[0],
                            Observacion:Observaciones,
                            Cedula:Cedula,
                            ID_APTO:IDAPTO,
                            IdAutorizacionResi:IdAutorizacionResi
                        })
                        .then(function (response) {
                        setTimeout(() => {
                            console.log(response.data);
                            if(response.data.status===0){
                                resetValuesPeaton()
                                setMostrarModalVisitante(false)
                                alerta.Error({texto:response.data.msg})
                            }
                            if(response.data.status===1){
                                console.log(response.data.data)
                                // alert('registro exitoso')
                                setMostrarModalVisitante(false)
                                setTimeout(() => {
                                    alerta.Success({titulo:response.data.msg,confirmar:true})
                                    restartPropietario()
                                }, 200);
                                // setID_VISITANTE(response.data.data[0])
                                // continuamos haciendo el registro en la tabla reg_visitante
                                
                            }
                            
                        }, 1000);
                        
                        })
                        .catch(function (error) {
                        console.log(error);
                        alerta.ErrorSistem()
                        })
                    }

                    if(!EntradaPeaton && !SalidaPeaton){
                        resetValuesPeaton()
                        setPeaton(false)
                        setMostrarModalVisitante(false)
                        alerta.Error({texto:'Seleccione la accion a registrar (ENTRADA / SALIDA)'})
                    }
                    
                }else{
                    axios.post('http://localhost:3000/Api/Operario-Entrada-Visitante', {
                        Placa:Placa,
                        Observacion:Observaciones,
                        ID_VISITANTE:ID_VISITANTE,
                        ID_APTO:IDAPTO,
                        TP_VEHICULO:IDTIPO,
                        IdAutorizacionResi:IdAutorizacionResi
                    })
                    .then(function (response) {
                    setTimeout(() => {
                        console.log(response.data);
                        if(response.data.status===0){
                            setMostrarModalVisitante(false)
                            alerta.Error({texto:response.data.msg})
                            setLLAVELOGICA_checkingPuestosVisitante(false)
                            
                        }
                        if(response.data.status===1){
                            console.log(response.data.data)
                            // alert('registro exitoso')
                            setMostrarModalVisitante(false)
                            setTimeout(() => {
                                alerta.Success({titulo:response.data.msg,confirmar:true})
                                restartPropietario()
                            }, 200);
                            // setID_VISITANTE(response.data.data[0])
                            // continuamos haciendo el registro en la tabla reg_visitante
                            
                        }
                        
                    }, 1000);
                    
                    })
                    .catch(function (error) {
                    console.log(error);
                    alerta.ErrorSistem()
                    })
                }
            }
        }else{
            setMostrarModalVisitante(false)
            alerta.Error({texto:'Campos Vacios'})
            setTimeout(() => {
                setMostrarModalVisitante(true)
            }, 1000);
            // alert('Campos Vacios')
        }
        setEntradaPeaton(false)
        setSalidaPeaton(false)

    }

    const cambiarTipoAuto=(val)=>{
        setIDTIPO(val)
        if(val===3){
            setPeaton(true)
        }else{
            setPeaton(false)
        }
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
    }
    
    const cambiarAPTO=(val)=>{
        setIDAPTO(val)
        console.log(val)
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
        Autorizacion(val)
    }

    const buscarVisitante=()=>{
        VisitantePeatonModal(true)
        // console.log(Placa)
        // console.log(IDTORRE)
        // console.log(IDAPTO)
        // console.log(IDTIPO)
        // if(Placa!=='' && IDTORRE!=''&& IDAPTO!='' && IDTIPO!=''){
        //     axios.post('http://localhost:3000/Api/Operario-InfoPlaca-Visitante', {
        //         Placa:Placa,
        //         IdTorre:IDTORRE,
        //         IdApto:IDAPTO,
        //         IdTipo:IDTIPO
        //     })
        //     .then(function (response) {
        //     setTimeout(() => {
        //         console.log(response.data);
        //         if(response.data.status===0){
        //             alerta.Error({texto:response.data.msg})
        //         }
        //         if(response.data.status===1){
        //             alerta.Success({titulo:response.data.msg})
        //             setMostrarBotonEntrada(true)
                    
        //         }
        //         setVehiculo(response.data.data.vehiculo)
        //         setApartamento(response.data.data.apartamento)
        //         setPropietario(response.data.data.propietario)
        //         setPuestosCarros(response.data.data.puesto_carro)
        //         setPuestosMotos(response.data.data.puesto_moto)
        //         console.log(response.data.data)
        //         setMostrarBotonSalida(true)
                
        //     }, 1000);
            
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        //     alerta.ErrorSistem()
        //     })
        // }else{
        //     if(Placa!=''){
        //         setMostrarBotonSalida(true)
        //     }
        //     alerta.Error({texto:'Campos Vacios'})
        // }
    }


    const resetOnChange2=(value)=>{
        setPlaca2(value)
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
        setVehiculo('')
        setApartamento('')
        setPropietario('')
        setPuestosCarros('')
        setPuestosMotos('')
    }
    const resetOnChange=(value)=>{
        setPlaca(value)
        setMostrarBotonEntrada(true)
        setMostrarBotonSalida(true)
        setVehiculo('')
        setApartamento('')
        setPropietario('')
        setPuestosCarros('')
        setPuestosMotos('')
    }


    const restartPropietario=()=>{
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
        setVehiculo('')
        setApartamento('')
        setPropietario('')
        setPlaca('')
        setPlaca2('')
        setObservaciones('')
        setIDAPTO(0)
        setAptoSelect([])
        setIDTIPO(0)
        setTipoSelect([])
        setIDTORRE(0)
        setTorresSelect([])
        setearSelects()
    }


    const buscarAPTO=(idTorre)=>{
        // alert('buscar apto '+idTorre)
        
        setMostrarBotonEntrada(false)
        setMostrarBotonSalida(false)
        setIDAPTO(0)
        setAptoSelect([])
        setIDTORRE(idTorre)
        axios.post('http://localhost:3000/Api/Departamentos-ByTorre', {
           id:idTorre
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
                setAptoSelect([])
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg,confirmar:true})
                // restartPropietario()
                let arr=[]
                console.log(response.data.data)
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={
                        value:item.a_id,
                        text:item.a_numero
                    }
                    arr.push(obj)
                    // setTorresSelect
                    
                }
                setAptoSelect(arr)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const BuscarTipoVisitante=()=>{
        axios.get('http://localhost:3000/Api/Tipo-Visitante', {
            
         })
         .then(function (response) {
         setTimeout(() => {
             console.log(response.data);
             if(response.data.status===0){
                 alerta.Error({texto:response.data.msg})
             }
             if(response.data.status===1){
                
                 let arr=[]
                 console.log(response.data.data)
                 for (let i = 0; i < response.data.data.length; i++) {
                     const item = response.data.data[i];
                     const obj={
                         value:item.id,
                         text:item.nombre
                     }
                     arr.push(obj)
                     setTipoVisitante(arr)
                 }
             }
         }, 1000);
         
         })
         .catch(function (error) {
         console.log(error);
         alerta.ErrorSistem()
         })
    }


    const Autorizacion=(val)=>{
        console.log('autorizacion')
        axios.post('http://localhost:3000/Api/Residente-ByIdApto', {
            IdApto:val
         })
         .then(function (response) {
         setTimeout(() => {
             console.log(response.data);
             if(response.data.status===0){
                 alerta.Error({texto:response.data.msg})
             }
             if(response.data.status===1){
                 // alerta.Success({titulo:response.data.msg,confirmar:true})
                 // restartPropietario()
                 let arr=[]
                 console.log(response.data.data, 'autorizacion')
                
                 // setNombre(response.data.data.nombre)
                 for (let i = 0; i < response.data.data.length; i++) {
                     const item = response.data.data[i];
                     const obj={
                         value:item.id,
                         text:item.nombre+' '+item.apellido
                     }
                     arr.push(obj)
                     setAutorizacionResi(arr)
                     // setTorresSelect
                     
                 }
                 // setTorresSelect(arr)
             }
             // setUsers(response.data.data)
             // setLoadingState(false)
         }, 1000);
         
         })
         .catch(function (error) {
         console.log(error);
         alerta.ErrorSistem()
         })
    }

    const BuscarVisitante=()=>{
        // Autorizacion()
        BuscarTipoVisitante()
        axios.post('http://localhost:3000/Api/Visitante-ByCi', {
           ci:Cedula
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alert('crear visitante')
                
                setCrearVisitante(true)
                setRenderCam(true)
                // setMostrarModalVisitante(false)
                // setTimeout(() => {
                //     alerta.Error({texto:response.data.msg})
                // }, 200);
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg,confirmar:true})
                // restartPropietario()
                // let arr=[]
                console.log(response.data.data)
                setID_VISITANTE(response.data.data[0].id)
                setNombre(response.data.data[0].nombre)
                setApellido(response.data.data[0].apellido)
                setIdTipoVisitante(response.data.data[0].id_tipo_visitante)
                setUrlFotoPerfilVisitante(response.data.data[0].foto)
                // setNombre(response.data.data.nombre)
                // for (let i = 0; i < response.data.data.length; i++) {
                //     const item = response.data.data[i];
                //     const obj={
                //         value:item.id,
                //         text:item.nombre
                //     }
                //     arr.push(obj)
                //     // setTorresSelect
                    
                // }
                // setTorresSelect(arr)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const buscarTorres=()=>{
        // /Api/Torres
        axios.get('http://localhost:3000/Api/Torres', {
           
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg,confirmar:true})
                // restartPropietario()
                let arr=[]
                console.log(response.data.data)
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={
                        value:item.id,
                        text:item.nombre
                    }
                    arr.push(obj)
                    // setTorresSelect
                    
                }
                setTorresSelect(arr)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const buscarPropietario=()=>{
        console.log(Placa)
        if(Placa!==''){
            axios.post('http://localhost:3000/Api/Operario-InfoPlaca', {
                Placa:Placa
            })
            .then(function (response) {
            setTimeout(() => {
                console.log(response.data);
                if(response.data.status===0){
                    alerta.Error({texto:response.data.msg})
                }
                if(response.data.status===1){
                    alerta.Success({titulo:response.data.msg})
                    setMostrarBotonEntrada(true)
                    // console.log(response.data.data)
                    // setVehiculo(response.data.data.vehiculo)
                    // setApartamento(response.data.data.apartamento)
                    // setPropietario(response.data.data.propietario)
                }
                setVehiculo(response.data.data.vehiculo)
                setApartamento(response.data.data.apartamento)
                setPropietario(response.data.data.propietario)
                setPuestosCarros(response.data.data.puesto_carro)
                setPuestosMotos(response.data.data.puesto_moto)
                setMostrarBotonSalida(true)
                console.log(response.data.data)
                console.log('a')
                // setUsers(response.data.data)
                // setLoadingState(false)
            }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
        }else{
            alerta.Error({texto:'Campos Vacios'})
        }
    }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button variant={ParqueaderoPriv?'contained':"outlined"} style={{backgroundColor:ParqueaderoPriv?'#23282b':'white',color:ParqueaderoPriv?'':'#23282b',border:ParqueaderoPriv?'':'1px solid #23282b'}} onClick={()=>switchParqueo(true)}>residente</Button>
                            </div>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Button variant={ParqueaderoPriv?"outlined":'contained'} style={{backgroundColor:ParqueaderoPriv?'white':'#23282b',color:ParqueaderoPriv?'#23282b':'',border:ParqueaderoPriv?'1px solid #23282b':''}} onClick={()=>switchParqueo(false)}>visitante</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                </Grid>
                {/* <Grid item xs={4}>
                    {
                        ParqueaderoPriv?
                        '':
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Button variant={ParqueaderoPriv?"outlined":'contained'} style={{backgroundColor:ParqueaderoPriv?'white':'#23282b',color:ParqueaderoPriv?'#23282b':'',border:ParqueaderoPriv?'1px solid #23282b':''}} onClick={()=>VisitantePeatonModal(true)}>visit peaton</Button>
                        </div>
                    }
                </Grid> */}
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            {/* contenido */}
            <Grid container spacing={0}>
                {
                    MostrarModal?
                    <Modal MostrarModal={MostrarModal} cerrarModal={cerrarModal} DataList={DataList} Residente={ParqueaderoPriv}/>
                    :''
                }
                {
                    MostrarModalVisitante?
                    <ModalVisitante MostrarModal={MostrarModalVisitante} cerrarModal={cerrarModalVisitante} setNombre={setNombre} Nombre={Nombre} setApellido={setApellido} Apellido={Apellido} Cedula={Cedula} setCedula={setCedula} Observaciones={Observaciones} setObservaciones={setObservaciones} buscar={BuscarVisitante} AutorizacionResi={AutorizacionResi} TipoVisitante={TipoVisitante} IdTipoVisitante={IdTipoVisitante} CrearVisitante={CrearVisitante} setCrearVisitante={setCrearVisitante} registroVisitante={registroVisitante} setIdTipoVisitante={setIdTipoVisitante} setIdAutorizacionResi={setIdAutorizacionResi} UrlFotoPerfilVisitante={UrlFotoPerfilVisitante} setUrlFotoPerfilVisitante={setUrlFotoPerfilVisitante} RenderCam={RenderCam} setRenderCam={setRenderCam} restartPropietario={restartPropietario} Peaton={Peaton} setPeaton={setPeaton} Entrada={EntradaPeaton} setEntrada={setEntradaPeaton} Salida={SalidaPeaton} setSalida={setSalidaPeaton} TorresSelect={TorresSelect} dataTipoSelect={TipoSelect} AptoSelect={AptoSelect} cambiarAPTO={cambiarAPTO} buscarAPTO={buscarAPTO} cambiarTipoAuto={cambiarTipoAuto} IDTIPO={IDTIPO} resetOnChange={resetOnChange} Placa={Placa} Placa2={Placa2} EntradaVisitante={EntradaVisitante} SalidaVisitante={SalidaVisitante} LLAVELOGICA_checkingPuestosVisitante={LLAVELOGICA_checkingPuestosVisitante} setLLAVELOGICA_checkingPuestosVisitante={setLLAVELOGICA_checkingPuestosVisitante}/>
                    :''
                }
                
                {
                    VisitantePeaton?
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Button variant="contained" color='primary' onClick={Entrada}>Entrada<LoginIcon style={{margin:'0 1px 0 2px'}}/></Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Button variant="contained" color='error' onClick={Salida}>Salida<LogoutIcon style={{margin:'0 0px 0 6px'}}/></Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    :''
                }
            
                {
                    ParqueaderoPriv?
                    <Grid item xs={4}>
                        <TextField id="outlined-basic" label="PLACA" variant="outlined" value={Placa} onChange={e=>{resetOnChange(e.target.value)}} style={{width:'100%'}}/>
                        <br /><br />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observaciones"
                            multiline
                            maxRows={4}
                            style={{width:'100%'}}
                            value={Observaciones} onChange={e=>{setObservaciones(e.target.value)}}
                        />
                        <br /><br />
                    
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {
                                        MostrarBotonEntrada?
                                        <Button variant="contained" color='primary' onClick={Entrada}>Entrada<LoginIcon style={{margin:'0 1px 0 2px'}}/></Button>
                                        :''
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {
                                        MostrarBotonSalida?
                                        <Button variant="contained" color='error' onClick={Salida}>Salida<LogoutIcon style={{margin:'0 0px 0 6px'}}/></Button>
                                        :''
                                    }
                                </div>
                            </Grid>
                        </Grid>
                        
                    
                    </Grid>
                    :
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic" label="CEDULA" variant="outlined" value={Placa2} onChange={e=>{resetOnChange2(e.target.value)}} style={{width:'100%'}}/>
                            </Grid>
                            {/* <Grid item xs={6}>
                                
                                <Select titulo={'TIPO'} arr={TipoSelect} onChange={cambiarTipoAuto}/>
                            </Grid> */}
                            
                        </Grid>               
                        
                        
                        <br />
                        <Grid container spacing={1}>
                            {/* <Grid item xs={6}>
                                <Select titulo={'TORRE'} arr={TorresSelect} onChange={buscarAPTO}/>
                            </Grid>
                            <Grid item xs={6}>
                            <Select titulo={'APTO'} arr={AptoSelect} onChange={cambiarAPTO}/>
                            </Grid> */}
                            {/* <Grid item xs={8}>
                                <TextField
                                id="outlined-multiline-flexible"
                                label="Observaciones"
                                multiline
                                maxRows={4}
                                style={{width:'100%'}}
                                value={Observaciones} onChange={e=>{setObservaciones(e.target.value)}}
                                />
                            </Grid> */}
                        </Grid>    
                        
                        <br /><br />
                    
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {
                                        MostrarBotonEntrada?
                                        <Button variant="contained" color='primary' onClick={EntradaVisitante}>Entrada<LoginIcon style={{margin:'0 1px 0 2px'}}/></Button>
                                        :''
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {
                                        MostrarBotonSalida?
                                        <Button variant="contained" color='error' onClick={SalidaVisitante}>Salida<LogoutIcon style={{margin:'0 0px 0 6px'}}/></Button>
                                        :''
                                    }
                                </div>
                            </Grid>
                        </Grid>
                        
                    
                    </Grid>
                }




                    <Grid item xs={ParqueaderoPriv?5:5}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Button variant="contained" color='primary' onClick={ParqueaderoPriv?buscarPropietario:buscarVisitante}><SearchIcon/></Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Button variant="contained" color='error' onClick={restartPropietario}><RestartAltIcon/></Button>
                                </div> */}
                            </Grid>
                            <Grid item xs={12}>
                                <br />
                                {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',fontSize:'16px'}}>
                                    <span style={{color:'blue',marginRight:'10px'}}>Vehiculo: </span><span>{Vehiculo}</span>
                                </div>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',fontSize:'16px'}}>
                                    <span style={{color:'blue',marginRight:'10px'}}>Propietario:</span> <span>{Propietario}</span>
                                </div>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',fontSize:'16px'}}>
                                    <span style={{color:'blue',marginRight:'10px'}}>Apartamento: </span><span>{Apartamento}</span>
                                </div> */}
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',fontSize:'16px'}}>
                                    <span style={{color:'blue',marginRight:'10px'}}>Puestos Carros: </span><span style={{color:PuestosCarros<=0?'red':'green',marginRight:'10px'}}>{PuestosCarros}</span>
                                </div>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'5px',fontSize:'16px'}}>
                                    <span style={{color:'blue',marginRight:'10px'}}>Puestos Motos: </span><span style={{color:PuestosMotos<=0?'red':'green',marginRight:'10px'}}>{PuestosMotos}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={ParqueaderoPriv?3:3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Button variant="contained" color='success' onClick={ParqueaderoPriv?()=>Consulta():()=>ConsultaVisitante()}>CONSULTA</Button>
                        </div>
                    </Grid>


            </Grid>

        </Grid>
      </Grid>


      </CardContent>
    </Card>
  );
}

