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
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-gob";
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

  const fontMap = {
    vibrant_ink: '"Fira Code", monospace',
    nord_dark: '"JetBrains Mono", monospace',
    one_dark: '"Fira Code", monospace',
    gruvbox: '"IBM Plex Mono", monospace',
    gruvbox_dark_hard: '"IBM Plex Mono", monospace',
    dracula: '"JetBrains Mono", monospace',
    cobalt: '"Space Mono", monospace',
    monokai: '"Source Code Pro", monospace',
    solarized_dark: '"Source Code Pro", monospace',
    tomorrow_night: '"Inconsolata", monospace',
    pastel_on_dark: '"Ubuntu Mono", monospace',
    idle_fingers: '"JetBrains Mono", monospace',
    mono_industrial: '"JetBrains Mono", monospace',
    cloud9_night: '"Source Code Pro", monospace',
    github_dark: '"JetBrains Mono", monospace',
    clouds_midnight: '"Inconsolata", monospace',
    merbivore_soft: '"Source Code Pro", monospace',
    tomorrow_night_eighties: '"IBM Plex Mono", monospace',
    kr_theme: '"Fira Code", monospace',
    gob: '"Space Mono", monospace',
  };
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

  //aplicar fuente segun el style
  useEffect(() => {
    const font = fontMap[theme] || '"Fira Code", monospace';
    const editor = acce.current?.editor;
    if (editor) {
      editor.setOptions({ fontFamily: font });
    }
    document.documentElement.style.setProperty("--editor-font", font);
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
    const token = Cookies.get("token");
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .post("https://carbon-copy.onrender.com/api/styles/register", {
        theme,
        mode,
        color,
      }, auth)
      .then((ok) => {
        sid = ok.data[0].id;
        axios
          .post("https://carbon-copy.onrender.com/api/favorites/register", {
            uid,
            sid,
          }, auth)
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
    const token = Cookies.get("token");
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get("https://carbon-copy.onrender.com/api/styles/", {
        params: { theme, mode, color },
      })
      .then((ok) => {
        sid = ok.data.id;
        axios
          .delete("https://carbon-copy.onrender.com/api/favorites/", {
            params: { sid, uid },
            headers: auth.headers,
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
          <div className="download" onClick={handleDownload} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDownload(); }}>
            <img src={group31} alt="Download"></img>
          </div>
          {like ? (
            <div className="like-button" onClick={handleDislike} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDislike(); }}>
              <img src={group32b} alt="Dislike"></img>
            </div>
          ) : (
            <div className="like-button" onClick={handleLike} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleLike(); }}>
              <img src={group32} alt="Like"></img>
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
              <option value="nord_dark">Nord Dark</option>
              <option value="one_dark">One Dark</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="gruvbox_dark_hard">Gruvbox Dark Hard</option>
              <option value="dracula">Dracula</option>
              <option value="cobalt">Cobalt</option>
              <option value="monokai">Monokai</option>
              <option value="solarized_dark">Solarized Dark</option>
              <option value="tomorrow_night">Tomorrow Night</option>
              <option value="pastel_on_dark">Pastel on Dark</option>
              <option value="idle_fingers">Idle Fingers</option>
              <option value="mono_industrial">Mono Industrial</option>
              <option value="cloud9_night">Cloud9 Night</option>
              <option value="github_dark">GitHub Dark</option>
              <option value="clouds_midnight">Clouds Midnight</option>
              <option value="merbivore_soft">Merbivore Soft</option>
              <option value="tomorrow_night_eighties">Tomorrow Night 80s</option>
              <option value="kr_theme">KR Theme</option>
              <option value="gob">Gob</option>
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
              <option value="#FFB800">Carbon Yellow</option>
              <option value="#FF6188">One Dark Red</option>
              <option value="#FC9867">One Dark Orange</option>
              <option value="#FFD866">One Dark Yellow</option>
              <option value="#A9DC76">One Dark Green</option>
              <option value="#AB9DF2">One Dark Purple</option>
              <option value="#78DCE8">One Dark Cyan</option>
              <option value="#CC241D">Gruvbox Red</option>
              <option value="#D79921">Gruvbox Yellow</option>
              <option value="#B16286">Gruvbox Purple</option>
              <option value="#458588">Gruvbox Blue</option>
              <option value="#689D6A">Gruvbox Aqua</option>
              <option value="#BF616A">Nord Red</option>
              <option value="#81A1C1">Nord Blue</option>
              <option value="#88C0D0">Nord Cyan</option>
              <option value="#A3BE8C">Nord Green</option>
              <option value="#EBCB8B">Nord Yellow</option>
              <option value="#E06C75">One Dark Soft Red</option>
              <option value="#C678DD">One Dark Soft Purple</option>
              <option value="#5E81AC">Nord Blue</option>
            </select>
          </div>
          <div className="navbar3">
            <div className="download" onClick={handleDownload} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDownload(); }}>
              <img src={group31} alt="Download"></img>
            </div>
            {like ? (
              <div className="like-button" onClick={handleDislike} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDislike(); }}>
                <img src={group32b} alt="Dislike"></img>
              </div>
            ) : (
              <div className="like-button" onClick={handleLike} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleLike(); }}>
                <img src={group32} alt="Like"></img>
              </div>
            )}

            <Link to={"/login"} onClick={logOut} aria-label="Log out">
              <div className="home-icon-div" style={{ padding: "4px" }}>
                <img src={exit} alt="Log out"></img>
              </div>
            </Link>

            {user.id ? (
              <Link to={`/user/${user.id}`} onClick={cerrarFav} aria-label="Profile">
                <img src={group34} alt="Profile"></img>
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
              fontSize={"14px"}
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
