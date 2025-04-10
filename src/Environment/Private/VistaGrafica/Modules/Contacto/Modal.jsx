import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open,setOpen,view,titulo,maxWidth=false}) {
//   const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={maxWidth?'xl':'sm'}
      >
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px',fontSize:'20px'}}>
                {titulo}
            </div>
            {
                view
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}