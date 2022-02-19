import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import { NavLink } from "react-router-dom";
import LoginLogoutButton from "../components/LoginLogoutButton";
import { Row, Col } from "react-bootstrap";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

// --------------REGEX Form Validation-----------------
//> username must start with a lower or upper case letter then followed by 3 to 23 charecters: lower or upper case letters , digits hyphen or underscore
//< password must have at least one character, lowercase letter, one uppercase letter, one digit, one special charechter between 8 and 24 charechters
//! need to add email validation explanition to REGEX....invalid email format

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// adds a timestamp to the user activity
export const timeStamp = new Date().toString();
console.log("⏰ " + timeStamp);

function CreateAccount() {
  const userRef = useRef();
  const errRef = useRef();

  // sets and validates the username
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // sets and validates the email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // sets and validates the paassword
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // sets and validates the confirm password
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // sets the error messages or success messages ==> need to be used/assigned a function
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // shows and hids part of the screen
  const [show, setShow] = useState(true);

  //sets the status. use for user status/account status ==> need to be used/assigned a function
  const [status, setStatus] = useState("");

  const ctx = useContext(UserContext);

  // sets the focus when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // applies REGEX to validate the username . it will reloads when the user name changes
  useEffect(() => {
    setValidName(USER_REGEX.test(user));

    console.log("👽" + user);
  }, [user]);

  // applies REGEX to validate the email. it will reloads when the email changes
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));

    console.log("📨" + email);
  }, [email]);

  // applies REGEX to validate the password and passwordMatch . it will reloads when the  new password, and confirmation entered
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log("🤔" + result);
    console.log("🤫 " + pwd);
    setValidPwd(result);

    // checks the password and confirmation
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // removes any error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  //checks if account exist by checking id email exists
  function checkAccountExist(email) {
    let account = ctx.users.filter((item) => item.email === email);
    return account.length;
  }

  //> the function fires when the user hits submit button on the form
  //! ------ info for creating the account gathered here and structured here, we can add more fields and add more values to UserContext and  appropriate "ctx.value" needed from those fields and more state and functions as needed: like address, phone number, birthdate, etc ---------

  function createAccount() {
    // checks if the user entered the incorrect information for each field sets the login status to false => no account access
    if (!validName || !validEmail || !validPwd || !validMatch) {
      ctx.login = false;
      return;
    }
    // if the user tries to create an account and email exist
    if (checkAccountExist(email) > 0) {
      errMsg("User or email account already exist.");
      setTimeout(() => setErrMsg(""), 3000);
      return;
    }

    // tracks and saves the activities with time stamp
    ctx.actions.push({
      user,
      email,
      pwd,
      action: "Account Created",
      created: timeStamp,
      stamp: timeStamp,
    });

    // tracks and saves user information and balance
    ctx.users.push({ user, email, pwd, balance: 500, created: timeStamp });
    setShow(false);
    ctx.login = true;
    clearForm();
  }
  //!    ------------------------------------------------------

  //> if the user exist and the user login
  function accountLogin() {
    if (ctx.login) {
      // finds the user index by email and password from the list of users and sets the value
      const userIndex = ctx.users.findIndex(
        (item) => item.email == email && item.pwd == pwd
      );

      ctx.users.splice(userIndex, 1);
      ctx.users.splice(0, 0, {
        user: user,
        email: email,
        pwd: pwd,
        balance: 0,
      });

      ctx.log = true;
    } else return;
  }

  function clearForm() {
    setUser("");
    setEmail("");
    setPwd("");
    setMatchPwd("");
  }

  return (
    <>
    {ctx.users[0].user != "" &&
    ctx.users[0].email != "" &&
    ctx.users[0].pwd != "" &&
    show ? (
      <>
        <div className="text-end text-uppercase">{ctx.users[0].user}</div>
        <Row>
          <Col className="text-end">
            <LoginLogoutButton />
          </Col>
        </Row>
        <div className="text-center fs-4 mt-5">
          Please <span className="fw-bold">log out</span> to be able to create
          another account.
        </div>
      </>
    ) : (
      <>
        {show ? (
          <>
            {/* //>>################################## */}
            <div className="creataccountform">
              <h2>Create An Account</h2>
              <div className="bg-img">
                {success ? (
                  <section>
                    <h1>Success!</h1>
                    <p>
                      <a href="#SignIn">Sign In</a>
                    </p>
                  </section>
                ) : (
                  <section>
                    {/* //!############################################# */}
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <h1>Create Your New BadBank Account</h1>
                    <form
                      onSubmit={() => {
                        createAccount();
                        accountLogin();
                      }}
                    >
                      <label htmlFor="username">
                        Username:
                        <span className={validName ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={validName || !user ? "hide" : "invalid"}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      />
                      <p
                        id="uidnote"
                        className={
                          userFocus && user && !validName
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                      {/* //<############################## */}
                      <label htmlFor="email">
                        Email:
                        <span className={validEmail ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={
                            validEmail || !email ? "hide" : "invalid"
                          }
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
                        <span
                          className={validPwd || !pwd ? "hide" : "invalid"}
                        >
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
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                      </p>

                      <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span
                          className={
                            validMatch && matchPwd ? "valid" : "hide"
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={
                            validMatch || !matchPwd ? "hide" : "invalid"
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="password"
                        id="confirm_pwd"
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                      <p
                        id="confirmnote"
                        className={
                          matchFocus && !validMatch
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                      </p>

                      <button
                        disabled={
                          !validName ||
                          !validEmail ||
                          !validPwd ||
                          !validMatch
                            ? true
                            : false
                        }
                      >
                        Sign Up
                      </button>
                    </form>
                    <p>
                      Already registered?
                      <br />
                      <span className="line">
                        {/*put router link here*/}
                        <a href="https://github.com/">Sign In</a>
                      </span>
                    </p>
                  </section>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* //<############################## */}
            <div className="fs-1 mt-4 text-center text-primary">
              Your account has been created successfully. Please Login to your
              account. {ctx.users[0].user}
            </div>
            <Card
              style={{ maxWidth: "25rem", marginTop: "3rem" }}
              bgcolor="dark"
              header="Create Account"
              status={status}
              body={
                <>
                  <h5 className="fs-2">Success</h5>
                  <br />
                  <NavLink to="/login" className="btn btn-primary ms-4">
                    Your account has been created successfully. Please Login
                    to your account.
                  </NavLink>
                </>
              }
            />
          </>
        )}
      </>
    )}
  </>
  );
}

export default CreateAccount;

// for setting up with axios server
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // if button enabled with JS hack
//   const v1 = USER_REGEX.test(user);
//   const v3 = EMAIL_REGEX.test(email);
//   const v2 = PWD_REGEX.test(pwd);
//   if (!v1 || !v2 || !v3) {
//     setErrMsg("Invalid Entry");
//     return;
//   }
//   try {
//     const response = await axios.post(
//       REGISTER_URL,
//       JSON.stringify({ user,email, pwd }),
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     console.log(response?.data);
//     console.log(response?.accessToken);
//     console.log(JSON.stringify(response));
//     setSuccess(true);
//     // clear input fields if you want to
//   } catch (err) {
//     if (!err?.response) {
//       setErrMsg("No Server Response");
//     } else if (err.response?.status === 409) {
//       setErrMsg("Username Taken");
//     } else {
//       setErrMsg("Registration Failed");
//     }
//     errRef.current.focus();
//   }
// };
