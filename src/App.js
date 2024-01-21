import { Routes, Route } from "react-router";
import NevigationLayout from "./Component/Layout/NevigationLayout";
import Dashboard from "./Pages/Dashboard";
import XmrChart from "./Pages/XmrChart";
import XBarChart from "./Pages/XBarChart";
import Login from "./Pages/Login";
import RegisterUser from "./Pages/RegisterUser";
import Account from "./Pages/Account";
import Users from "./Pages/Users";
import Organization from "./Pages/Organizations.js";
import Home from "./Pages/Home";

function App() {
  return (
    <NevigationLayout>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/i/:chartId" element={<XmrChart />}></Route>
          <Route path="/s/:chartId" element={<XBarChart />}></Route>
          <Route path="/register" element={<RegisterUser />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/organization" element={<Organization />}></Route>
        </Routes>
      </div>
    </NevigationLayout>
  );
}

export default App;
