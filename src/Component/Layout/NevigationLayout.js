import { useLocation } from "react-router-dom";
import MainNevigation from "./MainNevigation";
import Footer from "./Footer";

function NevigationLayout(props) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {!(isLoginPage || isRegisterPage || isHomePage) && <MainNevigation />}
      <main style={{ flex: "none" }}>{props.children}</main>
      <Footer />
    </div>
  );
}
export default NevigationLayout;
