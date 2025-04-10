import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';
import { useSelector } from "react-redux"
import {default as ModalJSX} from './Modal'
import {default as TablaRegistro} from './InformeTabla'

const Tabla = ({titulos, data, NombreTorre, NombreApto, setIdTorre, setNombreTorre, setNombreApto, setIdApto,IdDepa}) => {
    const userState=useSelector((store)=>store.user);
    const [columns, setcolumns] = useState([]);
    const [Render, setRender] = useState(false);
    const [rows, setrows] = useState([]);
    const [PermisoRenderVacio, setPermisoRenderVacio] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);
    
    // Estados para el manejo de llamadas
    const [isCallActive, setIsCallActive] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [callDialogOpen, setCallDialogOpen] = useState(false);
    const [activePhoneNumber, setActivePhoneNumber] = useState('');
    const [callInterval, setCallInterval] = useState(null);
    const [ModalView, setModalView] = useState(false)
    const [DataTabla, setDataTabla] = useState([])

    // Formatea la duración de segundos a minutos:segundos
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const obtenerFechaSQL = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    };

    const GuardarRegistroLlamada = (IdResidente) => {
        console.log('Registro de llamada guardado');
        axios.post('http://localhost:3000/Api/RegistroLLamada-create', {
            IdUser:userState.userName,
            IdDepa:NombreApto,
            IdResidente,
            Fecha:obtenerFechaSQL()
        })
        .then(function (response) {
            console.log(response.data);
            // console.log(response.data.data[0].tp_user)
            // if(response.data.status===1){ 
            //     if(response.data.data[0].tp_user==4){
            //         navigate('/private/Operario');
            //     }
            // }else{        
            // }
    
    
        })
        .catch(function (error) {
            console.log(error);
            
        })
    };

    // Inicializa la conexión con el módem
    const initializeModem = async () => {
        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            return port;
        } catch (error) {
            console.error('Error al inicializar el módem:', error);
            return null;
        }
    };

    // Marca el número de teléfono
    const dialNumber = async (port, phoneNumber) => {
        try {
            const encoder = new TextEncoder();
            const writer = port.writable.getWriter();
            await writer.write(encoder.encode(`ATD${phoneNumber}\r\n`));
            writer.releaseLock();
            return true;
        } catch (error) {
            console.error('Error al marcar el número:', error);
            return false;
        }
    };

    // Función mejorada para colgar la llamada
    const hangUp = async (port) => {
        try {
            const encoder = new TextEncoder();
            const writer = port.writable.getWriter();
            
            // Enviar secuencia de comandos AT más robusta para colgar
            await writer.write(encoder.encode('+++\r\n')); // Comando de escape
            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
            
            await writer.write(encoder.encode('ATH0\r\n')); // Comando específico para colgar
            await new Promise(resolve => setTimeout(resolve, 500)); // Esperar respuesta
            
            await writer.write(encoder.encode('AT+CHUP\r\n')); // Comando alternativo para colgar
            await new Promise(resolve => setTimeout(resolve, 500));
            
            writer.releaseLock();
            return true;
        } catch (error) {
            console.error('Error al colgar:', error);
            return false;
        }
    };

    // Función principal para realizar llamada
    const llamar = async (telf,IdResidente) => {
        if (isCallActive) {
            return;
        }

        setActivePhoneNumber(telf);
        const port = await initializeModem();
        
        if (port) {
            const success = await dialNumber(port, telf);
            
            if (success) {
                setIsCallActive(true);
                setCallDialogOpen(true);
                
                // Agregar el registro de la llamada
                GuardarRegistroLlamada(IdResidente);

                // Inicia el temporizador
                const interval = setInterval(() => {
                    setCallDuration(prev => prev + 1);
                }, 1000);
                
                setCallInterval(interval);
            } else {
                alert('Error al realizar la llamada. Verifica la conexión del módem.');
            }
        } else {
            alert('Error al inicializar el módem. Verifica la conexión.');
        }
    };

    // Función mejorada para terminar la llamada
    const endCall = async () => {
        try {
            const port = await initializeModem();
            if (port) {
                // Intentar colgar la llamada
                const success = await hangUp(port);
                
                if (success) {
                    // Limpiar el temporizador y estados
                    if (callInterval) {
                        clearInterval(callInterval);
                    }
                    setIsCallActive(false);
                    setCallDialogOpen(false);
                    setCallDuration(0);
                    setActivePhoneNumber('');
                    
                    // Cerrar el puerto
                    await port.close();
                } else {
                    throw new Error('No se pudo colgar la llamada');
                }
            }
        } catch (error) {
            console.error('Error al finalizar la llamada:', error);
            alert('Error al colgar la llamada. Por favor, intente nuevamente.');
            
            // Forzar la limpieza de estados incluso si hay error
            if (callInterval) {
                clearInterval(callInterval);
            }
            setIsCallActive(false);
            setCallDialogOpen(false);
            setCallDuration(0);
            setActivePhoneNumber('');
        }
    };

    const ReiniciarTabla = () => {
        setPermisoRenderVacio(false);
        setDatosFiltrados(rows);
        setIdTorre(0);
        setIdApto(0);
        setNombreTorre('');
        setNombreApto('');
    };

    const filtrarTorre = (NombreTorre) => {
        setPermisoRenderVacio(true);
        setDatosFiltrados(rows);
        console.log('filtro torre', NombreTorre);
        const filtro = NombreTorre;
        const datosFiltradoss = rows.filter((row) => {
            return row.t_nombre.toString().toLowerCase().includes(filtro.toLowerCase());
        });
        console.log(datosFiltradoss);
        setDatosFiltrados(datosFiltradoss);
    };

    const filtrarApto = (NombreApto) => {
        console.log('filtro apto', NombreApto);
        console.log(NombreTorre);
        const datosFiltradoss = rows.filter((row) => {
            return (
                row.a_numero.toString().toLowerCase().includes(NombreApto.toLowerCase()) &&
                row.t_nombre.toString().toLowerCase().includes(NombreTorre.toLowerCase())
            );
        });
        console.log(datosFiltradoss);
        setDatosFiltrados(datosFiltradoss);
    };



    const MostrarRegistro=()=>{
        console.log('Registro de llamada guardado');
        axios.get('http://localhost:3000/Api/RegistroLLamada', {
        })
        .then(function (response) {
            console.log(response.data);
            // console.log(response.data.data[0].tp_user)
            if(response.data.status===1){ 
                let arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={ Responsable: item.responsable, Apartamento: item.apartamento, Residente: item.inquilino,Fecha:item.fecha}
                    arr.push(obj)
                    
                }
                console.log(arr)
                setDataTabla(arr)
                setModalView(true)
            }else{  
                
            }
    
    
        })
        .catch(function (error) {
            console.log(error);
            
        })
    }






    useEffect(() => {
        if(NombreTorre !== 0) {
            filtrarTorre(NombreTorre);
        }
    }, [NombreTorre]);

    useEffect(() => {
        if(NombreApto !== 0) {
            filtrarApto(NombreApto);
        }
    }, [NombreApto]);

    useEffect(() => {
        if(datosFiltrados.length > 0) {
            setRender(true);
        } else {
            if(PermisoRenderVacio) {
                setRender(true);
            } else {
                setcolumns(titulos);
                setrows(data);
                setDatosFiltrados(rows);
            }
        }
    }, [datosFiltrados]);

    useEffect(() => {
        const datosFiltrados = rows.filter((row) => {
            return (
                row.r_nombre.toString().toLowerCase().includes(filtro.toLowerCase()) ||
                row.r_apellido.toString().toLowerCase().includes(filtro.toLowerCase()) ||
                row.a_numero.toString().toLowerCase().includes(filtro.toLowerCase()) ||
                row.t_nombre.toString().toLowerCase().includes(filtro.toLowerCase())
            );
        });
        setDatosFiltrados(datosFiltrados);
    }, [filtro]);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    return (
        <>  {
                ModalView?
                <ModalJSX open={ModalView} setOpen={setModalView} view={<TablaRegistro titulo={'Listado de llamadas'} data={DataTabla}/>} titulo={''} maxWidth={true}/>
                :''
            }
            {Render ? (
                <div style={{ height: "100%", width: '100%', border: '2px solid #FF3600', borderRadius: '5px', padding: '15px 0' }}>
                    <Grid container spacing={0}>
                        <Grid item md={6}>
                            <TextField
                                label="Buscar"
                                value={filtro}
                                onChange={handleFiltroChange}
                                style={{ marginBottom: 20 }}
                            />
                        </Grid>
                        <Grid item md={2.5}>
                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained" color='success' onClick={MostrarRegistro}>
                                    registro
                                </Button>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                <Button variant="contained" color='error' onClick={ReiniciarTabla}>
                                    <RestartAltIcon/>reiniciar
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ maxHeight: 440 }} style={{overflow:"hidden"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{overflowX:"hidden"}}>
                            <TableHead>
                                <TableRow>
                                    {titulos.map((child) => (
                                        <TableCell 
                                            key={child.headerName} 
                                            sx={{ fontWeight: 'bold' }} 
                                            style={{backgroundColor:'#FF3600',color:'white'}}
                                        >
                                            {child.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datosFiltrados.length > 0 ? (
                                    datosFiltrados.map((fila) => (
                                        <TableRow key={fila.r_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{fila.r_nombre}</TableCell>
                                            <TableCell>{fila.r_apellido}</TableCell>
                                            <TableCell>{fila.a_numero}</TableCell>
                                            <TableCell>{fila.t_nombre}</TableCell>
                                            <TableCell>
                                                <div 
                                                    style={{
                                                        backgroundColor: isCallActive ? 'red' : 'green',
                                                        width:'20%',
                                                        display:'flex',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        borderRadius:'6px',
                                                        cursor:'pointer'
                                                    }} 
                                                    onClick={() => llamar(fila.r_telefono,fila.r_nombre+' '+fila.r_apellido)}
                                                >
                                                    <CallIcon style={{color:'white'}}/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',margin:'50px'}}>
                                        <b>SIN DATOS</b>
                                    </div>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Diálogo de llamada activa */}
                    <Dialog open={callDialogOpen} onClose={endCall}>
                        <DialogTitle>Llamada en Curso</DialogTitle>
                        <DialogContent>
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <p>Llamada en curso con: {activePhoneNumber}</p>
                                <p style={{ fontSize: '24px', margin: '20px 0' }}>
                                    {formatDuration(callDuration)}
                                </p>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                variant="contained" 
                                color="error" 
                                onClick={endCall}
                                startIcon={<CallEndIcon />}
                            >
                                Terminar Llamada
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : ''}
        </>
    );
};

export default Tabla;