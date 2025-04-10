import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';

const datos = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 25 },
  { id: 2, nombre: 'María', apellido: 'Gómez', edad: 30 },
  { id: 3, nombre: 'Carlos', apellido: 'López', edad: 35 },
];

const Tabla = ({titulos,data,setIdEditList,IdEditGestion}) => {
    
    const [columns, setcolumns] = useState([])
    const [Render, setRender] = useState(false)
    const [rows, setrows] = useState([])


    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);


    const editItem=(id)=>{
      // console.log(id)
      setIdEditList(id)
      

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
            row.depa_id.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.depa_numero.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.torre_nombre.toString().toLowerCase().includes(filtro.toLowerCase())
            // row.depa_status.toString().toLowerCase().includes(filtro.toLowerCase())||
            // row.alas_nombre.toString().toLowerCase().includes(filtro.toLowerCase())
    
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
                    <TableRow key={fila.depa_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>editItem(fila.depa_id)} style={{backgroundColor:IdEditGestion==fila.depa_id?'lightgray':''}}>
                      {/* <TableCell component="th" scope="row">
                        {fila.id}
                      </TableCell> */}
                      {/* <TableCell>{fila.depa_status}</TableCell> */}
                      <TableCell>{fila.depa_numero}</TableCell>
                      <TableCell>{fila.torre_nombre}</TableCell>
                      {/* <TableCell>{fila.alas_nombre}</TableCell> */}
                      {/* <TableCell>{fila.depa_id}</TableCell> */}
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
