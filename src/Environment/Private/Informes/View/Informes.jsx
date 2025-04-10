import React from 'react'
import Grid from '@mui/material/Grid';
import {default as ExportInforme} from '../Modules/InformeTabla/InformeTabla'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {default as Formulario} from '../Modules/Formulario/Formulario'
import { Alert } from '../../../../Components/Alerts/Alerts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';




function Informes() {
    const alerta=new Alert()
    const [DataTabla, setDataTabla] = useState([])
    const [preview, setpreview] = useState(false)
    const [IdTipoInforme, setIdTipoInforme] = useState(0)
    const [Data, setData] = useState([{value:1,text:'Residentes'},{value:2,text:'Residentes - Vehículos'},{value:3,text:'Visitantes'},{value:4,text:'Visitantes - Vehículos'},{value:5,text:'Bitacora'},{value:6,text:'Paquetes'},{value:7,text:'Operarios - Sesion'}])
    const [DataTorre, setDataTorre] = useState([])
    const [IdTorre, setIdTorre] = useState(0)
    const [DataApto, setDataApto] = useState([])
    const [IdApto, setIdApto] = useState(0)
    const [Cedula, setCedula] = useState('')
    const [FechaInicio, setFechaInicio] = useState('')
    const [FechaFin, setFechaFin] = useState('')
    const [Titulo, setTitulo] = useState('')
    

    const Cancelar=()=>{
        setpreview(false)
        setIdTipoInforme(0)
        setIdTorre(0)
        setIdApto(0)
        setCedula('')
        setFechaInicio('')
        setFechaFin('')
    }

    const QueryAlasTorres=()=>{
        console.log('QueryAlasTorres')
        axios.get('http://localhost:3000/Api/Torres', {
        })
        .then(function (response) {
            if(response.data.status===1){
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
    
                setDataTorre(arr)
            }
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const getApto=()=>{
        axios.post('http://localhost:3000/Api/Departamentos-ByTorre', {
            id:IdTorre
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
                setDataApto([])
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
                setDataApto(arr)
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const Generar=()=>{
        // setpreview(true)
        // alert(IdTipoInforme)
        if(IdTipoInforme!=0){
            if(IdTipoInforme===1){
                // informe residentes
                queryResidentes()
            }
            if(IdTipoInforme===2){
                queryRegistrosResidentes()
                // informe reg residentes
            }
            if(IdTipoInforme===3){
                // informe visitantes
                queryVisitantes()
            }
            if(IdTipoInforme===4){
                // informe reg visitantes
                queryRegistrosVisitantes()
            }
            if(IdTipoInforme===5){
                // informe reg visitantes
                queryBitacora()
            }
            if(IdTipoInforme===6){
                // informe reg visitantes
                queryPedidos()
            }
            if(IdTipoInforme===7){
                // informe reg visitantes
                querySesiones()
            }
            // setpreview(true)
        }else{
            alerta.Error({texto:'Campos vacios'})
        }
        // queryResidentes()
    }

    const querySesiones=()=>{
        function convertirFecha(fechaIso) {
            const fecha = new Date(fechaIso);
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const año = fecha.getFullYear();
            const hora = fecha.getHours().toString().padStart(2, '0');
            const minuto = fecha.getMinutes().toString().padStart(2, '0');
            const segundo = fecha.getSeconds().toString().padStart(2, '0');
          
            return `${dia}/${mes}/${año} - ${hora}:${minuto}:${segundo}`;
          }
          
        console.log('sesiones')
        axios.get('http://localhost:3000/Api/operario-getSesion', {
        
        })
        .then(function (response) {
        // setTimeout(() => {
            if(response.data.status===1){
            console.log(response.data); 
            let arr=[]
            for (let i = 0; i < response.data.data.length; i++) {
                const item = response.data.data[i];
                const obj={  operario:item.nombre+' '+item.apellido,ingreso: convertirFecha(item.ingreso), salida:convertirFecha(item.salida)}
                arr.push(obj)

            }
            console.log(arr)
            setDataTabla(arr)
            setTitulo('Listado de sesiones')
            Cancelar()
            setpreview(true)
            }
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const queryPedidos=()=>{
        console.log('pedidos')
            axios.get('http://localhost:3000/Api/Pedidos', {
            
            })
            .then(function (response) {
            // setTimeout(() => {
                if(response.data.status===1){
                console.log(response.data); 
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={  operario:item.u_nombre+' '+item.u_apellido,de: item.emisor, para:item.r_nombre+' '+item.r_apellido,direccion:item.t_nombre+' '+item.a_numero, observacion: item.observacion, fecha_llegada:item.fecha_llegada,fecha_entregado:item.fecha_entrega,entregado: item.entregado===0?'NO':'SI'}
                    arr.push(obj)
    
                }
                console.log(arr)
                setDataTabla(arr)
                setTitulo('Listado de pedidos')
                Cancelar()
                setpreview(true)
                }
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
            })
        }

    const queryResidentes=()=>{
        // alert('query')
        setpreview(false)
        axios.post('http://localhost:3000/Api/Residentes-informe', {
            IdApto:IdApto,
        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status===1){
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    const result = arr.filter((molde) => molde.Id===item.id);
                    const obj={Id:item.id, Nombre: item.nombre, Apellido: item.apellido, Telefono: item.telefono, Telefono2: item.telefono2===null?'':item.telefono2, Apartamento: item.apartamento_numero,Tipo:item.tipo_residente==1?'Propietario' : (item.tipo_residente == 2 ? 'Residente' : 'Prop-Res'),Placa:item.placa,Vehiculo:item.id_tipo_vehiculo==1?'Carro' :'Moto'}
                    if(result.length>0){
                        console.log(result)
                        console.log(result[0].Placa+='|'+obj.Placa)
                        console.log(result[0].Vehiculo+='|'+obj.Vehiculo)
                    }else{
                        arr.push(obj)
                    }
                    
                    
                    
                    // arr.push(obj)
                }
                setDataTabla(arr)
                setTitulo('Listado de residentes')
                Cancelar()
                setpreview(true)
            }
            // setResidentes(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const resetFechaBD=(val)=>{
        const fechaBD = val; // Fecha que te manda el BD
        const fecha = new Date(fechaBD);
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        return fechaFormateada
    }

    const queryRegistrosResidentes=()=>{
        // alert('query')
        setpreview(false)
        axios.post('http://localhost:3000/Api/Registros-Residentes-informe', {
            IdApto:IdApto,
            FechaInicio,
            FechaFin

        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status===1){
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    
                    const resEntrada=resetFechaBD(item.fecha_ingreso)
                    const resSalida=resetFechaBD(item.fecha_salida)
                    const obj={ Fecha_ingreso: resEntrada, Obs_entrada: item.observacion, Fecha_salida: resSalida, Obs_salida: item.observacion_salida==null?'':item.observacion_salida,Tipo:item.tipo==1?'Carro' : 'Moto',Apto:item.apartamento,
                        // Torre:item.torre
                     }
                    arr.push(obj)
                }
                setDataTabla(arr)
                setTitulo('Listado de Residentes - Vehículos')
                Cancelar()
                setpreview(true)
            }
            // setResidentes(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const queryVisitantes=()=>{
        // alert('query')
        setpreview(false)
        axios.post('http://localhost:3000/Api/Visitantes-informe', {
            Cedula

        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status===1){
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    const obj={ Nombre: item.visitante_nombre, Apellido: item.apellido, Cedula: item.cedula,Tipo:item.tp_nombre }
                    arr.push(obj)
                }
                setDataTabla(arr)
                setTitulo('Listado de visitantes')
                Cancelar()
                setpreview(true)
            }
            // setResidentes(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    function formatearString(str) {
        if (str.toLowerCase().startsWith('ci-')) {
          return str.replace(/ci-/i, 'Cc.');
        } else {
          return str;
        }
      }

    const queryRegistrosVisitantes=()=>{
        // alert('query')
        setpreview(false)
        axios.post('http://localhost:3000/Api/Registros-Visitantes-informe', {
            IdApto:IdApto,
            Cedula,
            FechaInicio,
            FechaFin

        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status===1){
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    
                    const resEntrada=resetFechaBD(item.fecha_ingreso)
                    const resSalida=resetFechaBD(item.fecha_salida)
                    const obj={ Fecha_ingreso: resEntrada, Obs_entrada: item.observacion, Fecha_salida: resSalida, Obs_salida: item.observacion_salida==null?'':item.observacion_salida,Autoriza:item.residente_nombre+' '+item.residente_apellido,
                        // Torre:item.torre ,
                        Apto:item.numero,Visitante:item.visitante_nombre+' '+item.visitante_apellido,"Placa/Cc":formatearString(item.placa),Tipo:item.tipo_vehiculo==1?'Carro' : 'Moto',}
                    arr.push(obj)
                }
                setDataTabla(arr)
                setTitulo('Listado de Visitantes - Vehiculos')
                Cancelar()
                setpreview(true)
            }
            // setResidentes(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const queryBitacora=()=>{
        // alert('query')
        setpreview(false)
        axios.post('http://localhost:3000/Api/BitacoraInforme', {
            FechaInicio,
            FechaFin

        })
        .then(function (response) {
        // setTimeout(() => {
            console.log(response.data);
            if(response.data.status===1){
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    console.log(item)
                    const fecha = item.fecha;

                    const fechaNueva = new Date(fecha);

                    const dia = fechaNueva.getDate().toString().padStart(2, '0');
                    const mes = (fechaNueva.getMonth() + 1).toString().padStart(2, '0');
                    const año = fechaNueva.getFullYear();

                    const fechaFormateada = `${dia}-${mes}-${año}`;

                    // const resEntrada=resetFechaBD(item.fecha_ingreso)
                    // const resSalida=resetFechaBD(item.fecha_salida)
                    const obj={ Fecha: fechaFormateada, Bitacora: item.observacion, Operario: item.nombre+' '+item.apellido}
                    arr.push(obj)
                }
                setDataTabla(arr)
                setTitulo('Listado de bitacoras')
                Cancelar()
                setpreview(true)
            }
            // setResidentes(response.data.data)
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        // alerta.ErrorSistem()
        })
    }

    const queryEfect=()=>{
        // queryResidentes()
        QueryAlasTorres()
    }



    useEffect(() => {
        
        queryEfect()

    }, [])

    useEffect(() => {
        if(IdTorre!=0){
            // alert(true)
            getApto()
        }
        // queryEfect()

    }, [IdTorre])

    
    


  return (
    <div style={{backgroundColor:'white',padding:'20px',height:'100%',borderRadius:'5px'}}>
        <div style={{backgroundColor:''}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <div style={{margin:'0 5px',color:'#23282b'}}>
                    <ReceiptLongIcon/>
                </div>
                GENERAR INFORMES
            </div>
            <Grid container spacing={2} >
                
                {/* listado de usuarios */}

                <Grid item md={12} style={{backgroundColor:''}}>
                    <div style={{margin:'20px 90px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <h2>Configuracion</h2>
                        {/* <p>Rellene el formulario y oprima 'Generar' para obtener el informe</p> */}
                    </div>
                    <div style={{margin:'0 90px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {/* <h2>Configuracion</h2> */}
                        <p>Rellene el formulario y oprima 'Generar' para obtener el informe</p>
                    </div>
                    <div style={{width:'',margin:'0'}}>
                        <Formulario click={Generar} Data={Data} setIdTipoInforme={setIdTipoInforme} IdTipoInforme={IdTipoInforme} DataTorre={DataTorre} setIdTorre={setIdTorre} IdTorre={IdTorre} DataApto={DataApto} IdApto={IdApto} setIdApto={setIdApto}
                        handleCancelar={Cancelar} setCedula={setCedula} Cedula={Cedula} FechaInicio={FechaInicio} setFechaInicio={setFechaInicio} FechaFin={FechaFin} setFechaFin={setFechaFin}/>
                    </div>
                </Grid>
                <Grid item md={12}>
                    {
                        preview?
                        <ExportInforme data={DataTabla} titulo={Titulo} status="horizontal"/>
                        :''
                    }
                </Grid>

                
                
                
            </Grid>
        </div>
        <br /><br />
        <br /><br />
        
    </div>
  )
}

export default Informes