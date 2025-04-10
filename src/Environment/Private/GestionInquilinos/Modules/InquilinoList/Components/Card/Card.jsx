import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { BorrarInquilino } from '../../../DeleteInquilino';

const datos = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 25 },
  { id: 2, nombre: 'María', apellido: 'Gómez', edad: 30 },
  { id: 3, nombre: 'Carlos', apellido: 'López', edad: 35 },
];

const Tabla = ({titulos,data,setIdEditList,IdEditGestion,acciones=false,editAccion,renderizarLista=false}) => {
    
    const [columns, setcolumns] = useState([])
    const [Render, setRender] = useState(false)
    const [rows, setrows] = useState([])


    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);


    const editItem=(id)=>{
      // console.log(id)
      setIdEditList(id)
      editAccion(id)
      

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
          return (
            row.apartamento_id.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.apartamento_numero.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.nombre.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.apellido.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.status.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.correo.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.telefono.toString().toLowerCase().includes(filtro.toLowerCase())
    
          );
        });
        setDatosFiltrados(datosFiltrados);
      }, [filtro]);
        
  const handleFiltroChange = (event) => {
    console.log('event')
    setFiltro(event.target.value);
  };


  return (
    <>
      {
      Render?
      <div style={{ height: "100%", width: '100%' ,border:'2px solid #FF3600',borderRadius:'5px',padding:'15px 0'}}>
            <TextField
            label="Buscar"
            value={filtro}
            onChange={handleFiltroChange}
            style={{ marginBottom: 20 }}
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
                    <TableRow key={fila.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={acciones?()=>console.log('sin accion'):()=>editItem(fila.id)} style={{backgroundColor:IdEditGestion==fila.id?'lightgray':''}}>
                      {/* <TableCell component="th" scope="row">
                        {fila.id}
                      </TableCell> */}
                      {/* <TableCell>{fila.status}</TableCell> */}
                      <TableCell>{fila.apartamento_numero}</TableCell>
                      <TableCell>{fila.nombre}</TableCell>
                     
                        <TableCell>{fila.apellido}</TableCell>
                      
                       {
                        acciones?'':
                        <TableCell>{fila.telefono}</TableCell>
                      }
                       {
                        acciones?'':
                      <TableCell>{fila.telefono2==null?'-----':fila.telefono2}</TableCell>
                       }
                      <TableCell>{fila.correo==''?'-----':fila.correo}</TableCell>
                      <TableCell>{fila.tipo_residente == 1 ? 'Propietario' : (fila.tipo_residente == 2 ? 'Residente' : 'Prop-Res')
                      }</TableCell>
                      {
                        acciones?
                        <TableCell>
                          <Grid container spacing={0} >
                            <Grid item md={6}>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <Button variant="contained" color='success' onClick={()=>editItem(fila.id)}>
                                      <BorderColorIcon/>
                                  </Button>
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <BorrarInquilino Id={fila.id} setIdEditGestion={setIdEditList} renderizarLista={renderizarLista}/>
                              </div>
                            </Grid>
                          </Grid>
                        </TableCell>
                        :''
                      }
                      {/* <TableCell>{fila.id}</TableCell> */}
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
