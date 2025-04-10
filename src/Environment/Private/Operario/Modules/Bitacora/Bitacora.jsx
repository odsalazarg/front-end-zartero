import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    margin: '0 auto',
    padding: '24px',
    boxSizing: 'border-box',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '16px',
  },
  date: {
    color: '#666666',
    fontSize: '14px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
  },
  textarea: {
    width: '100%',
    height: '300px',
    padding: '16px',
    marginBottom: '24px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
  },
};

const BitacoraOperario = ({texto,handleGuardar,handleCancelar,setTexto}) => {
  

  const obtenerFechaFormateada = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  

  return (
    <div style={styles.container}>
      <div style={styles.dateContainer}>
        <span style={styles.date}>{obtenerFechaFormateada()}</span>
      </div>

      {/* <h1 style={styles.title}>Bitácora del Operario</h1> */}

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={styles.textarea}
        placeholder="Escribe tu bitácora aquí..."
      />

      <div style={styles.buttonContainer}>
        <button
          onClick={handleCancelar}
          style={{...styles.button, ...styles.cancelButton}}
        >
          Cancelar
        </button>

        <button
          onClick={handleGuardar}
          style={{...styles.button, ...styles.saveButton}}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default BitacoraOperario;