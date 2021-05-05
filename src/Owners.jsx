import React, {useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    inputContainer: {
                display: 'flex',
                
    },
}));

const columns = [
  { field: 'firstName', headerName: 'First name', width: 250 },
  { field: 'petNumber', headerName: 'Number of Pets', type:'number', width: 250 },
  {
    field: "button",
    headerName: "Action",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
      };
      return <Button onClick={onClick}>Click</Button>;
    },
    width: 260
  }
];



const rows = [
  { id: 1, firstName: 'Jon', petNumber: '6' },
  { id: 2, firstName: 'Jon', petNumber: '6' },
];

const Owners = () => {

    const classes = useStyles();

    const handleClick = () => {

    }

    const [search, setSearch] = useState('');
    return (
        <>
            <div>
                <Toolbar>
                    <div className ={classes.inputContainer}>
                        <TextField onChange={e => setSearch(e)} />
                        <AddCircleOutlineIcon onClick={() => handleClick()}/>
                    </div>
                </Toolbar>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5}  />
            </div>
        </>
    )
}

export default Owners
