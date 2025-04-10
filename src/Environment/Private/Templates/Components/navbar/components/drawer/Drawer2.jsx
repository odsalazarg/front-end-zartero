import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {Collapse} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MenuListado } from './MenuList';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GarageIcon from '@mui/icons-material/Garage';
import InventoryIcon from '@mui/icons-material/Inventory';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import zarteroIcon from './Img/icono2.png'
import AssignmentIcon from '@mui/icons-material/Assignment';
import DomainIcon from '@mui/icons-material/Domain';
import FitbitIcon from '@mui/icons-material/Fitbit';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// Modificación del DrawerHeader para mantener un tamaño fijo
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between', // Cambiado a space-between para separar logo y botón
  height: '100px', // Altura fija para el header
  minHeight: '100px', // Altura mínima para asegurar consistencia
  overflow: 'hidden', // Previene que el contenido se desborde
}));

// Contenedor para la imagen con tamaño fijo
const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%', // Altura fija para el contenedor del logo
  width: '100%', // Ancho fijo para el contenedor
  overflow: 'hidden', // Previene que la imagen se desborde
});

// Componente de menú personalizado con estilos
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '& .MuiListItemIcon-root': {
    color: '#FF3600',
  },
  '& .MuiListItemText-primary': {
    color: '#FF3600',
  },
  '& .MuiSvgIcon-root.arrow-icon': {
    color: '#FF3600',
    marginLeft: 'auto', // Empuja el icono hacia la derecha
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 54, 0, 0.08)',
  },
}));

