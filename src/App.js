import NavBar from "./components/navbar.js";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllData from "./frontend/alldata.js";
import CreateAccount from "./frontend/createaccount.js";
import Deposit from "./frontend/deposit.js";
import Home from "./frontend/home.js";
import Withdraw from "./frontend/withdraw.js";
import Login from "./frontend/login.js";
import Logout from "./frontend/logout";
import Footer from "./components/footer";
import DashBoard from "./frontend/DashBoard"
import "./frontend/Home.css"


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
            <Routes>
              <Route path="/" exact  element={<Home />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              <Route path="/dashboard/" element={<DashBoard />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/alldata/" element={<AllData />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/logout/" element={<Logout />} />
            </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
