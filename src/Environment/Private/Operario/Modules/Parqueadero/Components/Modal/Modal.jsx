import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import { List as Lista } from '../List';
import { ListVisitante } from '../List';
import { useEffect } from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog({MostrarModal,cerrarModal,DataList,Residente}) {
  
  useEffect(() => {
    console.log(DataList)
  }, [])
  

  return (
    <Dialog open={MostrarModal} maxWidth={'xl'} fullWidth={true}>
      <DialogTitle style={{padding:'0'}}>
        <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
            <IconButton aria-label="delete" color='error' onClick={cerrarModal}>
                <HighlightOffIcon/>
            </IconButton>
        </div>
      </DialogTitle>
      <div>
        {
          Residente?
            <Lista data={DataList} titulos={[
                { field: 'fecha_ingreso', headerName: 'Fecha_ingreso' },
                { field: 'fecha_salida', headerName: 'Fecha_salida' },
                { field: 'observacion', headerName: 'Observacion' },
                { field: 'observacion_salida', headerName: 'Observacion_salida' },
                { field: 'placa', headerName: 'Placa' },
                { field: 'tipo', headerName: 'Tipo' },
                { field: 'apartamento', headerName: 'Apartamento' },
                
            ]}/>
            :
            <ListVisitante data={DataList} titulos={[
              { field: 'fecha_ingreso', headerName: 'Fecha_ingreso' },
              { field: 'fecha_salida', headerName: 'Fecha_salida' },
              { field: 'observacion', headerName: 'Observacion' },
              { field: 'observacion_salida', headerName: 'Observacion_salida' },
              { field: 'autoriza', headerName: 'Autoriza' },
              { field: 'apartamento', headerName: 'Apartamento' },
              { field: 'visitante', headerName: 'Visitante' },
              { field: 'foto', headerName: 'Foto' },
              { field: 'placa', headerName: 'Placa/Cc' },
              { field: 'tipo', headerName: 'Tipo' },
              
          ]}/>
        }
        
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({MostrarModal,cerrarModal,DataList,Residente}) {
  

  

  return (
    <div>
      <SimpleDialog
        DataList={DataList}
        MostrarModal={MostrarModal}
        cerrarModal={cerrarModal}
        Residente={Residente}
      />
    </div>
  );
}