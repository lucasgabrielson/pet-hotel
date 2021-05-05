import React from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PetAdd() {
  const classes = useStyles();

  return (
      <>
    <h2>Pet Add</h2>
    <form className={classes.root} noValidate autoComplete="off">
        <Input placeholder="Pet Name" inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Pet Color" inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Pet Breed" inputProps={{ 'aria-label': 'description' }} />
        <OwnerSelect />
    </form>
            
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Owner</TableCell>
            <TableCell align="right">Pet</TableCell>
            <TableCell align="right">Breed</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Checked-In</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}





// function PetAdd() {
//     return(
//         <>
//             <h2>Pet Add</h2>
//             <form action="">
//                 <input type="text" placeholder="Pet Name"/>
//                 <input type="text" placeholder="Pet Color"/>
//                 <input type="text" placeholder="Pet Breed"/>
//                 <select name="" id="">
//                     <option value="">owner1</option>
//                     <option value="">owner2</option>
//                 </select>
//                 <button>Submit</button>
//             </form>
//             <table>
//                 <th>
//                     <td>Owner</td>
//                     <td>Pet</td>
//                     <td>Breed</td>
//                     <td>Color</td>
//                     <td>Checked in</td>
//                     <td>Actions</td>
//                 </th>
//             </table>
//         </>
//     )
// }

// export default PetAdd; 