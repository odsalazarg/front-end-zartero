import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Alert,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Alert as ALERTA } from '../../../../Components/Alerts/Alerts';
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreview = styled(Box)({
  width: '200px',
  height: '120px',
  border: '2px dashed #ccc',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
});

// Función de compresión modificada para mantener el formato original
const optimizedCompress = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      let maxWidth = 600;
      let maxHeight = 400;
      
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      // Mantener el formato original de la imagen
      const quality = 0.8;
      const mimeType = file.type; // Usa el tipo MIME original del archivo
      
      canvas.toBlob((blob) => {
        resolve(blob);
      }, mimeType, quality);
    };
    
    img.onerror = reject;
  });
};

const LogoUploader = () => {
  const alerta = new ALERTA();
  const [logos, setLogos] = useState({
    official: null,
    banner: null,
    menu: null
  });

  const [previews, setPreviews] = useState({
    official: null,
    banner: null,
    menu: null
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Formato de archivo no válido. Use PNG, JPEG o GIF.');
    }
    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande. Máximo 5MB.');
    }
  };

  const fileToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      validateFile(file);
      
      const compressedBlob = await optimizedCompress(file);
      const base64 = await fileToBase64(compressedBlob);
      
      console.log(`Tamaño de ${type}:`, Math.round(base64.length / 1024), 'KB');
      
      setLogos(prev => ({
        ...prev,
        [type]: compressedBlob
      }));
      
      setPreviews(prev => ({
        ...prev,
        [type]: URL.createObjectURL(compressedBlob)
      }));
      
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (type) => {
    if (previews[type]) {
      URL.revokeObjectURL(previews[type]);
    }
    setLogos(prev => ({
      ...prev,
      [type]: null
    }));
    setPreviews(prev => ({
      ...prev,
      [type]: null
    }));
  };


  const guardarLogoOficial=(data)=>{
    axios.post('http://localhost:3000/Api/MarcaBlanca-lo', {
      logoData:data
    })
    .then(function (response) {
      if(response.data.status === 0) {
        alerta.Error({texto: response.data.msg});
      }
      if(response.data.status === 1) {
        // alerta.Success();
        setLogos({
          official: null
        })
        setPreviews({
          official: null
        })
        
      }
    })
    .catch(function (error) {
      console.error(error);
      alerta.Error({titulo:'Archivos muy pesados',texto:'Archivos muy pesados'});
    });
  }

  const guardarLogoBanner=(data)=>{
    axios.post('http://localhost:3000/Api/MarcaBlanca-lb', {
      logoData:data
    })
    .then(function (response) {
      if(response.data.status === 0) {
        alerta.Error({texto: response.data.msg});
      }
      if(response.data.status === 1) {
        // alerta.Success();
        setLogos({
          
          banner: null
        })
        setPreviews({
          
          banner: null
        })
        
      }
    })
    .catch(function (error) {
      console.error(error);
      alerta.Error({titulo:'Archivos muy pesados',texto:'Archivos muy pesados'});
    });
  }

  const guardarLogoMenu=(data)=>{
    axios.post('http://localhost:3000/Api/MarcaBlanca-lm', {
      logoData:data
    })
    .then(function (response) {
      if(response.data.status === 0) {
        alerta.Error({texto: response.data.msg});
      }
      if(response.data.status === 1) {
        // alerta.Success();
        setLogos({
          menu: null
        })
        setPreviews({
          menu: null
        })
        // navigate('/private');
      }
    })
    .catch(function (error) {
      console.error(error);
      alerta.Error({titulo:'Archivos muy pesados',texto:'Archivos muy pesados'});
    });
  }


  const handleSave = async () => {
    // if (!logos.official || !logos.banner) {
    //   setError('El Logo Oficial y el Logo Banner son obligatorios.');
    //   return;
    // }

    try {
      const logoData = {
        officialLogo:logos.official ? await fileToBase64(logos.official): null,
        bannerLogo:logos.banner ? await fileToBase64(logos.banner): null,
        menuLogo: logos.menu ? await fileToBase64(logos.menu) : null
      };

      if(logoData.officialLogo!=null){
        guardarLogoOficial(logoData.officialLogo)
      }

      if(logoData.bannerLogo!=null){
        guardarLogoBanner(logoData.bannerLogo)
      }

      if(logoData.menuLogo!=null){
        guardarLogoMenu(logoData.menuLogo)
      }
      setTimeout(() => {
        alerta.Success();
        navigate('/private');
      }, 1000);
      
      setError('');
    } catch (err) {
      setError('Error al procesar las imágenes.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Card sx={{ maxWidth: 800, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Gestión de Logos
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            {/* Logo Oficial */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ImagePreview>
                {previews.official ? (
                  <>
                    <img src={previews.official} alt="Logo Oficial" />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'background.paper' }}
                      onClick={() => handleDelete('official')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Logo Oficial *
                  </Typography>
                )}
              </ImagePreview>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Subir Logo Oficial
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'official')}
                />
              </Button>
            </Box>

            {/* Logo Banner */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ImagePreview>
                {previews.banner ? (
                  <>
                    <img src={previews.banner} alt="Logo Banner" />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'background.paper' }}
                      onClick={() => handleDelete('banner')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Logo Banner *
                  </Typography>
                )}
              </ImagePreview>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Subir Logo Banner
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'banner')}
                />
              </Button>
            </Box>

            {/* Logo Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ImagePreview>
                {previews.menu ? (
                  <>
                    <img src={previews.menu} alt="Logo Menu" />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'background.paper' }}
                      onClick={() => handleDelete('menu')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Logo Menu *
                  </Typography>
                )}
              </ImagePreview>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Subir Logo Menu
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'menu')}
                />
              </Button>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              // disabled={!logos.official || !logos.banner}
            >
              Guardar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LogoUploader;