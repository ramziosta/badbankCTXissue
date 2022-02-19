import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import Card from "../components/context";
import { UserContext } from "../components/context";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.css";

// --------------REGEX Form Validation-----------------
//> username must start with a lower or upper case letter then followed by 3 to 23 charecters: lower or upper case letters , digits hyphen or underscore
//< password must have at least one character, lowercase letter, one uppercase letter, one digit, one special charechter between 8 and 24 charechters
//! need to add email validation explanition to REGEX....invalid email format

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// adds a timestamp to the user activity
const timeStamp = new Date().toLocaleDateString();
// console.log("⏰ " + timeStamp);

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

  //creates an account number last 4 digits Only
  const[accountNumber, setAccountNumber] = useState("");
  // sets the error messages or success messages ==> need to be used/assigned a function
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //> sets warnings and errors
  const [warn, setWarn] = React.useState("");
  // shows and hids part of the screen
  const [show, setShow] = useState(true);

  //sets the status. use for user status/account status ==> need to be used/assigned a function. can be used for chat with customer service, if online/not 
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

  // checks if input field is empty 
  function emptyFieldValidation(field, label) {
    if (!field) {
      setWarn(alert(label + " cant be blank"));
      setTimeout(() => setWarn(""), 3000);
      return false;
    }
    return true;
  }


  //checks if account exist by checking id email exists
  function checkAccountExist(email) {
    let account = ctx.users.filter((item) => item.email === email);
    return account.length;
  }

  //> the function fires when the user hits submit button on the form
  // ------ info for creating the account gathered here and structured here, we can add more fields and add more values to UserContext and  appropriate "ctx.value" needed from those fields and more state and functions as needed: like address, phone number, birthdate, etc ---------

  function AccountRegistration() {
    //! these two validations need to be refactored into a useEffect/useRef/onFocus
    // checks no empty fields.... this is used for the course rubix. not needed for my form my REGIX and DIsabled button is enough.
    if (!emptyFieldValidation(user, "name")) return;
    if (!emptyFieldValidation(email, "email")) return;
    if (!emptyFieldValidation(pwd, "password")) return;
    // checks if email already exist and alerts the user to use a different email address or login
    if (checkAccountExist(email) > 0) {
      setWarn(alert("An account with this email already exist. Please login or use a different email address."));
      setTimeout(() => setErrMsg(""), 3000);
      return;
    }

    // checks if the user entered the incorrect information for each field sets the login status to false => no account access
    if (!validName || !validEmail || !validPwd || !validMatch ) {
      ctx.register = false;
      return;
    }

    //creates a random last 4 digit account number
    let accountNumber = Math.floor(Math.random()*10000);

    setAccountNumber(accountNumber);
    console.log("🏦 "+ accountNumber)

    // tracks and saves user information and balance
    ctx.users.push({ 
      user, 
      email, 
      pwd, 
      balance: 500, 
      amount: 500, 
      created: timeStamp, 
      transactionDate: timeStamp,
      transactionType: "New account credit",
      activity: "New account registration",
      accountNumber,
      accountType:"Checking",
      stamp: timeStamp,
      });
      console.log("🏦 "+ accountNumber)

    // after account is created the registration form is hidden and a success div appears
    setShow(false);
    setStatus("registered")
    setSuccess(true);
    // this will set the account to registered status
    ctx.register = true; 
    clearForm();
  }
  //--------------------------END---------------------------

  // all input fields are set to blank
  function clearForm() {
    setUser("");
    setEmail("");
    setPwd("");
    setMatchPwd("");
  }

// finds the user index by email and password
  const handleLogout = () => {
    const elementIndex = ctx.users.findIndex(
      (item) => item.email === "" && item.pwd === ""
    );
    ctx.users.splice(elementIndex, 1);
    ctx.users.splice(0, 0, {
      name: "",
      email: "",
      pwd: "",
      balance: null,
    });
    ctx.log = false;
  };

  return (
    <>
      {show ? (
        <>
         <div className="creataccountform" style={{marginBottom:"4rem"}}>
            
            <div className="bg-img">
              {success ? (
                <section>
                  <h1>Success!</h1>
                  <p>
                    <a href="#SignIn">Sign In</a>
                  </p>
                </section>
              ) : (

                <section className="registrationForm">
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <h4 className="formId">Register a new BadBank account.</h4>
                  <Card
                      style={{width:"20rem"}}
                    bgcolor="secondary"
                    warn={warn}
                  body={

                    <form
                    onSubmit={() => {
                      AccountRegistration();
                      clearForm();
                    }}
                  >
                  {/* ------------------USERNAME----------------- */}
                    <label htmlFor="username">
                      Username:
                      <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder=""
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

                    {/* ----------------EMAIL--------------- */}
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
                      placeholder=""
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
             
                    {/* ------------------PASSWORD----------------- */}
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
                      placeholder=""
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

                      {/* ------------------CONFIRM PASSWORD----------------- */}
                    <label htmlFor="confirm_pwd">
                      Confirm Password:
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      id="confirm_pwd"
                      placeholder=""
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
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>

                    <button
                    
                      disabled={
                        !validName || !validEmail || !validPwd || !validMatch
                          ? true
                          : false
                      }
                    >
                      Sign Up
                    </button>
                  </form>

                  }
                   />
                 
                  <p>
                    Already Registered?
                    <br />
                    <Link to="/login" className="formLogin" style={{textDecoration: 'none'}}>
                      Login To Your Account.
                    </Link>
                  </p>
                </section>
            
              )}
            </div>
          </div>
        </>
      ) : (
        <>
         
         {/* after registration this div appears with SUCCESS */}
          <div className="fs-1 mt-4 text-center" >
          </div>
          <Card
            style={{ maxWidth: "25rem", marginTop: "5rem", textAlign:"center", marginBottom:"8rem", backgroundColor:"rgba(108, 108, 108, 0.4)", width: "100%", minHeight: "400px", display: "flex",
              flexDirection: "column", justifyContent: "flex-start", padding: "1rem" }}
            header="Your account has been created successfully.
             Please Login to access your
             account."
            status={status}
            body={
              <>
                <h5 className="fs-2">Success  <br />The last 4 digits of your account number are {accountNumber} </h5>
                <Link to="/login"  className="btn btn-primary fs-2 Link"
                style={{ borderRadius: "0px" }}>
                 LogIn
                </Link>
                <br />
                <h5 style={{margin: "2rem 0rem"}} >Open New Savings Account</h5>
                <Link
                to="/CreateAccount/"
                className="fs-2 Link"
                style={{ borderRadius: "0px", textDecoration:"none", }}
                onClick={{handleLogout}}
              >
                Create an Account
              </Link>
              </>
            }
          />
        </>
      )}
    </>
  );
}

export default CreateAccount;
