import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { Select } from '../Components';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import imgNotFound from './img/Image-not-found.png'
import Webcam from 'react-webcam';
import { useState } from 'react';
import { useEffect } from 'react';
// const {imgNotFound}=require('./img/Image-not-found.png')


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({MostrarModal,cerrarModal,Cedula,setCedula,Nombre,setNombre,Apellido,setApellido,Observaciones,setObservaciones,buscar,AutorizacionResi,TipoVisitante,IdTipoVisitante,CrearVisitante,setCrearVisitante,registroVisitante,setIdTipoVisitante,setIdAutorizacionResi,UrlFotoPerfilVisitante,setUrlFotoPerfilVisitante,RenderCam,setRenderCam,restartPropietario,Peaton,setPeaton,Entrada,setEntrada,Salida,setSalida,TorresSelect,dataTipoSelect,AptoSelect,buscarAPTO,cambiarAPTO,cambiarTipoAuto,IDTIPO,resetOnChange,Placa,SalidaVisitante,EntradaVisitante,LLAVELOGICA_checkingPuestosVisitante,setLLAVELOGICA_checkingPuestosVisitante}) {
  const [open, setOpen] = React.useState(false);
  const [ImgVisitante, setImgVisitante] = useState('')
  const [TipoSelect, setTipoSelect] = useState([])
  const [btnColorEntradaSalida, setbtnColorEntradaSalida] = useState(0)
  const [LLAVELOGICA_SALIDAVISITANTE, setLLAVELOGICA_SALIDAVISITANTE] = useState(false)

  const entradaVisitanteCARRO=()=>{
    setbtnColorEntradaSalida(1)
    setLLAVELOGICA_SALIDAVISITANTE(false)
    setLLAVELOGICA_checkingPuestosVisitante(true)
    // EntradaVisitante()
  }

  const salidaVisitanteCARRO=()=>{
    setbtnColorEntradaSalida(2)
    setLLAVELOGICA_checkingPuestosVisitante(false)
    setLLAVELOGICA_SALIDAVISITANTE(true)
    SalidaVisitante()
  }


  const Accion=(val)=>{
    if(val===2){
      setEntrada(false)
      setSalida(true)
    }
    if(val===1){
      setEntrada(true)
      setSalida(false)
    }
  }
    
  const cedulaOnChange=(e)=>{
    setCedula(e.target.value)
    setNombre('')
    setApellido('')
    setObservaciones('')
    setIdTipoVisitante(0)
    setRenderCam(false)
    setUrlFotoPerfilVisitante('')
  }

  const handleSiguiente=()=>{
    registroVisitante()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    cerrarModal(false);
    setCrearVisitante(false)
    restartPropietario()
    setPeaton(false)
  };

  useEffect(() => {
    if(LLAVELOGICA_checkingPuestosVisitante){
      handleSiguiente();
    }
  }, [LLAVELOGICA_checkingPuestosVisitante])
  

  useEffect(() => {
    buscar()
  }, [])

  useEffect(() => {
    if (Peaton && (Entrada || Salida)) {
      handleSiguiente();
    }
  }, [Entrada, Salida, Peaton]);
  

  return (
    <React.Fragment>
      
      <Dialog
        open={MostrarModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {Peaton?"Datos Visitante Peaton":"Datos Visitante"}
            </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{width:'30vw',marginTop:'3px'}}>
                <Grid container spacing={1}>
                    
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <TextField id="outlined-basic" label="Cedula" variant="outlined" value={Cedula} onChange={e=>{cedulaOnChange(e)}} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}}/>
                            </Grid>
                            {/* {
                              Peaton?
                              'PEATON':'0'
                            } */}
                            {
                              CrearVisitante?
                              <Grid item xs={12}>
                                
                                <span style={{fontSize:'15px',color:'#950101'}}>Usuario no encontrado ! Por favor registre sus datos en el formulario.</span>
                                  
                              </Grid>
                              :
                              <Grid item xs={2}>
                                  
                                <Button style={{height:"100%",width:'100%'}} variant='contained' color='primary' onClick={buscar}><SearchIcon/></Button>
                                  
                              </Grid>
                            }
                        </Grid>
                        
                    </Grid>
                    
                    
                    
                    
                    <br /><br /><br /><br /><br />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <TextField id="outlined-basic" label="Nombre" variant="outlined" value={Nombre} onChange={e=>{setNombre(e.target.value)}} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}} InputProps={{readOnly: CrearVisitante?false:true}}/>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <TextField id="outlined-basic" label="Apellido" variant="outlined" value={Apellido} onChange={e=>{setApellido(e.target.value)}} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none',}} InputProps={{readOnly: CrearVisitante?false:true}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Select titulo={'TIPO'} arr={dataTipoSelect} onChange={cambiarTipoAuto} style={{marginBottom:'10px'}}/>
                            </Grid>
                            {
                              IDTIPO!=3 && IDTIPO!=0?
                              <Grid item xs={12}>
                                  <TextField id="outlined-basic" label="PLACA" variant="outlined" value={Placa} onChange={e=>{resetOnChange(e.target.value)}} style={{width:'100%',marginBottom:'10px'}}/>
                              </Grid>
                              :''
                            }
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <Select titulo={'Tipo Visitante'} arr={TipoVisitante} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}} valor={IdTipoVisitante} onChange={setIdTipoVisitante} readOnly={CrearVisitante?false:true}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Select titulo={'TORRE'} arr={TorresSelect} onChange={buscarAPTO} style={{marginBottom:'10px'}}/>
                            </Grid>
                            <Grid item xs={12}>
                            <Select titulo={'APTO'} arr={AptoSelect} onChange={cambiarAPTO} style={{marginBottom:'10px'}}/>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <Select titulo={'Autorizacion'} arr={AutorizacionResi} style={{width:'100%',border:'2px solid blue',borderRadius:'5px',borderTop:'none'}} onChange={setIdAutorizacionResi}/>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={6}>
                            
                          <div style={{height:'200px'}}>
                            {
                              RenderCam?
                              <Webcam
                              audio={false}
                              height={'100%'}
                              width={'100%'}
                              screenshotFormat='image/jpeg'
                              videoConstraints={{
                                width: 1280,
                                height: 720,
                                facingMode: "user"
                              }}
                              >
                                {({ getScreenshot }) => (
                                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Button
                                    variant='contained'
                                    onClick={() => {
                                      const imageSrc = getScreenshot();
                                      setUrlFotoPerfilVisitante(imageSrc);
                                      setRenderCam(false)
                                    }}
                                    >
                                      tomar foto
                                    </Button>
                                  </div>
                                )}
                              </Webcam>
                              :
                              <img style={{height:'100%',width:'100%'}} src={UrlFotoPerfilVisitante!=''?UrlFotoPerfilVisitante:imgNotFound} alt="" />
                            }
                            
                            
                          </div>
                            
                          
                            
                        </Grid>
                    </Grid>
                    
                    
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Observaciones"
                            multiline
                            maxRows={4}
                            style={{width:'100%',border:'2px solid blue',borderRadius:'5px',borderTop:'none'}}
                            value={Observaciones} onChange={e=>{setObservaciones(e.target.value)}}
                            
                        />
                    </Grid>
                    {/* {
                      Peaton? */}
                      <>
                        <Grid item xs={6} style={{marginTop:'20px'}}>
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
                            <Button onClick={IDTIPO!=3&&IDTIPO!=0?()=>entradaVisitanteCARRO():()=>Accion(1)} variant={Entrada?'contained':'outlined'} color='primary' style={{backgroundColor:btnColorEntradaSalida==1?'blue':'',color:btnColorEntradaSalida==1?'white':''}}>ENTRADA</Button>
                          </div>
                        </Grid>
                        <Grid item xs={6} style={{marginTop:'20px'}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
                            <Button onClick={IDTIPO!=3&&IDTIPO!=0?()=>salidaVisitanteCARRO():()=>Accion(2)} variant={Salida?'contained':'outlined'} color='error' style={{backgroundColor:btnColorEntradaSalida==2?'red':'',color:btnColorEntradaSalida==2?'white':''}}>salida</Button>
                          </div>
                        </Grid>
                      </>
                      {/* :''
                    } */}
                </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {/* <Grid container spacing={1}>
            <Grid item xs={6}>
                <Button onClick={handleClose} variant='contained' color='error'>Cancelar</Button>
            </Grid>
            {
              Peaton?
                <Grid item xs={6} style={{display:'flex',justifyContent:'end'}}>
                    <Button onClick={handleSiguiente} variant='contained' color='success'>siguiente</Button>
                </Grid>
              :
              LLAVELOGICA_SALIDAVISITANTE?
              <Grid item xs={6} style={{display:'flex',justifyContent:'end'}}>
                <Button onClick={()=>SalidaVisitante()} variant='contained' color='success'>siguiente salida</Button>
              </Grid> :
              LLAVELOGICA_checkingPuestosVisitante?
              <Grid item xs={6} style={{display:'flex',justifyContent:'end'}}>
                <Button onClick={handleSiguiente} variant='contained' color='success'>siguiente placa</Button>
              </Grid>
              :''
              
            }
        </Grid> */}
        <br /><br /><br /><br />
          
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}