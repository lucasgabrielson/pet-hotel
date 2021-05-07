import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


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

const Owners = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_OWNERS'})
    }, [])

    const classes = useStyles();

    const handleClick = () => {
        dispatch({type: 'ADD_OWNER', payload: name})
    }

    const owners = useSelector( store => store.owners) 

    const [name, setName] = useState('');

    const columns = [
        { field: 'name', headerName: 'First name', width: 250 },
        { field: 'count', headerName: 'Number of Pets', type:'number', width: 250 },
        {
            field: "deleteButton",
            headerName: "Delete",
            disableClickEventBubbling: true,
            renderCell: (params) => {
            const onClick = () => {
                console.log('delete', params.row);
                dispatch({type: 'DELETE_OWNER', payload: params.row})
            };
            return <Button onClick={onClick}>Delete</Button>;
            },
        
            width: 260
        },
        {
            field: "editButton",
            headerName: "Edit",
            disableClickEventBubbling: true,
            renderCell: (params) => {
            const onClick = () => {
                console.log('edit', params.row);
            };
            return <Button onClick={onClick}>Edit</Button>;
            },
        
            width: 260
        },
        
    ];

    return (
        <>
            <div>
                <Toolbar>
                    <div className ={classes.inputContainer}>
                        <TextField onChange={e => setName({ name: e.target.value })} />
                        <AddCircleOutlineIcon onClick={() => handleClick()}/>
                    </div>
                </Toolbar>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={owners} columns={columns} pageSize={5}  />
            </div>
        </>
    )
}

export default Owners
