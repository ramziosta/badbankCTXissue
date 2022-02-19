import { useState, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import DashBoard from "./DashBoard";
import "./SignIn.css";

const timeStamp = new Date().toLocaleDateString();

export default function Login() {
  
  const [show, setShow] = useState(true);
  // tracks the status, but not used
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  // here it tracks the button being disabled when form in not filled
  const [isDisabled, setIsdisabled] = useState(true);
  const ctx = useContext(UserContext);
  
// checks to see if the email and password match the saved data from registration.
  function handleLogin() {
      let act = ctx.users.filter(item => item.email === email && item.pwd === pwd);
      if(act.length < 1) {
       alert(
        "Account email or password is incorrect, please try again. If you dont have an account, please register."
      );
        return;
      }

    ctx.sessionActivity.push({
      activity: "Login",
      stamp: timeStamp
    });

    ctx.log = true;
    setStatus("LogedIn")
    setShow(false);
    clearForm();
  }

  function clearForm() {
    setEmail("");
    setPwd("");
    setIsdisabled(true);
    // setShow(false);
  }

  return (
    <>
      {show ? (
        //the form for the user to login
        <>
           <div style={{ height: "600px" }}>
            <Card
              style={{
                maxWidth: "25rem",
                marginTop: "8rem",
                backgroundColor: "rgba(108, 108, 108, 0.4)",
                width: "100%",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "1rem",
              }}
              className="loginCard"
              status={status}
              body={
                <>
                  <h1
                    className="logocolor"
                    style={{
                      border: "solid 2px grey",
                      padding: ".4rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </h1>
                  <br />
                  <label htmlFor="email">Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={pwd}
                    required
                    onChange={(e) => {
                      setPwd(e.currentTarget.value);
                      setIsdisabled(false);
                      if (!e.currentTarget.value) setIsdisabled(true);
                    }}
                  />
                  <br />
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </>
              }
            />
          </div>
        </>
      ) : (
        //after log in we go to the dashboard
        <>
          <div style={{ height: "650px" }}>
            <DashBoard />
          </div>
        </>
      )}
    </>
  );
}



