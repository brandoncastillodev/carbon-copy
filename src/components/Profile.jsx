import React, { useEffect, useState } from "react";
import axios from "axios";
import group4 from "../assets/Group4.svg";
import group5 from "../assets/Group5.svg";
import group8 from "../assets/Group8.svg";
import group19 from "../assets/Group19.svg";
import group13 from "../assets/Group13.svg";

import home from "../assets/home.svg";
import carbonLogo from "../assets/carbonLogo.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../state/userState";
import { setFav } from "../state/favState";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPass] = useState("");
  const [favs, setFavs] = useState([]);
  const [modFav, setModFav] = useState(false);
  const [loadingFavs, setLoadingFavs] = useState(true);

  function formatName(style, format) {
    const s = style
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const f = format.charAt(0).toUpperCase() + format.slice(1);
    return s + " - " + f;
  }

  //obtener usuario
  useEffect(() => {
    axios
      .get(`https://carbon-copy.onrender.com/api/users/${id}`)
      .then((cok) => {
        dispatch(
          setUser({
            email: cok.data.email,
            id: cok.data.id,
            name: cok.data.name,
          })
        );
        setName(cok.data.name);
        setEmail(cok.data.email);
      })
      .catch((err) => console.log(err));
  }, []);

  //modifica usuario
  function handleChange(e) {
    e.preventDefault();

    if (password) {
      axios
        .put(`https://carbon-copy.onrender.com/api/users/pass/${id}`, {
          name,
          email,
          password,
        })
        .then((ok) => {
          const newU = ok.data[1][0];
          const newS = { email: newU.email, name: newU.name, id: newU.id };
          dispatch(setUser(newS));
          alerts(`Success!`, `The user has been updated!`, "success");
          setPass("");
        })
        .catch((er) => {
          alerts(`Rats!`, `The user couldn't be updated.`, "warning");
        });
    } else {
      axios
        .put(`https://carbon-copy.onrender.com/api/users/${id}`, {
          name,
          email,
        })
        .then((ok) => {
          const newU = ok.data[1][0];
          alerts(`Success!`, `The user has been updated!`, "success");
          const newS = { email: newU.email, name: newU.name, id: newU.id };
          dispatch(setUser(newS));
        })
        .catch((er) => {
          alerts(`Rats!`, `The user couldn't be updated.`, "warning");
        });
    }
  }

  //obtiene todos los favoritos
  useEffect(() => {
    setLoadingFavs(true);
    const uid = id;
    axios
      .get(`https://carbon-copy.onrender.com/api/favorites/${uid}`)
      .then((fav) => setFavs(fav.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingFavs(false));
  }, [modFav]);

  //selecciona favorito
  function handleFav(id, style, format, color) {
    const selectFav = {
      id,
      style,
      format,
      color,
    };
    dispatch(setFav(selectFav));
    alerts("Ok!", "You have select a style!", "success");
    navigate("/home");
  }

  //borra favorito
  function handleDisFav(sid) {
    let uid = id;

    axios
      .delete("https://carbon-copy.onrender.com/api/favorites/", {
        params: { uid, sid },
      })
      .then((ok) => {
        setModFav(!modFav);
        alerts("Ok!", "You have deleted the style!", "info");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="all">
      <div className="box" style={{ paddingBottom: "1.4rem" }}>
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
        <Link to={"/home"}>
          <img className="titulo top" src={carbonLogo} alt="carbonLogo"></img>
        </Link>
        <p className="subtitulo top font-me"> Give style to your code</p>
        <div className="top profile font-me">
          <h4 style={{ color: "white" }}>Profile</h4>
          <form onSubmit={handleChange}>
            <div className="input-box mini-top">
              <div className="user-logo">
                <img src={group4} alt="group5"></img>
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                maxLength={40}
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="input-box">
              <img src={group5} alt="group5"></img>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                maxLength={60}
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="input-box">
              <img src={group8} alt="group5"></img>
              <input
                onChange={(e) => setPass(e.target.value)}
                placeholder={"********"}
                type="password"
                maxLength={20}
                autoComplete="new-password"
              ></input>
            </div>
            <div className="button-container">
              <button className="update-button">Update</button>
            </div>
            <div className="button-container2 top">
              <button className="submitButton">Update</button>
            </div>
          </form>
        </div>
        <div className="mini-top favorites font-me">
          <h4 style={{ color: "white" }}>Favorites</h4>
          <div className="favs-container">
            {loadingFavs ? (
              <div className="loader"></div>
            ) : favs.length === 0 ? (
              <p style={{ color: "white", textAlign: "center", padding: "1rem" }}>
                No favorites yet
              </p>
            ) : favs.map((fav, id) => (
                <div className="one-user-fav mini-top" key={id}>
                {formatName(fav.style.style, fav.style.format)}
                <div
                  className="color-fav"
                  style={{ backgroundColor: fav.style.color }}
                ></div>
                <div className="fav-buttons-container mini-top">
                  <button
                    onClick={() => {
                      handleFav(
                        fav.style.id,
                        fav.style.style,
                        fav.style.format,
                        fav.style.color
                      );
                    }}
                    className="update-button fav-buttons"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleDisFav(fav.style.id)}
                    className="update-button fav-buttons"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
