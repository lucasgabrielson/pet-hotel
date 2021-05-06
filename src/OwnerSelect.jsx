import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline',
    marginTop: theme.spacing(2),
    maringLeft: 2
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  }));


export default function OwnerSelect(props) {
  const [currentOwner, SetCurrentOwner] = useState('')
  
  const owners = useSelector( (store)  => {
    return store.owners; 
  }) 
  
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    props.setOwner(event.target.value);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {JSON.stringify(owners)}
      <Button className={classes.button} onClick={handleOpen}>
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Owner</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {owners.map(owner => {
            return (
            <MenuItem value={owner.id}>{owner.name}</MenuItem>
              )
             })}
        </Select>
      </FormControl>
    </div>
  );
}