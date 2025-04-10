import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

const Paginador = ({numContador,paginaActual,setPaginaActual,atrasContador,siguienteContador}) => {
  

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
      
        atrasContador()
      
    }
  };

  const handleSiguiente = () => {
    
    if(paginaActual!=numContador+1){
        siguienteContador()
        setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleAnterior}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" style={{ margin: '0 10px' }}>
        <Badge badgeContent={numContador} color="primary">
            {/* <MailIcon color="action" /> */}
            <div style={{margin:'7px 0 0 0'}}>
                {paginaActual}
            </div>
        </Badge>
        
      </Typography>
      <IconButton onClick={handleSiguiente}>
        <ArrowForward />
      </IconButton>
    </div>
  );
};

export default Paginador;
