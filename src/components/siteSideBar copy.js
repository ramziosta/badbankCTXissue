import LoginLogoutButton from "./LoginLogoutButton";
import { Link } from "react-router-dom";
import "./siteSideBar.css";

export default function SiteSideBar() {

  return (
    <div className="sidebar">
      <Link
        to="/dashboard"
      >
        Dashboard
      </Link>
      <Link
        to="/deposit"
      >
        Deposit
      </Link>
      <Link
        to="/withdraw"
      >
        Withdraw
      </Link>
      <Link
        to="/alldata"
      >
        Users
      </Link>
      <LoginLogoutButton />
    </div>
  );
}
