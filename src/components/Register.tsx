import { useState } from "react";
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
import { API_BASE } from "../config";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("Katherine");
  const [email, setEmail] = useState<string>("kath@p5.com");
  const [password, setPassword] = useState<string>("********");
  const [loading, setLoading] = useState<boolean>(false);

  function handleRegister(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API_BASE}/users/register`, { name, email, password })
      .then(() => {
        alerts("Success!", `User created correctly!`, "success");
        navigate("/login");
      })
      .catch(() => {
        alerts("Oh oh!", `User couldn't register properly.`, "warning");
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

          <img className="pinA pinA2" src={group19} alt="pinA"></img>
          <img className="pinB pinB2" src={group13} alt="pinB"></img>

          <Link to={"/home"}>
            <img className="titulo top" src={carbonLogo} alt="carbonLogo"></img>
          </Link>

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
                    <span> &apos;{name.substring(0, 25)}&apos;</span>,
                  </p>
                  <p className="font-me">
                    email: <span>&apos;{email.substring(0, 25)}&apos;</span>,
                  </p>
                  <p className="font-me">
                    password:{" "}
                    <span>
                      &apos;{"*".repeat(password.substring(0, 10).length)}&apos;
                    </span>
                    &#125;
                  </p>
                </div>
              </div>

              <div className="input-box top">
                <div className="user-logo">
                  <img src={group4} alt="group4"></img>
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
                <img src={group8} alt="group8"></img>
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

          <div className="button-container" style={{ visibility: loading ? "hidden" : "visible" }}>
            <button className="submitButton top">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;