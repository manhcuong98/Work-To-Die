import React, { useState, useEffect } from "react";
import { Route, useHistory, Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Button,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth } from "./components/Auth";
import AuthCtx from "./context/auth";
import { Companies } from "./components/Company/Companies";
import { Home } from "./components/Home/Home";
import { HomeEmployers } from "./components/Employers/HomeEmployers";
import CompanyCtx from "./context/company";
import { CompanyInfo } from "./components/Company/CompanyInfo";
import "../src/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagramSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faPowerOff,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Jobs } from "./components/jobs/Jobs";
import { JobDetail } from "./components/jobs/JobDetail";
import { FillUpForm } from "./components/Resume/FillUpForm";
import { Profile } from "./components/InvidualProfile/Profile";
import axios from "./utils/axios";
import { LoadingSign } from "./share/LoadingIndicator";
import jobContext from "./context/job";
import resumeMailContext from "./context/resumeMail";
import { SeeApply } from "./components/Employers/seeApply";

export const App = () => {
 
  const history = useHistory();
  // const [selectedCompany, setSelectedCompany] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [signingIn, setSigningIn] = useState(true);
  const [selectedJob, setSelectedJob] = useState({});
  const [resumeMail , setResumeMail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setSigningIn(false);
      return;
    }
    try {
      axios
        .post("/auth/me", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAuthUser(res.data);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          setSigningIn(false);
        });
    } catch (err) {
      setSigningIn(false);
    }
  }, []);

  const handleClick = () => {
    history.push("/");
  };

  const handleClickSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="App">
        <Navbar
          className="px-5"
          expand="lg"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #333333",
          }}
        >
          {/* <Container> */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="/Untitled-1.png"
              width="200"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/Jobs" className="mx-1">
                Jobs
              </Nav.Link>
              <Nav.Link as={Link} to="/companies?page=1" className="mx-1">
                Companies
              </Nav.Link>
              <Nav.Link as={Link} to="/ResumeForm" className="mx-1">
                Create your profile
              </Nav.Link>
            </Nav>
            {!authUser ? (
              <Nav>
                <Nav className="">
                  <Nav.Link as={Link} to="/auth/sign-up" className="mx-1">
                    SIGN UP
                  </Nav.Link>
                  <Nav.Link as={Link} to="/auth/sign-in" className="mx-1">
                    SIGN IN
                  </Nav.Link>
                </Nav>
                <Nav className="px-3 align-items-center">
                  <Button onClick={handleClick} style={{fontSize: "15px" ,height:"30px"}}>
                    <a href="https://employer-findjobs.web.app/">FOR EMPLOYERS</a>
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
                  </Button>
                </Nav>
              </Nav>
            ) : (
              <Nav className="mr-5 ">
                <NavDropdown title={authUser.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/">
                    MY PROFILE
                  </NavDropdown.Item>

                  <NavDropdown.Item  className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faPowerOff} />
                    <Nav.Link onClick={handleClickSignOut}>SIGN OUT</Nav.Link>
                  </NavDropdown.Item>

                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>

        <>
          <AuthCtx.Provider value={{ authUser, setAuthUser }}>
            {signingIn ? (
              <LoadingSign text="Loading ../" />
            ) : (
              <>
                {" "}
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={Home} />
                {/* <CompanyCtx.Provider
                    value={{ selectedCompany, setSelectedCompany }}
                    >
                    </CompanyCtx.Provider> */}
                <Route exact path="/companies" component={Companies} />
                <Route path="/companies/info" component={CompanyInfo} />
                <jobContext.Provider value={{ selectedJob, setSelectedJob }}>
                  <Route path="/Jobs" component={Jobs} />
                  <Route path="/JobDetail" component={JobDetail} />
                </jobContext.Provider>
                <resumeMailContext.Provider
                  value={{ resumeMail, setResumeMail }}
                >
                  <Route path="/ResumeForm" component={FillUpForm} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/see-apply" component={SeeApply} />
                </resumeMailContext.Provider>
              </>
            )}
          </AuthCtx.Provider>
        </>

        <div id="footer" className="p-5">
          <Row>
            <div className="d-flex" style={{ height: "max-content" }}>
              <Col xs={4} className="aside-left">
                <img src={"/logo/company-1.png"} />
                <p className="para-left">
                  Find Jobs is the #1 recruitment platform in Asia helping
                  companies build successful teams with young talent. Our
                  mission is to help companies hire the right young talent
                  effectively, and for young people to discover and develop
                  careers they love.
                </p>
                <p>
                  © 2020 Find Jobs Intern Pte Ltd & Find Jobs Vietnam Pte Ltd
                  <br></br>
                  EA Licence No: 16C7981
                </p>
              </Col>

              <Col className="ml-auto" xs={6}>
                {/* <div className="mx-auto" style={{color:"white"}}>
                  <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                  <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </div> */}
                <div className="d-flex">
                  <div className=" each-col px-0">
                    <div className="title-right">Company</div>
                    <div className="detail-right">About us</div>
                    <div className="detail-right">Hired Blog</div>
                    <div className="detail-right">Inside FInd Jobs</div>
                    <div className="detail-right">Careeers</div>
                    <div className="detail-right">Terms&Conditions</div>
                  </div>
                  <div className="each-col px-0">
                    <div className="title-right">FOR JOB SEEKERS</div>
                    <div className="detail-right">Jobs by Location</div>
                    <div className="detail-right">Jobs by Company Name</div>
                    <div className="detail-right">Jobs by Category</div>
                  </div>
                  <div className="each-col px-0">
                    <div className="title-right">BUSINESS SOLUTIONS</div>
                    <div className="detail-right">For Employers</div>
                    <div className="detail-right">Find Jobs Platform</div>
                    <div className="detail-right">TalentHunt</div>
                    <div className="detail-right">TalentHub</div>
                  </div>
                </div>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default App;
