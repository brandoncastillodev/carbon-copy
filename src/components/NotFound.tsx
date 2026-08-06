import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import carbonLogo from "../assets/carbonLogo.svg";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";

function NotFound() {
  return (
    <div className="all">
      <div className="box font-me">
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
        <br />
        <p className="texto-not-found">Sorry, this page doesn&apos;t exist.</p>
      </div>
    </div>
  );
}

export default NotFound;