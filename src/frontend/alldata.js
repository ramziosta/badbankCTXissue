import { useContext } from "react";
import { UserContext } from "../components/context";
import LoginLogoutButton from "../components/LoginLogoutButton";
import SiteSideBar from "../components/siteSideBar";
import { NavLink, Link } from "react-router-dom";
import "./alldata.css";
import Card from "../components/context";

function AllData() {
  const ctx = useContext(UserContext);

  const Table = () => {
    const userdata = ctx.users.filter((item) => item.user !== "");
    const UserInfo = userdata.map((info, index) => {
      return (
        <div>
          <h4
            className="header"
            style={{ fontSize: "1.3rem", color:"white" , padding:".4rem", border:"solid black 1px", backgroundColor: "#0079d5"}}
          >
            Account No. ending in {ctx.users[0].accountNumber}
          </h4>
          <table key={index}>
            <tr>
              <th>User Name</th>
              <td key={ctx.user}>{info.user}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td key={ctx.email}>{info.email}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td key={ctx.pwd}>{info.pwd}</td>
            </tr>
            <tr>
              <th>Date Created</th>
              <td key={ctx.created}>{info.created}</td>
            </tr>
            <tr>
              <th>Account Type</th>
              <td key={ctx.accountType}>{info.accountType}</td>
            </tr>
          </table>
        </div>
      );
    });

    return <tbody>{UserInfo}</tbody>;
  };

  return (
    //> shows the login button and create an account if user not found/ not created/ not logged in
    <>
      {ctx.users[0].user === "" ? (
        <>
          <Link to="/login" className="fa fa-user"></Link>
          <div className="text-center fs-4 mt-5" style={{ height: "600px" }}>
            Please <LoginLogoutButton />
            <br />
            or <NavLink to="/createaccount/">Create An Account.</NavLink>
          </div>
        </>
      ) : (
        <>
          <SiteSideBar />
          <div className="content">
            <Card
              body={
                <div>
                  <table>
                    <Table />
                  </table>
                </div>
              }
            />
          </div>
        </>
      )}
    </>
  );
}

export default AllData;