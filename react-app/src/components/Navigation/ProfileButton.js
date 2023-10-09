import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };



  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} id='profile-button'>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef} >
        <div id='drop-down-menu'>
          <p className='dropdown-p'>Welcome, {user.username}!</p>
          <p className='dropdown-p'>{user.email}</p>
          <NavLink to='/recipes/manage' onClick={() => closeMenu()} className='link dropdown-l'>My Recipes</NavLink>
          <NavLink to={`/${user.id}/bookmarks`} onClick={() => closeMenu()} className='link dropdown-l'>My Bookmarks</NavLink>
          <button onClick={handleLogout} id='logout'>Log Out</button>
        </div>
      </div>
    </>
  );
}


export default ProfileButton;




  // return (
  //   <>
  //     <button onClick={openMenu} id='profile-button'>
  //       <i className="fas fa-user-circle" />
  //     </button>
  //     <div className={ulClassName} ref={ulRef}>
  //       {user ? (
  //         <div id='drop-down-menu'>
  //           <p className='dropdown-p'>Welcome, {user.username}!</p>
  //           <p className='dropdown-p'>{user.email}</p>
  //           <NavLink to='/recipes/manage' onClick={() => closeMenu()} className='link dropdown-l'>My Recipes</NavLink>
  //           <button onClick={handleLogout}>Log Out</button>
  //         </div>
  //       ) : (
  //         <div id='login-drop-down'>
  //           <OpenModalButton
  //             buttonText="Log In"
  //             onItemClick={closeMenu}
  //             modalComponent={<LoginFormModal />}
  //           />
  //           <OpenModalButton
  //             buttonText="Sign Up"
  //             onItemClick={closeMenu}
  //             modalComponent={<SignupFormModal />}
  //           />
  //         </div>
  //       )}
  //     </div>
      
  //   </>
  // );
