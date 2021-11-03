import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import "../css/dialog.css";

function PaperComponent(props) {
  return (
    <Draggable
      handle=".draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ open, onClose, title, actions, children}) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle 
        style={{ cursor: 'move', padding: "0px 5px 0px 15px" }} 
        className="draggable-dialog-title"
      >
        {title}
        <IconButton 
          color="info" 
          aria-label="close dialog" 
          component="span" 
          onClick={onClose}
        >
          <CancelIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>);
}