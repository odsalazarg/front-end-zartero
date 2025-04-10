import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { createMacOFF } from '../../../../redux/states/mac_OFFLINE';
import { Alert } from '../../../../Components/Alerts/Alerts';

// Componente principal para la gestión de licencias
const LicenseManagement = () => {
  // Estados iniciales
  const alerta = new Alert();
  const macState = useSelector((store) => store.mac);
  const macOFFLINEState = useSelector((store) => store.macOFF);
  const [macAddress, setMacAddress] = useState(macState.mac);
  
  // Función para convertir el formato de fecha de yyyy-mm-dd a dd-mm-yyyy
  const formatDate = (dateString) => {
    // Si la fecha ya viene en formato yyyy-mm-dd, la convertimos a dd-mm-yyyy
    if (dateString && dateString.includes('-')) {
      const parts = dateString.split('-');
      // Verificamos si el formato es yyyy-mm-dd para convertirlo
      if (parts[0].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    // Si ya está en el formato correcto o no es válida, la devolvemos sin cambios
    return dateString;
  };
  
  // Inicializamos la fecha de expiración con el formato correcto
  const dispatch = useDispatch();
  const [expirationDate, setExpirationDate] = useState(formatDate(macOFFLINEState.fecha));
  const [licenseKey, setLicenseKey] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [colorStatus, setColorStatus] = useState("#4caf50"); // Verde por defecto

  // Función para calcular días entre fechas
  const calculateDaysRemaining = () => {
    const today = new Date();
    
    // Convertimos la fecha de expiración (dd-mm-yyyy) a un objeto Date
    // Primero separamos los componentes
    const parts = expirationDate.split('-');
    
    // Creamos el objeto Date (el mes en JS es 0-indexed, por eso restamos 1)
    const expiry = new Date(parts[2], parts[1] - 1, parts[0]);
    
    // Cálculo de la diferencia en días
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysRemaining(diffDays);
    
    // Determinar el color según los días restantes
    if (diffDays > 180) { // Más de 6 meses
      setColorStatus("#4caf50"); // Verde
    } else if (diffDays > 90) { // Entre 3 y 6 meses
      setColorStatus("#ff9800"); // Amarillo
    } else { // 3 meses o menos
      setColorStatus("#f44336"); // Rojo
    }
  };

  // Calculamos los días restantes al cargar el componente
  useEffect(() => {
    calculateDaysRemaining();
  }, [expirationDate]);


  useEffect(() => {
    // Podemos usar este efecto para cualquier otra inicialización si es necesario
    setExpirationDate(formatDate(macOFFLINEState.fecha))
  }, [macOFFLINEState.fecha]);

  // Función que manejará la activación de la licencia
  const handleActivateLicense = () => {
    console.log("Licencia a activar:", licenseKey);
    try {
          // Desencriptar la clave usando CryptoJS
          // const bytes = CryptoJS.AES.decrypt(secretKey, 'clave-secreta');
          // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          const decoded = atob(licenseKey);
          
          console.log('Llave desencriptada:', decoded);
    
          // Separar el resultado usando "_"
          const [mac, fecha] = decoded.split('_');
          
          // Imprimir los valores separados
          console.log('MAC:', mac);
          console.log('Fecha:', fecha);
          if(fecha==undefined || fecha==null){
            alerta.Error({texto: 'Error al procesar licencia'});
          }else{
              dispatch(createMacOFF({licencia:true,mac:mac,fecha:fecha}))
              alerta.Success();
              setLicenseKey('')
          }
          
        } catch (error) {
          console.error('Error al procesar la llave:', error);
          alerta.ErrorSistem();
        //   handleCloseModal();
        }
    // Aquí se agregará la lógica posterior
  };

  return (
    <div style={{
      minHeight: '80vh',
      backgroundColor: '',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{backgroundColor:'white',padding:'50px'}}>
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
        }}>
            {/* Encabezado */}
            <div style={{
            padding: '16px 24px',
            backgroundColor: '#091435',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <h1 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 'bold'
            }}>Gestión de Licencias</h1>
            <div style={{
                textAlign: 'right'
            }}>
                <p style={{
                margin: '0 0 4px 0',
                fontSize: '12px'
                }}>Fecha de vencimiento</p>
                <p style={{
                margin: 0,
                fontWeight: 'bold',
                color: colorStatus
                }}>{expirationDate}</p>
            </div>
            </div>
            
            {/* Contenido */}
            <div style={{
            padding: '24px'
            }}>
            <div style={{
                marginBottom: '24px'
            }}>
                <p style={{
                margin: '0 0 8px 0',
                fontWeight: '500',
                color: '#555'
                }}>Dirección MAC:</p>
                <p style={{
                margin: 0,
                padding: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
                }}>{macAddress}</p>
            </div>
            
            <div style={{
                marginBottom: '24px'
            }}>
                <label htmlFor="license" style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#555'
                }}>
                Licencia
                </label>
                <input
                type="text"
                id="license"
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    fontSize: '14px'
                }}
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Ingrese su clave de licencia"
                />
            </div>
            
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <button
                onClick={handleActivateLicense}
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                }}
                >
                Aceptar
                </button>
            </div>
            </div>
            
            {/* Pie de página */}
            <div style={{
            padding: '12px 24px',
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0'
            }}>
            <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#666'
            }}>
                Días restantes: <span style={{ color: colorStatus, fontWeight: 'bold' }}>{daysRemaining} días</span>
            </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseManagement;