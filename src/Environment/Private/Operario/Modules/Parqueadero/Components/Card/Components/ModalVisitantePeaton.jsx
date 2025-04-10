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
// const {imgNotFound}=require('./img/Image-not-found.png')


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({MostrarModal,cerrarModal,Cedula,setCedula,Nombre,setNombre,Apellido,setApellido,Observaciones,setObservaciones,buscar,AutorizacionResi,TipoVisitante,IdTipoVisitante,CrearVisitante,setCrearVisitante,registroVisitante,setIdTipoVisitante,setIdAutorizacionResi,UrlFotoPerfilVisitante,setUrlFotoPerfilVisitante,RenderCam,setRenderCam,restartPropietario}) {
  const [open, setOpen] = React.useState(false);
  const [ImgVisitante, setImgVisitante] = useState('')
    
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
    
  };

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
                Datos Visitante2222
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
                                <TextField id="outlined-basic" label="Nombre" variant="outlined" value={Nombre} onChange={e=>{setNombre(e.target.value)}} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}} />
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <TextField id="outlined-basic" label="Apellido" variant="outlined" value={Apellido} onChange={e=>{setApellido(e.target.value)}} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}}/>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'10px'}}>
                                <Select titulo={'Tipo Visitante'} arr={TipoVisitante} style={{width:'100%',border:'2px solid black',borderRadius:'5px',borderTop:'none'}} valor={IdTipoVisitante} onChange={setIdTipoVisitante}/>
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
                </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Button onClick={handleClose} variant='contained' color='error'>Cancelar</Button>
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'end'}}>
                <Button onClick={handleSiguiente} variant='contained' color='success'>siguiente222</Button>
            </Grid>
        </Grid>
        <br /><br /><br /><br />
          
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}