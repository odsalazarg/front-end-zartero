import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';



const TableConBuscador = ({titulos,data}) => {

    const [columns, setcolumns] = useState([])
    const [Render, setRender] = useState(false)
    const [rows, setrows] = useState([])


    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(rows);

  

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
            row.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            row.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
            row.username.toLowerCase().includes(filtro.toLowerCase())||
            row.cedula.toString().includes(filtro)||
            row.telefono.toString().includes(filtro)
    
          );
        });
        setDatosFiltrados(datosFiltrados);
      }, [filtro]);
        
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <div style={{ height: "100%", width: '100%' ,border:'2px solid grey',borderRadius:'5px',padding:'15px 0'}}>
      {
        Render?
        <>
            <TextField
            label="Buscar"
            value={filtro}
            onChange={handleFiltroChange}
            style={{ marginBottom: 20 }}
            />
            <DataGrid rows={datosFiltrados} columns={columns} />
        </>
      :''
      }
    </div>
  );
};

export default TableConBuscador;
