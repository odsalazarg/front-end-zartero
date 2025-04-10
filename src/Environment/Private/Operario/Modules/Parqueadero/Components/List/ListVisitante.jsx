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

const Tabla = ({titulos,data}) => {
    
    const [columns, setcolumns] = useState([])
    const [Render, setRender] = useState(false)
    const [rows, setrows] = useState([])


    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);



    // const editItem=(id)=>{
    //   // console.log(id)
    //   setIdEditList(id)
    // }
  

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
        console.log(rows)
        const datosFiltrados = rows.filter((row) => {
          return (
            row.fecha_ingreso.toString().toLowerCase().includes(filtro.toLowerCase()) ||
            row.fecha_salida.toString().toLowerCase().includes(filtro.toLowerCase()) ||
            row.observacion.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.observacion_salida.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.placa.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.tipo.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.torre.toString().toLowerCase().includes(filtro.toLowerCase())||
            row.apartamento.toString().toLowerCase().includes(filtro.toLowerCase())
    
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
      <div style={{ height: "100%", width: '100%' ,border:'2px solid grey',borderRadius:'5px',padding:'15px 0'}}>
            <TextField
            label="Buscar"
            value={filtro}
            onChange={handleFiltroChange}
            style={{ marginBottom: 20 }}
            />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    
                    {
                      titulos.map((child)=>(
                        <TableCell key={child.headerName}>{child.headerName}</TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosFiltrados.map((fila) => (
                    <TableRow key={fila.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      {/* <TableCell component="th" scope="row">
                        {fila.id}
                      </TableCell> */}
                      <TableCell>{fila.fecha_ingreso}</TableCell>
                      <TableCell>{fila.fecha_salida}</TableCell>
                      <TableCell>{fila.observacion}</TableCell>
                      <TableCell>{fila.observacion_salida}</TableCell>
                      <TableCell>{fila.autoriza}</TableCell>
                      {/* <TableCell>{fila.torre}</TableCell> */}
                      <TableCell>{fila.apartamento}</TableCell>
                      <TableCell>{fila.visitante}</TableCell>
                      <TableCell><img src={fila.foto} alt="" style={{height:'40px'}}/></TableCell>
                      <TableCell>{fila.placa}</TableCell>
                      <TableCell>{fila.tipo}</TableCell>
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
