import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { orange } from '@material-ui/core/colors';
import '../styles/BotonFlotante.css'

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
    
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        
        
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  botonFlotante: {
    backgroundColor: orange[400],
    color: orange[50],
  }

}));

const actions = [
  { icon: <AddBoxIcon />, name: 'Agregar Ingreso' },
  { icon: <IndeterminateCheckBoxIcon />, name: 'Agregar Gasto' },
];

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (e,event) => {
    e.preventDefault();
    if(event === 'Agregar Ingreso') {
        props.openIngresoFn()
    }
    else if(event === 'Agregar Gasto') {
      console.log('gasto')
      props.openGastoFn()
    }
    
  }

  return (
    <div className={classes.root}>
      
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial + ' boton-flotante'}
          icon={<SpeedDialIcon className={classes.botonFlotante}/>}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e)=>{handleClick(e,action.name)}}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}

