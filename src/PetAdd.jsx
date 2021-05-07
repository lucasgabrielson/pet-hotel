import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import OwnerSelect from './OwnerSelect';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function PetAdd() {

  const pets = useSelector( (store)  => {
    return store.pets; 
  }) 

  const classes = useStyles();
  const dispatch = useDispatch();
    

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [breed, setBreed] = useState('');
  const [owner, setOwner] = useState('');

  const newName = (event) => {
    setName(event.target.value);
  }

  const newColor = (event) => {
    setColor(event.target.value);
  }

  const newBreed = (event) => {
    setBreed(event.target.value);
  }

  const submitPet = () => {
    console.log('in submitPet:', owner )
    console.log('in submitPet:', petToAdd );
    dispatch({type: 'ADD_PET', payload: petToAdd })
  }

  const removePet = (pet) => {
    console.log('in removePet:', pet.id )
    // dispatch({type: 'DELETE_PET', payload: pet.id })
  }

  const updateStatus = (pet) => {
    console.log('in updateStatus:', pet.id )
    //dispatch({type: 'UPDATE_PETSTATUS, payload: pet.id })
  }

  //object to be sent to db on post 
  const petToAdd = {
    owner_id: owner,
    name,
    color,
    breed,
    checkin_status: false,
  }

  let display;

  const status = (pet) => {
    if(pet.checkin_status === false ){
      display = <TableCell align="right">Check-In</TableCell>
    } 
    else{
      display = <TableCell align="right">Check-Out</TableCell>
    } 
    return display
  }


  return (
      <>
    <h2>Pet Add</h2>
    {JSON.stringify({pets})}
    <form className={classes.root} noValidate autoComplete="off">
        <Input placeholder="Pet Name" onChange={newName} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Pet Color" onChange={newColor} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Pet Breed" onChange={newBreed} inputProps={{ 'aria-label': 'description' }} />
        <OwnerSelect setOwner={setOwner} />
        <button onClick={submitPet}>Submit</button>
    </form>
            
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Owner</TableCell>
            <TableCell align="center">Pet</TableCell>
            <TableCell align="center">Breed</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Checked-In</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell component="th" scope="row">{pet.owner_name}</TableCell>
              <TableCell align="center">{pet.name}</TableCell>
              <TableCell align="center">{pet.breed}</TableCell>
              <TableCell align="center">{pet.color}</TableCell>
              {status(pet)}
              <TableCell align="right"><button onClick={()=>removePet(pet)}>Delete</button><button onClick={()=>updateStatus(pet)}>Update Status</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

