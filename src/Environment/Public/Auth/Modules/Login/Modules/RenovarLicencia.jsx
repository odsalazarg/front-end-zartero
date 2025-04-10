import React, { useState } from 'react';
import { LockClock, Warning } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateMac } from '../../../../../../redux/states/mac';
import { createMacOFF } from '../../../../../../redux/states/mac_OFFLINE';
import { useSelector } from "react-redux"
import CryptoJS from 'crypto-js';

const LicenseExpired = ({setRenovarLicencia}) => {
  const [showModal, setShowModal] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    content: {
      maxWidth: '42rem',
      padding: '4rem 2rem',
      textAlign: 'center'
    },
    iconWrapper: {
      position: 'relative',
      display: 'inline-block',
      marginBottom: '2rem'
    },
    warningIcon: {
      color: '#ef4444',
      opacity: 0.2,
      fontSize: '120px'
    },
    clockIcon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#dc2626',
      fontSize: '60px'
    },
    title: {
      marginBottom: '1rem',
      fontSize: '3.75rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: '#111827'
    },
    subtitle: {
      marginBottom: '2rem',
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#dc2626'
    },
    message: {
      marginBottom: '2rem',
      fontSize: '1.125rem',
      color: '#4b5563'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      margin: '0 auto',
      '@media (max-width: 640px)': {
        flexDirection: 'column'
      }
    },
    primaryButton: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'white',
      backgroundColor: '#dc2626',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#b91c1c'
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px white, 0 0 0 4px #ef4444'
      }
    },
    secondaryButton: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#374151',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#f9fafb'
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px white, 0 0 0 4px #ef4444'
      }
    },
    errorInfo: {
      marginTop: '3rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    errorCode: {
      marginTop: '0.5rem'
    },
    // Nuevos estilos para el modal
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#111827',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      '&:focus': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
      }
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#4b5563'
      }
    },
    saveButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: '#059669'
      }
    }
  };

  const dispatch = useDispatch();
  const macState = useSelector((store) => store.mac);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSecretKey('');
  };

  const handleSaveKey = async () => {
    try {
      // Desencriptar la clave usando CryptoJS
      // const bytes = CryptoJS.AES.decrypt(secretKey, 'clave-secreta');
      // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const decoded = atob(secretKey);
      
      console.log('Llave desencriptada:', decoded);

      // Separar el resultado usando "_"
      const [mac, fecha] = decoded.split('_');
      
      // Imprimir los valores separados
      console.log('MAC:', mac);
      console.log('Fecha:', fecha);
      dispatch(createMacOFF({licencia:true,mac:mac,fecha:fecha}))
      handleCloseModal();
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.error('Error al procesar la llave:', error);
      handleCloseModal();
    }
  };

  const LicenciaMAC = () => {
    console.log(macState)
    axios.get(`https://zartero.com/api/check-license?mac=${macState.mac}`, {
    })
    .then(function (response) {
      console.log(response.data);
      if(!response.data.end_plan){
        dispatch(updateMac({licencia:false}))
      }
      if(response.data.end_plan){
        dispatch(updateMac({mac:macState.mac,licencia:true}))
        setRenovarLicencia(false)
      }
      console.log(macState)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconWrapper}>
          <Warning style={styles.warningIcon} />
          <LockClock style={styles.clockIcon} />
        </div>

        <h1 style={styles.title}>¡Oops!</h1>
        <h2 style={styles.subtitle}>No posee licencia activa</h2>
        {macState.mac ?
          <p>{macState.mac}</p>
          : ''
        }
        <p style={styles.message}>
          Su licencia ha expirado o no es válida. Por favor, renueve su licencia para continuar usando la aplicación.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.primaryButton}
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
          <button
            style={styles.secondaryButton}
            onClick={handleOpenModal}
          >
            Ingresar llave secreta
          </button>
        </div>

        <div style={styles.errorInfo}>
          <p>Si cree que esto es un error, por favor contacte con el equipo de soporte</p>
          <p style={styles.errorCode}>Código de Error: LICENSE_EXPIRED</p>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Ingresar llave secreta</h3>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              style={styles.input}
              placeholder="Ingrese su llave secreta"
            />
            <div style={styles.buttonGroup}>
              <button
                onClick={handleCloseModal}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveKey}
                style={styles.saveButton}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseExpired;