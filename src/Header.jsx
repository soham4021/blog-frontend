import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  function logout() {
    fetch("http://127.0.0.1:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" href="" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <span>Hello {username}</span>
            <Link
              to={"/create"}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Create new post
            </Link>
            <a
              onClick={logout}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
