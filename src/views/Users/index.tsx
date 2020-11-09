import React, { useEffect, useState } from 'react';
import { reqUser } from 'services/user.service';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface Column {
  id: 'id' | 'firstName' | 'lastName' | 'age';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  {
    id: 'age',
    label: 'Age',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  }
];

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    reqUser().then((response: any) => setUsers(response));
  }, []);

  const handleDelete = (): void => {
    console.log('delete');
  };

  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((row, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={`user-${index}`}>
              {columns.map(column => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
              <TableCell>
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Users;
