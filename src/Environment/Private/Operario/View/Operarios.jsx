import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import Grid from '@mui/material/Grid';
import { Torres } from '../Modules/Torres/View';
import { Apartamentos } from '../Modules/Apartamentos/View';
import { Contacto } from '../Modules/Contacto/View';
import { Parking } from '../Modules/Parqueadero/View';
import { useState } from 'react';
import { default as Modal } from '../Modules/Modal/Modal';
import { default as Bitacora } from '../Modules/Bitacora/Bitacora';
import Button from '@mui/material/Button';
import { Alert } from '../../../../Components/Alerts/Alerts';
import { useSelector } from "react-redux";
import axios from 'axios';
import {default as Select} from './Select/Select'
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

function Operarios() {
    const userState = useSelector((store) => store.user);
    const alerta = new Alert();
    const [IdTorre, setIdTorre] = useState(0);
    const [IdDepa, setIdDepa] = useState(0);
    const [NombreTorre, setNombreTorre] = useState('');
    const [NombreDepa, setNombreDepa] = useState('');
    const [ModalView, setModalView] = useState(false);
    const [texto, setTexto] = useState('');
    const [pedidoModalView, setPedidoModalView] = useState(false);
    const [receptor, setReceptor] = useState('');
    const [isFormView, setIsFormView] = useState(false);
    const [IdTorreSelect, setIdTorreSelect] = useState(0)
    const [TorresData, setTorresData] = useState([])
    const [AptoData, setAptoData] = useState([])
    const [IdAptoSelect, setIdAptoSelect] = useState(0)
    const [ResidenteData, setResidenteData] = useState([])
    const [IdResidenteSelect, setIdResidenteSelect] = useState(0)
    const [PedidosData, setPedidosData] = useState([])
    const [ViewBitacora, setViewBitacora] = useState(false)

    const PermisoBitacora=()=>{
        console.log(userState)
        axios.post('http://localhost:3000/Api/Menu-Permisos', {
            IdUser:userState.id
        })
        .then(function (response) {
            console.log(response.data);
            console.log(response.data.data[0].tp_user)
            if(response.data.status===1){ 
                if(response.data.data[0].tp_user==4){
                    setViewBitacora(true)
                }else{
                    setViewBitacora(false)
                    // alerta.Error({texto:'Sin permisos'})
                }
            
            }else{        
            }
    
    
        })
        .catch(function (error) {
            console.log(error);
            
        })
    }



    const abrirBitacora = () => {
        setTexto('');
        setModalView(true);
    };

    const obtenerFechaFormateada = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    };

    const handleGuardarBitacora = () => {
        if (texto !== '') {
            axios.post('http://localhost:3000/Api/Bitacora', {
                texto,
                IdUser: userState.id,
                fecha: obtenerFechaFormateada()
            })
                .then(function (response) {
                    if (response.data.status == 1) {
                        setModalView(false);
                        alerta.Success();
                    } else {
                        setData([]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alerta.ErrorSistem();
                });
        } else {
            setModalView(false);
            alerta.Error({ texto: 'Campos vacios' });
        }
    };

    const handleCancelarBitacora = () => {
        setTexto('');
        setModalView(false);
    };

    const abrirPedido = () => {
        queryTorres()
        queryPedidos()
        setPedidoModalView(true);
        setIsFormView(false);
    };

    const realizarEntregaPedido = (id) => {
        // alert(id);
        axios.post('http://localhost:3000/Api/Pedidos-Entregado', [{
            Id:id
        }])
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                alerta.Error({texto:response.data.msg})
                // setAptoData([])
            }
            if(response.data.status===1){
                // alerta.Success({titulo:response.data.msg})
                // restartPropietario()
                // let arr=[]
                setPedidosData([])
                queryPedidos()
                console.log(response.data.data)
                
            }
            // setUsers(response.data.data)
            // setLoadingState(false)
        }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })

    };

    const handleCancelarPedido = () => {
        setPedidoModalView(false);
        setIsFormView(false);
        // setEmisor('');
        setReceptor('');
        // setObservacion('');
    };

    const handleAgregarPedido = () => {
        setIsFormView(true);
    };

    

    const queryTorres=()=>{
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
                setTorresData(arr)
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

    const getApto=()=>{
        axios.post('http://localhost:3000/Api/Departamentos-ByTorre', {
            id:IdTorreSelect
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
                setAptoData([])
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
                setAptoData(arr)
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

    const getResidente=()=>{
        axios.post('http://localhost:3000/Api/Residente-ByIdApto', {
            IdApto:IdAptoSelect
        })
        .then(function (response) {
        setTimeout(() => {
            console.log(response.data);
            if(response.data.status===0){
                // alerta.Error({texto:response.data.msg})
                setResidenteData([])
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
                        text:item.nombre+' '+item.apellido
                    }
                    arr.push(obj)
                    // setTorresSelect
                    
                }
                setResidenteData(arr)
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

    const queryPedidos=()=>{
        axios.get('http://localhost:3000/Api/Pedidos', {
        
        })
        .then(function (response) {
        // setTimeout(() => {
            if(response.data.status===1){
            console.log(response.data); 
            let arr=[]
            for (let i = 0; i < response.data.data.length; i++) {
                const item = response.data.data[i];
                const obj={ id: item.p_id, operario:item.u_nombre+' '+item.u_apellido,emisor: item.emisor, receptor:item.r_nombre+' '+item.r_apellido,direccion:item.t_nombre+' '+item.a_numero, observacion: item.observacion, entregado: item.entregado}
                arr.push(obj)

            }
            console.log(arr)
            setPedidosData(arr)
            }
            // setLoadingState(false)
        // }, 1000);
        
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }

    const PedidoModalContent = () => {
        const [emisor, setEmisor] = useState('');
        const [observacion, setObservacion] = useState('');

        const CrearPedidoNuevo = () => {
            // alert('Pedido creado');
            console.log(emisor)
            console.log(receptor)
            console.log(observacion)
            console.log(userState.id)
            if(emisor!='' && IdTorreSelect!=0 && IdAptoSelect!=0 && IdResidenteSelect!=0 && observacion!=''){
                let arr=[{IdUser:userState.id,emisor,IdTorreSelect,IdAptoSelect,IdResidenteSelect,observacion}]
                axios.post('http://localhost:3000/Api/Pedidos-Create',arr)
                .then(function (response) {
                    console.log(response.data);
                    if(response.data.status===1){
                    // alert('registro exitoso!')
                    // setTimeout(() => {
                        // renderizarLista(true)
                        // setLoadingState(false)
                        // setTimeout(() => {
                            alerta.Success()
                            cerraModal2()
                            handleCancelarPedido()
                        // }, 1300);
                    // }, 1000);
                    }else{
                    // alert(response.data.msg)
                    // setTimeout(() => {
                    //     setLoadingState(false)
                    //     setTimeout(() => {
                            alerta.Error({texto:response.data.msg})
                    //     }, 300);
                    // }, 1000);
                    }
            
            
                })
                .catch(function (error) {
                    console.log(error);
                    alerta.ErrorSistem()
                })
            }else{
                alerta.Error({texto:'Campos vacios'})
            }
        };

        const cerraModal2=()=>{
            setEmisor('')
            setObservacion('')
            setIdAptoSelect(0)
            setIdResidenteSelect(0)
            setIdTorreSelect(0)
            setIsFormView(false)
        }
        

        const data = [
            { id: 1, emisor: 'Emisor 1', receptor: 'Receptor 1', observacion: 'Observación 1', entregado: 0 },
            { id: 2, emisor: 'Emisor 2', receptor: 'Receptor 2', observacion: 'Observación 2', entregado: 0 },
            { id: 3, emisor: 'Emisor 3', receptor: 'Receptor 3', observacion: 'Observación 3', entregado: 0 }
        ];

        // useEffect(() => {
        //     queryTorres()
        //     queryPedidos()
        // }, [])

        return (
            <div style={{ padding: '20px', minWidth: '800px', minHeight: '500px', position: '' }}>
                {!isFormView ? (
                    <div>
                        
                        <div style={{ marginBottom: '70px', textAlign: 'center' }}>
                            <h2 style={{ margin: 0 }}>Historial de Pedidos</h2>
                        </div>
                        <table style={{ 
                            width: '100%', 
                            borderCollapse: 'collapse', 
                            marginTop: '20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5' }}>
                                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Emisor</th>
                                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Direccion</th>
                                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Receptor</th>
                                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Observación</th>
                                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Entregado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    PedidosData.length>0?
                                    PedidosData.map((item) => (
                                        <tr key={item.id} style={{ backgroundColor: 'white' }}>
                                            <td style={{ border: '1px solid #eee', padding: '12px' }}>{item.emisor}</td>
                                            <td style={{ border: '1px solid #eee', padding: '12px' }}>{item.direccion}</td>
                                            <td style={{ border: '1px solid #eee', padding: '12px' }}>{item.receptor}</td>
                                            <td style={{ border: '1px solid #eee', padding: '12px' }}>{item.observacion}</td>
                                            <td style={{ border: '1px solid #eee', padding: '12px' }}>
                                                {item.entregado === 0 ? (
                                                    <input 
                                                        type="checkbox" 
                                                        onChange={()=>realizarEntregaPedido(item.id)} 
                                                        style={{ transform: 'scale(1.2)' }}
                                                    />
                                                ) : (
                                                    <span style={{ color: '#4CAF50' }}>✓ Entregado</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                    :''
                                }
                            </tbody>
                        </table>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginTop: '70px',
                            position: '',
                            bottom: '20px',
                            width: 'calc(100% - 40px)'
                        }}>
                            <Button 
                                variant="contained" 
                                style={{ backgroundColor: '#757575', color: 'white' }}
                                onClick={handleCancelarPedido}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={handleAgregarPedido}
                            >
                                Agregar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '0px', height: '100%' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Nuevo Pedido</h2>
                        <div style={{ 
                            maxWidth: '600px', 
                            margin: '0 auto',
                            height: 'calc(100% - 100px)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{ marginBottom: '25px' }}>
                                    
                                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Para:</label>
                                    <Grid container spacing={2}>
                                        <Grid item md={4}>
                                            <Select titulo={'Torre'} data={TorresData} Value={IdTorreSelect} setValue={setIdTorreSelect}/>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Select titulo={'Apartamento'} data={AptoData} Value={IdAptoSelect} setValue={setIdAptoSelect}/>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Select titulo={'Residente'} data={ResidenteData} Value={IdResidenteSelect} setValue={setIdResidenteSelect}/>
                                        </Grid>
                                    </Grid>
                                    
                                </div>
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>De:</label>
                                    <TextField id="outlined-basic" label="Emisor" variant="outlined" onChange={(e)=>{setEmisor(e.target.value)}} value={emisor} style={{width:'100%'}}/>
                                    
                                    
                                </div>
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Observación:</label>
                                    <textarea
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                        style={{ 
                                            width: '100%', 
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            height: '120px',
                                            resize: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'flex-end',
                                gap: '15px',
                                marginTop: '30px'
                            }}>
                                <Button 
                                    variant="outlined" 
                                    style={{ 
                                        borderColor: '#757575',
                                        color: '#757575'
                                    }}
                                    onClick={() => cerraModal2()}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={CrearPedidoNuevo}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        PermisoBitacora()
    }, [])
    

    useEffect(() => {
        if(IdTorreSelect!=0){
        getApto()
        }
    }, [IdTorreSelect])

    useEffect(() => {
        if(IdAptoSelect!=0){
        getResidente()
        }
    }, [IdAptoSelect])
    

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', height: '100%', borderRadius: '5px' }}>
            <div style={{ backgroundColor: '' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                    {/* <div style={{ margin: '0 5px', color: 'grey' }}>
                        <InventoryIcon/>
                    </div>
                    OPERARIO */}
                </div>
                {ModalView ?
                    <Modal open={ModalView} setOpen={setModalView} titulo={'Bitácora del Operario'} view={<Bitacora texto={texto} setTexto={setTexto} handleCancelar={handleCancelarBitacora} handleGuardar={handleGuardarBitacora} />} maxWidth={'xl'} />
                    : ''}
                {pedidoModalView &&
                    <Modal 
                        open={pedidoModalView} 
                        setOpen={setPedidoModalView} 
                        titulo={isFormView ? '' : ''} 
                        view={<PedidoModalContent />} 
                        maxWidth={'lg'}
                        style={{ minWidth: '900px', minHeight: '600px' }}
                    />
                }
                <Grid container spacing={2}>
                    <Grid item md={9}>
                        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                            {/* <Button variant='contained' onClick={abrirPedido}>Pedidos</Button> */}
                        </div>
                    </Grid>
                    {
                        ViewBitacora?
                        <Grid item md={1.5}>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <Button variant='contained' style={{backgroundColor:'#091435'}} onClick={abrirBitacora}>Bitácora</Button>
                            </div>
                        </Grid>
                        :''
                    }
                    <Grid item md={ViewBitacora?1.5:3}>
                        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                            <Button style={{backgroundColor:'#091435'}} variant='contained' onClick={abrirPedido}>paquetes</Button>
                        </div>
                    </Grid>
                    
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '' }}>
                                TORRES
                            </div>
                            <Torres setIdTorre={setIdTorre} IdTorre={IdTorre} setIdDepa={setIdDepa} setNombreTorre={setNombreTorre} />
                        </Grid>
                        <Grid item md={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '' }}>
                                APARTAMENTOS
                            </div>
                            <Apartamentos IdTorre={IdTorre} IdDepa={IdDepa} setIdDepa={setIdDepa} setNombreDepa={setNombreDepa} />
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Grid item md={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>LISTA DE CONTACTOS</div>
                            <div style={{ backgroundColor: '', height: '285px', overflowY: 'auto', overflowX: "hidden" }}>
                                <Contacto NombreTorre={NombreTorre} setNombreTorre={setNombreTorre} NombreApto={NombreDepa} setNombreApto={setNombreDepa} setIdTorre={setIdTorre} setIdApto={setIdDepa} IdDepa={IdDepa} />
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                                PARQUEADEROS
                            </div>
                            <Parking />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <br />
        </div>
    );
}

export default Operarios;