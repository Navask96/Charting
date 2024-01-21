import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createEverything, getAllEverything, updateEverything, getOne } from "../service.global";

const usersData = [
  { id: 1, name: "kavindan somapala", email: "kavindan9512@gmail.com", role: "Administrator" },
  // Add more users as needed
];

const Organization = () => {
  const userData = localStorage.getItem("userData");
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [organization,setOrganization]=useState([])

  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    } else {
      // getAllEverything("users").then((res) => {
      //   setAllUsers(res);
      // });
      getOrganization()
    }
  }, [navigate, userData]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditModalOpen(true);
  };

  

  const handleSaveEdit = () => {
    // Perform save logic here
    setEditModalOpen(false);
  };

  const getOrganization = () => {
    getAllEverything("organization").then((res) => {
      if (res) {
        setOrganization(res);
        console.log(res)
      }
    }).catch((err) => {
      console.log(err);
    });
  };
  
 


  const [roleChangeModalOpen, setRoleChangeModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [roleChangeUser, setRoleChangeUser] = React.useState(null);

  const handleRoleChangeClick = (user) => {
    setRoleChangeUser(user);
    setSelectedUser(user._id);
    setRoleChangeModalOpen(true);
  };

  const handleSaveRoleChange = () => {
    // Perform role change logic here using selectedRole and roleChangeUser
    console.log(`Changing role to ${selectedRole}`);

    const data = {
      ...organization[0],
      users: organization[0].users.map((item) => {
        if (item._id === selectedUser) {
          item.role = selectedRole;
        }
        return item;
      }),
    }
    updateEverything(organization[0]._id, data, "organization").then((res) => {
      if (res) {
        console.log(res)
        getOrganization()
      }
    }).catch((err) => {
      console.log(err);
    })


    setRoleChangeModalOpen(false);
  };

  const [createOrgModalOpen, setCreateOrgModalOpen] = React.useState(false);
  const [newOrgName, setNewOrgName] = React.useState("");

  const handleCreateOrgClick = () => {
    setCreateOrgModalOpen(true);
  };

  const handleCreateOrgSubmit = () => {
    // Perform organization creation logic here using newOrgName
    const data={
      ent:'organization',
      data:{
        name:newOrgName,
        owner:JSON.parse(userData)._id,
        users:[{_id:JSON.parse(userData)._id,firstName:JSON.parse(userData).firstName,role:'Admin'}]
      }
    }
    createEverything(data).then((res)=>{
      if(res){
        console.log(res)
        getOrganization()
        setCreateOrgModalOpen(false);
      }
    }).catch((err)=>{
      console.log(err)
    })

    console.log(`Creating organization with name: ${newOrgName}`);
    setCreateOrgModalOpen(false);
  };

  const handleRemoveUser = (user) => {
    // Implement logic to remove the user from the organization
    // For example, you can send a request to your backend to update the organization data
    const updatedUsers = organization[0].users.filter((item) => item._id !== user._id);
  
    const data = {
      ...organization[0],
      users: updatedUsers,
    };
  
    updateEverything(organization[0]._id, data, "organization")
      .then((res) => {
        if (res) {
          console.log(res);
          getOrganization();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div style={{ marginTop: 20, padding: 10, paddingLeft: 50, paddingRight: 50 }}>
        <Typography variant="h4" gutterBottom>
          Organization Settings
        </Typography>

        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Manage your team members and their account permissions here.
          </Typography>

          {/* Invite A User */}
          <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
            Invite A User
          </Button>

           {/* Create Organization Button */}
        <Button disabled={organization[0]} variant="contained" color="primary" onClick={handleCreateOrgClick}>
          Create Organization
        </Button>
        {organization.length>0 && <Typography variant="h6" gutterBottom style={{marginTop:'20px'}}>
            Organization Name: {organization[0].name}
          </Typography>
        }

          {/* Admin Table */}
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>USERS</TableCell>
                  <TableCell>ROLES</TableCell>
                  <TableCell>Change Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organization[0]?.users?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" size="small" onClick={() => handleRoleChangeClick(user)}>
                        Change Role
                      </Button>
                      <Button variant="outlined" color="secondary" size="small" onClick={() => handleRemoveUser(user)}>
          Remove User
        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

      {/* Edit User Information Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editingUser?.name || ""}
            // Add onChange handler to update the user object
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

   {/* Change User Role Modal */}
<Dialog open={roleChangeModalOpen} onClose={() => setRoleChangeModalOpen(false)}>
  
  <DialogContent>
    <Typography style={{
      marginBottom: "20px"
    }}>Current Role: {roleChangeUser?.role}</Typography>
    <FormControl fullWidth>
      <InputLabel  id="role-select-label">Select a new role</InputLabel>

      <Select
        
        labelId="role-select-label"
        id="role-select"
        size='small'
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        label="Select a new role"
      >
        <MenuItem value={"Admin"}>Admin</MenuItem>
        <MenuItem value={"User"}>Normal User</MenuItem>
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setRoleChangeModalOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSaveRoleChange} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

{/* Create Organization Modal */}
<Dialog open={createOrgModalOpen} onClose={() => setCreateOrgModalOpen(false)}>
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent>
          <TextField
            label="Organization Name"
            fullWidth
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOrgModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateOrgSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default Organization;
