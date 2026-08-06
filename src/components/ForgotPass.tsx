import { useState } from "react";
import home from "../assets/home.svg";
import carbonLogo from "../assets/carbonLogo.svg";
import group3 from "../assets/Group3.svg";
import group5 from "../assets/Group5.svg";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";
import { Link, useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";
import axios from "axios";
import { API_BASE } from "../config";

function ForgotPass() {
  const [email, setEmail] = useState<string>("kath@p5.com");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeoutMsg, setTimeoutMsg] = useState<boolean>(false);
  const [newPass, setNewPass] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleForgot(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    setTimeoutMsg(false);
    setNewPass(null);

    const timer = setTimeout(() => setTimeoutMsg(true), 10000);

    axios
      .post(`${API_BASE}/forgot/${email}`)
      .then((user) => {
        clearTimeout(timer);
        const [id, password] = user.data as [string, string];
        axios
          .put(`${API_BASE}/users/pass/${id}`, { password })
          .then(() => {
            setLoading(false);
            setNewPass(password);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        clearTimeout(timer);
        setLoading(false);
        alerts(
          "Email not registered!",
          "The email you entered is not registered.",
          "warning"
        );
      });
  }

  return (
    <div className="all">
      <form onSubmit={handleForgot}>
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
            <p>Forgot</p>
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
                    <span className="green">let</span> user = &#123;
                  </p>
                  <p className="font-me">
                    email: <span>&apos;{email.substring(0, 27)}&apos;</span>&#125;
                  </p>
                </div>
              </div>

              <div className="input-box top">
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

              <p className="forgotPassword font-me">
                <Link to="/login">Log in</Link>
              </p>

              {newPass ? (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <p style={{ color: "#FFF", fontSize: "13px" }}>Your new password is:</p>
                  <p style={{ color: "#FFB800", fontSize: "24px", fontWeight: "bold", letterSpacing: "4px", margin: "0.5rem 0" }}>{newPass}</p>
                  <p style={{ color: "#FFF", fontSize: "12px" }}>Use it to log in and change it later.</p>
                  <Link to="/login">
                    <button className="submitButton" style={{ marginTop: "1rem" }}>Go to Login</button>
                  </Link>
                </div>
              ) : loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span className="loader" style={{ width: "30px", height: "30px" }}></span>
                </div>
              ) : (
                <div className="button-container2 top">
                  <button className="submitButton">Send</button>
                </div>
              )}
              {timeoutMsg && (
                <p style={{ color: "#FFB800", textAlign: "center", fontSize: "13px", marginTop: "0.5rem" }}>
                  The request is taking longer than expected. Please try again.
                </p>
              )}
            </div>
          </div>
          <div className="button-container" style={{ visibility: loading || newPass ? "hidden" : "visible" }}>
            <button className="submitButton top">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPass;