import { Grid } from "@mui/material";
import AccountDetails from "../Component/User/AccountDetails";
import ChangePassword from "../Component/User/ChangePassword";
import DeleteUserAccount from "../Component/User/DeleteAccount";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const userInLocalStorage = localStorage.getItem("userData");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInLocalStorage === null) {
      navigate("/login");
    }
  }, [navigate, userInLocalStorage]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AccountDetails userData={JSON.parse(userInLocalStorage)} />
      </Grid>
      <Grid item xs={12}>
        <ChangePassword userData={JSON.parse(userInLocalStorage)} />
      </Grid>
      <Grid item xs={12}>
        <DeleteUserAccount userData={JSON.parse(userInLocalStorage)} />
      </Grid>
    </Grid>
  );
};
export default Account;
