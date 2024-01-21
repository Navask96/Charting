import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import PeopleIcon from "@mui/icons-material/People";
import { getAllUsers } from "../service.global";

const Users = () => {
  const userData = localStorage.getItem("userData");
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    } else {
      getAllUsers().then((res) => {
        setAllUsers(res);
      });
    }
  }, [navigate, userData]);

  return (
    <div
      style={{ marginTop: 20, padding: 10, paddingLeft: 50, paddingRight: 50 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6} textAlign="right">
          <PeopleIcon sx={{ fontSize: 30, color: "#ababab" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ color: "#ababab" }}>
            Users
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                    First Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                    Last Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                    Company
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  allUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.companyName}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Users;
