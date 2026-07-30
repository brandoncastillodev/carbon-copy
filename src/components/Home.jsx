import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import { detect } from "program-language-detector";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-apex";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-cloud9_night";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/userState";
import { setFav } from "../state/favState";
import { Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import carbonLogo from "../assets/carbonLogo.svg";
import group29 from "../assets/Group29.svg";
import group31 from "../assets/Group31.svg";
import group32 from "../assets/Group32.svg";
import group32b from "../assets/Group32D.svg";
import group34 from "../assets/Group34.svg";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";
import exit from "../assets/exit.svg";
import html2canvas from "html2canvas";
import download from "downloadjs";
import Cookies from "js-cookie";

function Home() {
  const acce = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fav = useSelector((state) => state.fav);
  const [like, setLike] = useState(false);
  const [mode, setMode] = useState(fav.format || null);
  const [theme, setTheme] = useState(fav.style || "vibrant_ink");
  const [color, setColor] = useState(fav.color || "#FFB800");
  const [colorEditor, setColorEditor] = useState("");
  const [code, setCode] = useState(
    `let members = [{name:'Dylan',
age: 22, area: 'Content'},
{name:'Lucia' , age: 25, 
area: 'Intro'},
{name:'Mar' , age: 24,
area: 'Bootcamp'}]

const plataforma = (members) =>
members.map(member =>
member.name)`
  );

  //detectar color de fondo de ace-editor
  useEffect(() => {
    const editorElement = acce.current.editor.container;
    const backgroundColor = window
      .getComputedStyle(editorElement)
      .getPropertyValue("background-color");
    const [r, g, b] = backgroundColor
      .substring(4, backgroundColor.length - 1)
      .split(",")
      .map(Number);
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");
    setColorEditor(`#${hexR}${hexG}${hexB}`);
  }, [theme]);

  //detectar estilo si esta en fav
  useEffect(() => {
    let uid = user.id;
    let sid;

    axios
      .get("https://carbon-copy.onrender.com/api/styles/", {
        params: { theme, mode, color },
      })
      .then((ok) => {
        sid = ok.data.id;
        axios
          .get("https://carbon-copy.onrender.com/api/favorites/", {
            params: { sid, uid },
          })
          .then((ok) => {
            if (ok.data.id) setLike(true);
            else setLike(false);
          })
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));
  }, [theme, mode, color]);

  //busca cookies
  useEffect(() => {
    axios
      .post("https://carbon-copy.onrender.com/api/users/me", {
        token: Cookies.get("token"),
      })
      .then((cok) => {
        dispatch(setUser(cok.data));
      })
      .catch((err) => console.log(err));
  }, []);

  //detectar el lenguaje
  useEffect(() => {
    let lengDetectado = detect(code).toLowerCase();

    if (!fav.id) {
      if (lengDetectado == "c++" || lengDetectado == "c") setMode("c_cpp");
      else if (lengDetectado == "go") setMode("goland");
      else {
        setMode(lengDetectado);
      }
    }
  }, [code]);

  //manejar option with keys
  const handleKeyDownM = (event) => {
    const { key } = event;

    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      const modeElement = document.getElementById("modeSelect");
      const modeIndex = modeElement.selectedIndex;
      const newModeIndex = key === "ArrowUp" ? modeIndex - 1 : modeIndex + 1;

      if (newModeIndex >= 0 && newModeIndex < modeElement.options.length) {
        modeElement.selectedIndex = newModeIndex;
        setMode(modeElement.value);
      }
    }
  };
  const handleKeyDownT = (event) => {
    const { key } = event;

    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      const themeElement = document.getElementById("themeSelect");
      const themeIndex = themeElement.selectedIndex;
      const newThemeIndex = key === "ArrowUp" ? themeIndex - 1 : themeIndex + 1;

      if (newThemeIndex >= 0 && newThemeIndex < themeElement.options.length) {
        themeElement.selectedIndex = newThemeIndex;
        setTheme(themeElement.value);
      }
    }
  };
  const handleKeyDownC = (event) => {
    const { key } = event;

    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      const colorElement = document.getElementById("colorSelect");
      const colorIndex = colorElement.selectedIndex;
      const newColorIndex = key === "ArrowUp" ? colorIndex - 1 : colorIndex + 1;

      if (newColorIndex >= 0 && newColorIndex < colorElement.options.length) {
        colorElement.selectedIndex = newColorIndex;
        setColor(colorElement.value);
      }
    }
  };

  //likear estilo
  function handleLike() {
    if (!user.id) alerts("Hey!", "You need to login first!", "warning");

    let sid,
      uid = user.id;

    axios
      .post("https://carbon-copy.onrender.com/api/styles/register", {
        theme,
        mode,
        color,
      })
      .then((ok) => {
        sid = ok.data[0].id;
        axios
          .post("https://carbon-copy.onrender.com/api/favorites/register", {
            uid,
            sid,
          })
          .then((ok) => {
            if (ok.data[1]) {
              alerts("Success!", "You have saved the style!", "success");
              setLike(true);
            }
          })
          .catch((err) => {
            alerts("Sorry!", "We couldn't saved the style!", "warning");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        alerts("Sorry!", "We couldn't saved the style!", "warning");
      });
  }

  //dislikear estilo
  function handleDislike() {
    let sid,
      uid = user.id;

    axios
      .get("https://carbon-copy.onrender.com/api/styles/", {
        params: { theme, mode, color },
      })
      .then((ok) => {
        sid = ok.data.id;
        axios
          .delete("https://carbon-copy.onrender.com/api/favorites/", {
            params: { sid, uid },
          })
          .then((ok) => {
            alerts("Ok!", "You have deleted the style!", "info");
            setLike(false);
          })
          .catch((err) => {
            console.log(err);
            alerts("Sorry!", "We couldn't deleted the style!", "warning");
          });
      })
      .catch((err) => console.log(err));
  }

  //descargar imagen
  function handleDownload() {
    html2canvas(document.getElementById("ace-react"))
      .then((canvas) => {
        download(canvas.toDataURL("image/png"), "carbon-copy.png", "image/png");
        alerts("Got it!", "Image download it successfully!", "success");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
        alerts("Oops", "Something went wrong!", "warning");
      });
  }

  //cerrar sesión
  function logOut() {
    const emptyS = {
      id: null,
      format: null,
      style: null,
      color: null,
    };

    const emptyU = {
      id: null,
      name: null,
      email: null,
    };
    dispatch(setFav(emptyS));
    dispatch(setUser(emptyU));
    if (user.id) alerts("Byebye!", "See you space cowboy!", "success");
    Cookies.remove("token");
  }

  //irme a mi perfil
  function cerrarFav() {
    const emptyS = {
      id: null,
      format: null,
      style: null,
      color: null,
    };
    dispatch(setFav(emptyS));
  }

  return (
    <div className="all">
      <div className="box">
        <div className="navbar">
          <div className="download" onClick={handleDownload}>
            <img src={group31} alt="vector"></img>
          </div>
          {like ? (
            <div className="like-button" onClick={handleDislike}>
              <img src={group32b} alt="vector"></img>
            </div>
          ) : (
            <div className="like-button" onClick={handleLike}>
              <img src={group32} alt="vector"></img>
            </div>
          )}

          <Link to={"/login"} onClick={logOut}>
            <div className="home-icon-div" style={{ padding: "4px" }}>
              <img src={exit} alt="vector"></img>
            </div>
          </Link>

          {user.id ? (
            <Link to={`/user/${user.id}`} onClick={cerrarFav}>
              <img src={group34} alt="vector"></img>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="linea"></div>

        <img className="pinA pinA2" loading="lazy" src={group19}></img>
        <img className="pinB pinB2" loading="lazy" src={group13}></img>
        <img className="titulo top" src={carbonLogo} alt="carbonLogo"></img>

        <p className="subtitulo top font-me"> Give style to your code</p>

        <div className="selects-div top">
          <div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="selects style font-me"
              onKeyDown={handleKeyDownT}
              id="themeSelect"
            >
              <option value="vibrant_ink">Style</option>
              <option value="ambiance">Ambience</option>
              <option value="chaos">Chaos</option>
              <option value="dracula">Dracula</option>
              <option value="github">Github</option>
              <option value="monokai">Monokai</option>
              <option value="solarized_dark">Solarized Dark</option>
              <option value="solarized_light">Solarized Light</option>
              <option value="terminal">Terminal</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="tomorrow_night">Tomorrow Night</option>
              <option value="nord_dark">Nord Dark</option>
              <option value="one_dark">One Dark</option>
              <option value="github_dark">GitHub Dark</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="gruvbox_dark_hard">Gruvbox Dark Hard</option>
              <option value="cobalt">Cobalt</option>
              <option value="pastel_on_dark">Pastel on Dark</option>
              <option value="idle_fingers">Idle Fingers</option>
              <option value="mono_industrial">Mono Industrial</option>
              <option value="cloud9_night">Cloud9 Night</option>
            </select>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="selects format font-me"
              onKeyDown={handleKeyDownM}
              id="modeSelect"
            >
              <option value="apex">Format</option>
              <option value="c_cpp">C/C++</option>
              <option value="css">CSS</option>
              <option value="goland">Go</option>
              <option value="html">HTML</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="json">JSON</option>
              <option value="jsx">JSX</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
              <option value="ruby">Ruby</option>
              <option value="sql">SQL</option>
              <option value="typescript">TypeScript</option>
            </select>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="selects color font-me"
              onKeyDown={handleKeyDownC}
              id="colorSelect"
            >
              <option value="#FFB800">Color</option>
              <option value="#B0E0E6">Powder Blue</option>
              <option value="#C8A2C8">Lavender</option>
              <option value="#FFA07A">Light Salmon</option>
              <option value="#98FB98">Pale Green</option>
              <option value="#FFB6C1">Light Pink</option>
              <option value="#87CEFA">Light Sky Blue</option>
              <option value="#20B2AA">Light Sea Green</option>
              <option value="#DDA0DD">Plum</option>
              <option value="#F0E68C">Khaki</option>
              <option value="#FAFAD2">Light Goldenrod Yellow</option>
              <option value="#FFDAB9">Peach Puff</option>
              <option value="#B0C4DE">Light Steel Blue</option>
              <option value="#90EE90">Light Green</option>
              <option value="#FFDEAD">Navajo White</option>
              <option value="#FFC0CB">Pink</option>
            </select>
          </div>
          <div className="navbar3">
            <div className="download" onClick={handleDownload}>
              <img src={group31} alt="vector"></img>
            </div>
            {like ? (
              <div className="like-button" onClick={handleDislike}>
                <img src={group32b} alt="vector"></img>
              </div>
            ) : (
              <div className="like-button" onClick={handleLike}>
                <img src={group32} alt="vector"></img>
              </div>
            )}

            <Link to={"/login"} onClick={logOut}>
              <div className="home-icon-div" style={{ padding: "4px" }}>
                <img src={exit} alt="vector"></img>
              </div>
            </Link>

            {user.id ? (
              <Link to={`/user/${user.id}`} onClick={cerrarFav}>
                <img src={group34} alt="vector"></img>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="contenido-home top"
          id="ace-react"
          style={{ backgroundColor: color }}
        >
          <div className="ace-content" style={{ backgroundColor: colorEditor }}>
            <img src={group29} alt="group29"></img>
            <AceEditor
              className="ace"
              mode={mode}
              theme={theme}
              value={code}
              ref={acce}
              onChange={(newCode) => setCode(newCode)}
              width="100%"
              height="100%"
              fontSize={"13px"}
              maxLines={"auto"}
              showGutter={false}
              highlightActiveLine={false}
              enableBasicAutocompletion={false}
              enableLiveAutocompletion={false}
              showPrintMargin={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
