import React, { useState } from "react";
import axios from "axios";
import home from "../assets/home.svg";
import carbonLogo from "../assets/carbonLogo.svg";
import group3 from "../assets/Group3.svg";
import group4 from "../assets/Group4.svg";
import group5 from "../assets/Group5.svg";
import group8 from "../assets/Group8.svg";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";
import { Link, useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("Katherine");
  const [email, setEmail] = useState("kath@p5.com");
  const [password, setPassword] = useState("********");
  const [loading, setLoading] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://carbon-copy.onrender.com/api/users/register", {
        name,
        email,
        password,
      })
      .then((user) => {
        alerts("Success!", `User created correctly!`, "success");
        navigate("/login");
      })
      .catch((err) => {
        alerts("Oh oh!", `User couldn't register propertyly.`, "warning");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="all">
      <form onSubmit={handleRegister}>
        <div className="box">
          <div className="navbar">
            <Link to={"/home"}>
              <div className="home-icon-div">
                <img src={home} alt="vector" style={{ width: "24px" }}></img>
              </div>
            </Link>
          </div>

          <div className="linea"></div>

          <img className="pinA pinA2" src={group19}></img>
          <img className="pinB pinB2" src={group13}></img>

          <img className="titulo top" src={carbonLogo} alt="carbonLogo"></img>

          <p className="subtitulo top font-me"> Give style to your code</p>

          <div className="solapa top font-me">
            <img src={group3} alt="group3"></img>
            <p>Sign up</p>
          </div>

          <div className="contenido">
            <div className="contenido-big">
              <div className="navbar2">
                <Link to={"/home"}>
                  <div className="home-icon-div">
                    <img
                      src={home}
                      alt="vector"
                      style={{ width: "24px" }}
                    ></img>
                  </div>
                </Link>
              </div>
              <div className="preview">
                <div className="texto">
                  <p className="font-me">
                    <span className="green">let</span> user = &#123; name:
                    <span> '{name.substring(0, 25)}'</span>,
                  </p>
                  <p className="font-me">
                    email: <span>'{email.substring(0, 25)}'</span>,
                  </p>
                  <p className="font-me">
                    password:{" "}
                    <span>
                      '{"*".repeat(password.substring(0, 10).length)}'
                    </span>
                    &#125;
                  </p>
                </div>
              </div>

              <div className="input-box top">
                <div className="user-logo">
                  <img src={group4} alt="group5"></img>
                </div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder={name}
                  type="text"
                  className="font-me"
                  maxLength={40}
                  required
                ></input>
              </div>

              <div className="input-box">
                <img src={group5} alt="group5"></img>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={email}
                  type="email"
                  className="font-me"
                  maxLength={60}
                  required
                ></input>
              </div>

              <div className="input-box">
                <img src={group8} alt="group5"></img>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={password}
                  type="password"
                  maxLength={20}
                  required
                ></input>
              </div>

              <p className="forgotPassword font-me">
                <Link to="/login">Log in</Link>
              </p>

              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span className="loader" style={{ width: "30px", height: "30px" }}></span>
                </div>
              ) : (
                <div className="button-container2 top">
                  <button className="submitButton">Register</button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="loader" style={{ width: "30px", height: "30px" }}></span>
            </div>
          ) : (
            <div className="button-container">
              <button className="submitButton top">Sign Up</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
