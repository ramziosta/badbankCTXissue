import { Link } from "react-router-dom";
import pic2 from "../images/bb7.jpg";
import pic3 from "../images/bb6.jpg";
import bb from "../images/bank.png";
import { Row, Col } from "react-bootstrap";

function Home() {
 
  return (
    <>
    {/* <div className="text-end text-uppercase">{ctx.users[0].user}</div> */}
      <Row>
        <Col className="text-end">
        <Link to="/login" className="fa fa-user"></Link>
        </Col>
      </Row>

      <div className="row g-0 mt-3 main">
        <div className="col-lg-6 ">
          <Row className="justify-content-center mt-4">
            <Col md={8} className="text-center text-white mt-2 mb-4">
            <h1 className="xlarge-font">
                <img  className="bb" src={bb} alt="bb" style={{ width: "10%" }} />
                <b className="badbank">
                  <span className="logocolor">B</span>ad
                  <span className="logocolor2">B</span>ank
                </b>
              </h1>
            </Col>
            <h1 className="" style={{ color: "#0079d5" }}>
              <b>
                <span className="twomill">2,000,000 </span>
                <br />
                satisfied clients
                <br />
                can't be wrong!
              </b>
            </h1>
            <h5 className="card-title fs-2 maininfo">
              No Fee Checking and <br />
              Savings Accounts
            </h5>
            <Link
              to="/createaccount"
              className="btn btn-primary fs-2 Link "
              style={{ borderRadius: "0px", marginTop: "1rem" }}
            >
              Create an Account
            </Link>            
          </Row>
        </div>
      </div>

      <div className="container-fluid second">
        <div
          className="row secondrow"
          
        >
          <div className="column-33">
            <img
              className="pic2"
              src={pic2}
              alt="App"

            />
          </div>
          <div className="column-66 secondtext">
            <h1 className="xlarge-font logocolor" >
              <b>
                Online Banking Made
                <br />
                <span className="easier" style={{ fontSize: "5rem" }}>
                  Easier!
                </span>{" "}
              </b>
            </h1>
            <h1 className="large-font" style={{ color: "black" }}>
              <b> Quantum Speed transactions!</b>
            </h1>
            <p>
              <span style={{ fontSize: "24px" }}>
                Our pattened revolutionsry new way in mobile banking.
              </span>{" "}
              Quantum speed computing to propell your finances, incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquipex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <Link
              to
              className="btn btn-primary fs-2 Link"
              style={{ borderRadius: "0px" }}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>

      <div className="container third">
        <div className="row thirdrow">
          <div className="column-66 thirdtext">
            <h1 className="xlarge-font logocolor">
              <b>The Mobile App</b>
            </h1>
            <h1 className="large-font" style={{ color: "black" }}>
              <b className="xlarge-font logocolor2">Easy. Fast. Secured. </b>
            </h1>
            <p>
              <span className="large-font" style={{ fontWeight: "bold" }}>
                Lightspeed Banking & <br />
                Investments
              </span>{" "}
              <br />
              You should use our app because lorem ipsum consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <Link
              to
              className="btn btn-primary fs-2 Link greenLink"
              style={{ borderRadius: "0px" }}
            >
              Download the App
            </Link>
          </div>
          <div className="column-33">
            <img className="pic3" src={pic3} alt="33" />
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
