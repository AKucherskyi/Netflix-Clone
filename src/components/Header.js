import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Header.css";
import { auth, logout, fetchUserName } from "../firebase";
import logo from '../img/logo.svg'


function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName(user)
    .then((name) => setName(name))
  }, [user, loading]);

  return (
    <div>
      <header className="header">
        <div className="container">
            <nav className='nav'>
                <img src={logo} className="logo"></img>
                <div className='logout'>
                    <div>{name}</div>
                    <button className="logout__btn" onClick={logout}>
            Logout
          </button>
                </div>
            </nav>
        </div>
      </header>
    </div>
  );
}
export default Header;