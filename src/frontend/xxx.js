import { useRef, useState, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoginLogoutButton from "../components/LoginLogoutButton";
import SiteSideBar from '../components/siteSideBar'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

export const LoginUser = ({ user }) => {
  return (
    <>
      <h3>
        Welcome back <span className="text-primary">{user.user}</span>
      </h3>
      <br />
      <h5>
        Your balance is: <span className="fw-bold">${user.balance}</span>
      </h5>
    </>
  );
};
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function Login() {
  const [show, setShow] = useState(true);
  const [isDisabled, setIsdisabled] = useState(true);
  const [user, setUser] = useState({});
  const ctx = useContext(UserContext);

  //!--------------
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // sets and validates the paassword
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // sets the error messages or success messages ==> need to be used/assigned a function
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //sets the status. use for user status/account status ==> need to be used/assigned a function
  const [status, setStatus] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  function validate(field, label) {
    if (!field) {
      alert(`${label} is required. You can't leave it blank.`);
      // setStatus("Error: " + label);
      // setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    // if (!validate(email, "Email")) return;
    const userLogin = ctx.users.filter(
      (item) => item.email == email && item.pwd == pwd
      
    );

    if (userLogin.length == 0) {
      alert("email or password is incorrect");
      clearForm();
    }
    if (userLogin.length != 0) {
      setShow(false);
      const elementIndex = ctx.users.findIndex(
        (item) => item.email == email && item.pwd == pwd
      );
      //   const element = ctx.users[elementIndex]
      ctx.users.splice(elementIndex, 1);
      ctx.users.splice(0, 0, userLogin[0]);
      setUser(userLogin[0]);
    }
    ctx.log = true;
  }

  function clearForm() {
    setEmail("");
    setPwd("");
    setIsdisabled(true);
    setShow(true);
  }

  return (
    <>
      {show ? (
        <>
       
           
             
            <section className="registrationForm">
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <h3 className="logocolor" style={{border:"solid 2px lightgrey", padding:".5rem", marginTop:"1rem"}}>Log In</h3>
                  <form
                    onSubmit={() => {
                     handleLogin();
                      clearForm();
                    }}
                  >
                   
                    <label htmlFor="email">
                      Email:
                      <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validEmail || !email ? "hide" : "invalid"}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={email}
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        emailFocus && email && !validEmail
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Invalid email format.
                      <br />
                      Please enter a valid email address.
                      <br />
                      ex. example@email.com
                      <br />
                    </p>
                    {/* //<############################## */}
                    <label htmlFor="password">
                      Password:
                      <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>

                     <button
                    
                      disabled={
                         !validEmail || !validPwd 
                          ? true
                          : false
                      }
                    >
                      Log In
                    </button>
                  </form>
                  </section>

        </>
      
      ) : (
        <>
        <SiteSideBar />
          <div className="text-end text-uppercase">{ctx.users[0].user}</div>
          <Row>
            <Col className="text-end">
              <LoginLogoutButton />
            </Col>
          </Row>
          <Card
            style={{ maxWidth: "25rem", marginTop: "4rem" }}
            bgcolor="dark"
            status={status}
            body={
              <>
                <LoginUser user={user} />
                <br />
                <Row className="text-center">
                  <Col>
                    <NavLink to="/deposit" className="btn btn-primary">
                      Make a deposit
                    </NavLink>
                  </Col>
                  <Col>
                    <NavLink to="/withdraw" className="btn btn-primary">
                      Make a withdraw
                    </NavLink>
                  </Col>
                </Row>
              </>
            }
          />
        </>
      )}
    </>
  );
}

export default Login;
