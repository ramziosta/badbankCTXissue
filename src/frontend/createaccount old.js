import React from "react";
import { useState, useContext } from "react";
import Card from "../context";
import { UserContext } from "../context";
import { NavLink } from "react-router-dom";
import LoginLogoutButton from "../components/LoginLogoutButton";
import { Row, Col } from "react-bootstrap";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsdisabled] = useState(true);

  const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      alert(`${label} is required. You can't leave it blank.`);
      return false;
    }
    if (field === password && password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }
    if (field === email) {
      let checkEmail = ctx.users.filter((item) => email == item.email);
      if (checkEmail.length == 1) {
        alert("The email you entered is associated to an existing account");
        clearForm();
        return false;
      }
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "Name")) {
      ctx.login = false;
      return;
    }
    if (!validate(email, "Email")) {
      ctx.login = false;
      return;
    }
    if (!validate(password, "Password")) {
      ctx.login = false;
      return;
    }
    ctx.users.push({ name, email, password, balance: 0 });

    setShow(false);

    ctx.login = true;
  }

  function handleLogin() {
    //<##############################
    if (ctx.login) {
      const elementIndex = ctx.users.findIndex(
        (item) => item.email == email && item.password == password
      );
      //<##############################
      ctx.users.splice(elementIndex, 1);
      ctx.users.splice(0, 0, {
        name: name,
        email: email,
        password: password,
        balance: 0,
      });
      //<##############################
      ctx.log = true;
    } else return;
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      {ctx.users[0].name != "" &&
      ctx.users[0].email != "" &&
      ctx.users[0].password != "" &&
      show ? (
        <>
          <div className="text-end text-uppercase">{ctx.users[0].name}</div>
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
          <Row>
            <Col className="text-end">
              <LoginLogoutButton />
            </Col>
          </Row>

          {show ? (
            <>
              <div className="fs-1 mt-4 text-center text-primary">
                Let's create your account
              </div>

              <Card
                style={{ maxWidth: "25rem", marginTop: "3rem" }}
                bgcolor="dark"
                header="Create Account"
                status={status}
                body={
                  <>
                    <label htmlFor="name">Name</label>
                    <input
                      type="input"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => {
                        setName(e.currentTarget.value);
                        setIsdisabled(false);
                        if (!e.currentTarget.value) setIsdisabled(true);
                      }}
                    />
                    <br />
                    <label htmlFor="email">Email address</label>
                    <input
                      type="input"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
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
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                        setIsdisabled(false);
                        if (!e.currentTarget.value) setIsdisabled(true);
                      }}
                    />
                    <div className="form-text">
                      Password must be at least 8 characters long.
                    </div>
                    <br />
                    <button
                      disabled={isDisabled ? true : false}
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => {
                        handleCreate();
                        handleLogin();
                      }}
                    >
                      Create Account
                    </button>
                  </>
                }
              />
            </>
          ) : (
            <>
              <div className="fs-1 mt-4 text-center text-primary">
                Congratulations, {ctx.users[0].name}
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
                    <NavLink to="/deposit" className="btn btn-primary ms-4">
                      Make your first deposit
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
