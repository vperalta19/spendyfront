import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { orange } from '@material-ui/core/colors';

import '../styles/NavBar.css'

const useStyles = makeStyles((theme) => ({
  
  formControl: {
    
    minWidth: 120,
    width: '90%',
    borderBottom: 0,
    color: orange[400],
    
  },

  seleccion:{
    color: orange[400],
    padding: '7px',
    borderRadius: '25px',
    
    
  }
}));

export default function ControlledOpenSelect(props) {
  const getMoneda = props.context.FondosController.getMoneda()
  if (!getMoneda || !getMoneda.length){
    props.context.FondosController.setMoneda('Pesos');
  }
  const classes = useStyles();
  const [moneda, setMoneda] = React.useState(getMoneda);
  const [open, setOpen] = React.useState(false);

  

  const handleChange = (event) => {
    props.context.FondosController.setMoneda(event.target.value)
    setMoneda(event.target.value);
    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={moneda}
          onChange={handleChange}
          className={classes.seleccion}
        >
          <MenuItem value={'Pesos'}>Pesos</MenuItem>
          <MenuItem value={'Dolares'}>Dolar</MenuItem>
          <MenuItem value={'Euros'}>Euro</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