export default function PersistentDrawerLeft({view, cerrarSesion}) {
  const userState = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [Menus, setMenus] = useState([]);
  const [LogoMenu, setLogoMenu] = useState('')
  const [LogoBanner, setLogoBanner] = useState('')
  const [LogoUnidad, setLogoUnidad] = useState('')
  const [LogoUnidad2, setLogoUnidad2] = useState('')
  const [expandedMenus, setExpandedMenus] = useState({});
  const [Icons, setIcons] = useState([
    <HomeIcon/>,
    <SupervisedUserCircleIcon/>,
    <ApartmentIcon/>,
    <MapsHomeWorkIcon/>,
    <Diversity3Icon/>,
    <DirectionsCarFilledIcon/>,
    <GarageIcon/>,
    <InventoryIcon/>,
    <ReceiptLongIcon/>,
    <AssignmentIcon/>,
    <DomainIcon/>,
    <FitbitIcon/>
  ]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menusPermisos = () => {
    axios.post('http://localhost:3000/Api/Menu-Permisos', {
      IdUser: userState.id
    })
    .then(function (response) {
      if (response.data.status === 1) {
        const userType = response.data.data[0].tp_user;
        
        // Filtrar menús principales y sus submenús con permisos
        const menusConPermisos = MenuListado
          .filter(menu => menu.permiso.includes(userType)) // Filtrar menús principales
          .map(menu => ({
            ...menu,
            submenu: menu.submenu.filter(submenu => submenu.permiso.includes(userType)) // Filtrar submenús
          }))
          .filter(menu => menu.submenu.length > 0); // Opcional: remover menús sin submenús
  
        setMenus(menusConPermisos);
      }
    })
    .catch(function (error) {
      console.log('Error al obtener permisos:', error);
    });
  };

  const logoQuery = () => {
    setLogoMenu('')
    setLogoBanner('')
    axios.get('http://localhost:3000/Api/getMarcaBlanca', {
      
    })
    .then(function (response) {
      console.log(response)
      if (response.data.status === 1) {
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          const item = response.data.data[i];
          if(item.nombre==="LOGO_MENU"){
            setLogoMenu(item.url)
          }
          if(item.nombre==="LOGO_BANNER"){
            setLogoBanner(item.url)
          }
          
        }
      }
    })
    .catch(function (error) {
      console.log('Error al obtener logos:', error);
    });
  };

  const getLogoUnidad=async()=>{
    axios.get('http://localhost:3000/Api/getMarcaUnidad', {})
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === 1) {
          setLogoUnidad(response.data.data[0].nombre)
          setLogoUnidad2(response.data.data[0].img)
      } else {
        // En caso de error al obtener los datos
        // alerta.Error({texto: response.data.msg || 'No se pudo cargar la información'});
      }
    })
    .catch(function (error) {
      console.log(error);
      // alerta.ErrorSistem();
    })
    
  }

  useEffect(() => {
    menusPermisos();
    logoQuery()
    getLogoUnidad()
  }, []);

  useEffect(() => {
    getLogoUnidad()
  }, [userState.resiNombre || userState.resiLogo]);
  
  const handleMenuClick = (menuKey,unicoMenu=false,url=false) => {
    console.log(unicoMenu)
    if(!unicoMenu){
      handleNavigate(url)
    }else{
      setExpandedMenus(prev => ({
        ...prev,
        [menuKey]: !prev[menuKey]
      }));
    }
    
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{backgroundColor:'#091435'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <div style={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                {
                  LogoBanner!=''&&LogoBanner!=null?
                  <img src={`data:image/jpeg;base64,${LogoBanner}`} alt="" style={{height:'80px'}}/>
                  :
                  <img src={zarteroIcon} alt="" style={{height:'80px'}}/>
                }
              </div>
            </Grid>
            <Grid item md={4}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:''}}>
                {
                  LogoUnidad!=''&&LogoUnidad!=null?
                  <b><p style={{fontSize:'25px',padding:'0'}}>{LogoUnidad}</p></b>
                  :
                  ''
                }
              </div>
            </Grid>
            <Grid item md={4}>
              <div style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100%',paddingTop:'20px'}}>
                <Button variant="contained" color='error' onClick={cerrarSesion}>cerrar sesion</Button>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* DrawerHeader modificado */}
        <DrawerHeader style={{backgroundColor:'',minHeight:'100px'}}>
          <LogoContainer>
            {
              LogoMenu!=''&&LogoMenu!=null?
              <img 
                src={`data:image/jpeg;base64,${LogoMenu}`} 
                alt="" 
                style={{
                  maxWidth: '200%',
                  maxHeight: '150%',
                  objectFit: 'contain',
                  width:'200%',
                  height:'150%'
                }}
              />
              :''
            }
          </LogoContainer>
          <IconButton style={{color:'black'}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider style={{backgroundColor:'#23282b'}}/>
        <List style={{backgroundColor:''}}>
          {Menus.length > 0 && Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <StyledListItemButton
                onClick={() => handleMenuClick(index,menu.subMenu,menu.url)}
                sx={{
                  bgcolor: expandedMenus[index] ? 'rgba(255, 54, 0, 0.08)' : 'inherit',
                }}
              >
                <ListItemIcon>
                  {Icons[menu.icon]}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
                {expandedMenus[index] ? (
                  <ExpandLessIcon className="arrow-icon" />
                ) : (
                  
                    menu.subMenu?
                    <ExpandMoreIcon className="arrow-icon" />
                    :''
                  
                )}
              </StyledListItemButton>
              
              <Collapse in={expandedMenus[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.submenu.map((submenu, subIndex) => (
                    <StyledListItemButton
                      key={subIndex}
                      onClick={() => handleNavigate(submenu.url)}
                      sx={{
                        pl: 4,
                      }}
                    >
                      <ListItemIcon>
                        {Icons[submenu.icon]}
                      </ListItemIcon>
                      <ListItemText primary={submenu.name} />
                    </StyledListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
          
        </List>
        {/* Contenedor fijo para el logo de unidad */}
        {
          LogoUnidad2!=''&&LogoUnidad2!=null?
          <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height: '120px',  // Altura fija
            padding: '10px',
            overflow: 'hidden'
          }}>
            <img 
              src={`${LogoUnidad2}`} 
              alt="" 
              style={{
                maxWidth:'60%',
                maxHeight:'100%',
                objectFit: 'contain'
              }}
            />
          </div>
          :''
        }
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 0 }} style={{padding:'0'}}>
          {view}
        </Typography>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'40px',fontSize:'18px',color:'white'}}>
          <a 
            href="https://www.workana.com/freelancer/6f8ef9b4f9ce40ed56ca0546c0959449"
            style={{ textDecoration: 'none' }}
          >
            
            <div style={{
              fontFamily: 'Arial, sans-serif',
              background: 'linear-gradient(45deg, #091435, red)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              display: 'inline-block',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              margin: '20px',
              cursor: 'pointer'
            }}>
              <span style={{ fontWeight: 300 }}>Powered by</span>
              {' '}
              <strong style={{ fontWeight: 600 }}>CrompelSolutions</strong>
              <span style={{ fontSize: '0.9em', opacity: 0.9 }}>©</span>
            </div>
          </a>
        </div>
      </Main>
    </Box>
  );
}