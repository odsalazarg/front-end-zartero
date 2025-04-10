import React, { useState } from 'react';
import {default as Select} from '../Select/Select'

const FormularioFechas = ({click,Data,IdTipoInforme,setIdTipoInforme,DataTorre,IdTorre,setIdTorre,DataApto,setIdApto,IdApto,handleCancelar,Cedula,setCedula,FechaFin,setFechaFin,FechaInicio,setFechaInicio}) => {
  const [informe, setInforme] = useState('');
  // const [fechaInicio, setFechaInicio] = useState('');
  // const [fechaFin, setFechaFin] = useState('');

  const handleGenerar = () => {
    console.log('Informe:', informe);
    console.log('Fecha Inicio:', FechaInicio);
    console.log('Fecha Fin:', FechaFin);
    click()
  };

  // Estilos comunes para reutilizar
  const labelStyle = {
    width: '50%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    paddingRight: '10px'
  };

  const inputStyle = {
    width: '50%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#1f2937',
    outline: 'none'
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <label style={labelStyle}>
            Informe:
          </label>
          <Select  titulo={'Tipo de informe'} data={Data} Value={IdTipoInforme} setValue={setIdTipoInforme}/>
        </div>
        {
          // IdTipoInforme==1 || IdTipoInforme==2 || IdTipoInforme==4? 
          IdTipoInforme==2 || IdTipoInforme==4? 
          <div>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
            }}>
              <label style={labelStyle}>
                Torre:
              </label>
              <Select  titulo={'Torre'} data={DataTorre} Value={IdTorre} setValue={setIdTorre}/>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <label style={labelStyle}>
                Apartamento:
              </label>
              <Select  titulo={'Apartamento'} data={DataApto} Value={IdApto} setValue={setIdApto}/>
            </div>
          </div>
          :''
        }
        {
          IdTipoInforme==3 || IdTipoInforme==4?
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <label style={labelStyle}>
              Cedula:
            </label>
            <input
              type=""
              value={Cedula}
              onChange={(e) => setCedula(e.target.value)}
              style={inputStyle}
            />
          </div>
          :''
        }
        {
          IdTipoInforme==2 || IdTipoInforme==4 ||IdTipoInforme==5?
          <div>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
            }}>
              <label style={labelStyle}>
                Fecha inicio:
              </label>
              <input
                type="date"
                value={FechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                style={inputStyle}
              />
            </div>
    
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <label style={labelStyle}>
                Fecha fin:
              </label>
              <input
                type="date"
                value={FechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          :''
        }
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button
          onClick={handleCancelar}
          style={{
            width: '',
            padding: '10px',
            backgroundColor: 'grey',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={e => e.target.style.backgroundColor = 'lightgrey'}
          onMouseOut={e => e.target.style.backgroundColor = 'grey'}
          
        >
          Cancelar
        </button>
        <button
          onClick={handleGenerar}
          style={{
            width: '',
            padding: '10px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
          
        >
          Generar
        </button>
      </div>
      
    </div>
  );
};

export default FormularioFechas;