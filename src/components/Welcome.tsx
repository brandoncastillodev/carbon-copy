import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";
import carboncopy from "../assets/carboncopy.svg";
import logoCarbon1 from "../assets/logoCarbon1.svg";
import group9 from "../assets/Group9.svg";
import line10 from "../assets/Line10.svg";

function Welcome() {
  const [big, setBig] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize(): void {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (height < 620) setBig(false);
    else setBig(true);
  }, [height]);

  return (
    <div className="all">
      <div className="portada-welcome">
        <img className="pinA" src={group19} alt="pinA"></img>
        <img className="pinB" src={group13} alt="pinB"></img>
        <img className="logo" src={carboncopy} alt="carboncopy"></img>
      </div>

      <div className="copete">
        <div className="texto-copete font-me">
          <p>Educational project inspired by</p>
          <img src={logoCarbon1} alt="logo-carbon"></img>
        </div>
        <Link to="/login">
          <div className="boton">
            <img className="linea10" src={line10} alt="linea10" />
            <img className="group9" src={group9} alt="group9" />
          </div>
        </Link>
      </div>

      {big && (
        <div className="footer">
          <div className="logoP5"></div>
        </div>
      )}
    </div>
  );
}

export default Welcome;