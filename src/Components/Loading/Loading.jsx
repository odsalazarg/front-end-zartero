import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import logo from './img/relojArena.gif'





export default function Loading() {
  

  return (
    
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        
        <div className='spinner' style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'',width:'80px',height:'100px',zIndex:'1000'}}>
            

            <img src={logo} alt="" style={{height:'100%',width:'100%'}}/>

        </div>
        
        
      </Dialog>
    
  );
}