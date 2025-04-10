import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Grid,
  CircularProgress,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { Alert } from '../../../../Components/Alerts/Alerts';
import { useDispatch } from 'react-redux';
import { updateUser } from "../../../../redux/states/user";

// Componente estilizado para la carga de imágenes
const ImageInput = styled('input')({
  display: 'none',
});

// Vista previa de imagen estilizada
const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '250px',
  objectFit: 'contain',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

// Contenedor de la vista previa de imagen
const ImagePreviewContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
  height: '300px',
  width: '100%',
}));

// Función para convertir archivo a base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No se proporcionó ningún archivo');
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

function UnidadComponent() {
  const alerta = new Alert();
  const theme = useTheme();
  const dispatch=useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Estado para almacenar los datos guardados (inicialmente vacíos)
  const [savedData, setSavedData] = useState({
    nombre: '',
    imagen: null,
    imagenBase64: ''
  });

  // Estado para almacenar los datos temporales del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: null,
    imagenBase64: ''
  });

  // Estado para controlar la carga
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Efecto para cargar datos iniciales desde la BD
  useEffect(() => {
    setIsLoading(true);
    
    axios.get('http://localhost:3000/Api/getMarcaUnidad', {})
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === 1) {
        setSavedData({
          nombre: response.data.data[0].nombre || '',
          imagenBase64: response.data.data[0].img || ''  // Asumiendo que la imagen viene en base64 desde la BD
        });
        
        setFormData({
          nombre: response.data.data[0].nombre || '',
          imagenBase64: response.data.data[0].img || ''  // Asumiendo que la imagen viene en base64 desde la BD
        });
      } else {
        // En caso de error al obtener los datos
        alerta.Error({texto: response.data.msg || 'No se pudo cargar la información'});
      }
    })
    .catch(function (error) {
      console.log(error);
      alerta.ErrorSistem();
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Manejador para cambios en el campo de texto
  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      nombre: e.target.value
    });
  };

  // Manejador para cambios en la imagen
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // Convertir el archivo a base64
        const base64String = await fileToBase64(file);
        
        setFormData({
          ...formData,
          imagen: file,
          imagenBase64: base64String
        });
      } catch (error) {
        console.error("Error al convertir imagen a base64:", error);
        alerta.Error({texto: "Error al procesar la imagen"});
      }
    }
  };

  // Función para guardar datos
  const handleSave = async () => {
    if (!formData.nombre) {
      alerta.Error({texto: "Por favor ingrese un nombre para la unidad"});
      return;
    }
    
    setIsSaving(true);
    
    // Preparar datos para enviar al servidor
    const dataToSend = {
      nombre: formData.nombre,
      imagen: formData.imagenBase64 // Ya tenemos la imagen en base64
    };


    function refreshCurrentPage() {
        // Obtiene la ubicación actual
        const currentLocation = window.location.href;
        // window.location.href = '/';
        // Refresca la página manteniendo la URL actual
        window.location.href = currentLocation;
        
        // Alternativa usando reload()
        // window.location.reload();
      }
    
    axios.post('http://localhost:3000/Api/setMarcaUnidad', dataToSend)
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === 1) {
        // Actualizar estado guardado
        setSavedData({
          nombre: formData.nombre,
          imagenBase64: formData.imagenBase64
        });
        alerta.Success();
         dispatch(updateUser({resiNombre:formData.nombre}))
        // refreshCurrentPage();
      } else {
        alerta.Error({texto: response.data.msg || 'Error al guardar'});
      }
    })
    .catch(function (error) {
      console.log(error);
      alerta.ErrorSistem();
    })
    .finally(() => {
      setIsSaving(false);
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          background: theme.palette.background.paper
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ mb: 4, fontWeight: 500 }}
        >
          Gestión de Unidad
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Sección de Imagen */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Imagen de la unidad
              </Typography>
              
              <ImagePreviewContainer>
                {formData.imagenBase64 ? (
                  <ImagePreview 
                    src={formData.imagenBase64} 
                    alt="Vista previa"
                  />
                ) : (
                  <Box 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 60, mb: 2, opacity: 0.6 }} />
                    <Typography variant="body2">
                      No hay imagen seleccionada
                    </Typography>
                  </Box>
                )}
              </ImagePreviewContainer>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <label htmlFor="contained-button-file">
                  <ImageInput
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    sx={{ mt: 1 }}
                  >
                    Seleccionar Imagen
                  </Button>
                </label>
              </Box>
            </Grid>
            
            {/* Sección de Nombre */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Nombre de la unidad
                  </Typography>
                  <TextField
                    fullWidth
                    label="Ingrese el nombre"
                    variant="outlined"
                    value={formData.nombre}
                    onChange={handleTextChange}
                    margin="normal"
                  />
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 1,
                      position: 'relative'
                    }}
                  >
                    {isSaving ? (
                      <>
                        Guardando
                        <CircularProgress 
                          size={24} 
                          sx={{ 
                            position: 'absolute',
                            right: theme.spacing(3)
                          }} 
                        />
                      </>
                    ) : 'Guardar'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Información actual guardada */}
        {savedData.nombre || savedData.imagenBase64 ? (
          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Información Actual Guardada:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
              {savedData.imagenBase64 && (
                <Box sx={{ width: isMobile ? '100%' : '150px' }}>
                  <img 
                    src={savedData.imagenBase64} 
                    alt="Imagen guardada" 
                    style={{ 
                      width: '100%', 
                      height: '100px', 
                      objectFit: 'contain',
                      borderRadius: '4px' 
                    }} 
                  />
                </Box>
              )}
              {savedData.nombre && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nombre:
                  </Typography>
                  <Typography variant="body1">
                    {savedData.nombre}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ) : null}
      </Paper>
    </Container>
  );
}

export default UnidadComponent;