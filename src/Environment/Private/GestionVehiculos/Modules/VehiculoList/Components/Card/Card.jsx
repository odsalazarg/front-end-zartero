import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import {default as BorrarInquilino } from '../../../DeleteVehiculo/View/BorrarVehiculo';
import { TextField } from '@mui/material';

const datos = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 25 },
  { id: 2, nombre: 'María', apellido: 'Gómez', edad: 30 },
  { id: 3, nombre: 'Carlos', apellido: 'López', edad: 35 },
];

const Tabla = ({titulos,data,setIdEditList,IdEditGestion,acciones,renderizarLista,editarAccion=false}) => {
    
    const [columns, setcolumns] = useState([])
    const [Render, setRender] = useState(false)
    const [rows, setrows] = useState([])


    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);



    const editItem=(id)=>{
      // console.log(id)
      if(editarAccion!=false){
        editarAccion(id)
      }else{
        setIdEditList(id)
      }
    }
  

    useEffect(() => {
            
        if(datosFiltrados.length>0){
            console.log('render')
            setRender(true)
        }else{
            console.log('setData')
            console.log(data)
            console.log(titulos)
            setcolumns(titulos)
            setrows(data)
            setDatosFiltrados(rows)
        }
    }, [datosFiltrados])
  
    useEffect(() => {
        const datosFiltrados = rows.filter((row) => {
            console.log(row)
          return (
            row.vehiculo_placa.toString().toLowerCase().includes(filtro.toLowerCase()) ||
            row.vehiculo_tipo.toString().toLowerCase().includes(filtro.toLowerCase()) ||
            row.torre_nombre.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.apto_numero.toString().toLowerCase().includes(filtro.toLowerCase())
            // row.telefono.toString().toLowerCase().includes(filtro.toLowerCase())||
            // row.status.toString().toLowerCase().includes(filtro.toLowerCase())
    
          );
        });
        setDatosFiltrados(datosFiltrados);
      }, [filtro]);
        
  const handleFiltroChange = (event) => {
    console.log('event')
    setFiltro(event.target.value);
  };
  // aqui empiezo a editar

  useEffect(() => {
    console.log(renderizarLista)
  }, [])
  

  return (
    <>
      {
      Render?
      <div style={{ height: "100%", width: '100%' ,border:'2px solid #FF3600',borderRadius:'5px',padding:'15px 0',
        backgroundColor: '#f9f9f9'
}}>
            <TextField
            label="Buscar"
            value={filtro}
            onChange={handleFiltroChange}
            style={{ marginBottom: 20 ,backgroundColor:'white'}}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    
                    {
                      titulos.map((child)=>(
                        <TableCell key={child.headerName} sx={{ fontWeight: 'bold' }} style={{backgroundColor:'#FF3600',color:'white'}}>{child.headerName}</TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosFiltrados.map((fila) => (
                    <TableRow key={fila.vehiculo_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>editItem(fila.vehiculo_id)} style={{backgroundColor:IdEditGestion==fila.vehiculo_id?'lightgray':''}}>
                      {/* <TableCell component="th" scope="row">
                        {fila.id}
                      </TableCell> */}
                      {/* <TableCell>{fila.vehiculo_status}</TableCell> */}
                      <TableCell>{fila.vehiculo_placa}</TableCell>
                      <TableCell>{fila.vehiculo_tipo}</TableCell>
                      <TableCell>{fila.torre_nombre}</TableCell>
                      <TableCell>{fila.apto_numero}</TableCell>
                      {
                        acciones?
                        <TableCell>
                          <Grid container spacing={0} >
                            <Grid item md={1}>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <Button variant="contained" color='success' onClick={()=>editItem(fila.vehiculo_id)}>
                                      <BorderColorIcon/>
                                  </Button>
                              </div>
                            </Grid>
                            <Grid item md={4}>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <BorrarInquilino Id={fila.vehiculo_id} setIdEditGestion={setIdEditList} renderizarLista={renderizarLista} acciones={acciones}/>
                              </div>
                            </Grid>
                          </Grid>
                        </TableCell>
                        :''
                      }
                      {/* <TableCell>{fila.telefono}</TableCell>
                      <TableCell>{fila.password}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
      :''
      }
    
    </>
    
  );
};

export default Tabla;
