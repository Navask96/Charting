import React from 'react';
import { Container, Typography, Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const usersData = [
  { name: 'kavindan somapala', email: 'kavindan9512@gmail.com', role: 'Owner, Administrator' },
  // Add more users as needed
];

const Main = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Organization Setings
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Manage your team members and their account permissions here.
        </Typography>

        {/* Invite A User */}
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Invite A User
        </Button>
       

        {/* Admin Table */}
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>USERS</TableCell>
                <TableCell>ROLES</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

         {/* Users Table */}
         <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>USERS</TableCell>
                <TableCell>ROLES</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Additional sections can be added as needed */}
    </Container>
  );
};

export default Main;
