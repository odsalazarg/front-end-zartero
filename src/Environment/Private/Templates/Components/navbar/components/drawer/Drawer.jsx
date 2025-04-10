import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import { MenuAside } from '../../../../menuAside/MenuAside';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { MenuListado } from './MenuList';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GarageIcon from '@mui/icons-material/Garage';
import InventoryIcon from '@mui/icons-material/Inventory';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useEffect } from 'react';



export default function TemporaryDrawer({setOpenDrawer,OpenDrawer,Contador}) {
//   const [open, setOpen] = React.useState();
const navigate = useNavigate();
const [Icons, setIcons] = useState([<HomeIcon/>,<SupervisedUserCircleIcon/>,<ApartmentIcon/>,<MapsHomeWorkIcon/>,<Diversity3Icon/>,<DirectionsCarFilledIcon/>,<GarageIcon/>,<InventoryIcon/>])
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleNavigate=(url)=>{
    // alert(url)
    navigate(url);
  }
  
  const DrawerList = (
    <Box sx={{ width: 250,height:'100%' }} style={{backgroundColor:'#23282b',color:'white'
    }}  role="presentation" onClick={toggleDrawer(false)}>
      
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px',fontFamily:'sans-serif'}}>
        ADMIN GESTION
      </div>
      <Divider style={{backgroundColor:'white'}}/>
      <List >
        {MenuListado.map((child) => (
          <ListItem key={child.name} disablePadding onClick={()=>handleNavigate(child.url)}>
            <ListItemButton>
              <ListItemIcon style={{color:'white'}}>
                 {
                  Icons[child.icon]
                 }
              </ListItemIcon>
              
              <ListItemText primary={child.name} />
            </ListItemButton>
            <Divider style={{backgroundColor:'white'}}/>
          </ListItem>
          
        ))}
      </List>
      <Divider style={{backgroundColor:'white'}}/>
      
      
    </Box>
  );

  
  

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={OpenDrawer} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  );
}