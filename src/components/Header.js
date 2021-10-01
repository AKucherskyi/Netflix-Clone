import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Header.css";
import { auth, fetchUser } from "../firebase";
import logo from '../img/logo.svg'


function Header({buttonName, handleButton}) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const history = useHistory();
  const [show, handleShow] = useState(false)

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)
  }, [])
  
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    fetchUser(user)
    .then((user) => {
      setName(user.name)
      setEmail(user.email)
    })
  }, [user]);

  return (
      <header className={`header ${show && 'header__black'}`}>
            <nav className='nav'>
                <img 
                src={logo} 
                className="logo" 
                onClick={() => {history.push("/")}}
                />
                <div className='logout'>
                    <p>{name} <br/> {email}</p>
                    <button className="profile__btn" onClick={handleButton}>
                    {buttonName}
                    </button>
                </div>
            </nav>
      </header>
  );
}
export default Header;