import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderMenuData } from "../../container/HeaderMenuData";
import DropMenu from "./DropMenu";

import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../../redux/types";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const showSidebar = () => setSidebar(!sidebar);

  const onLogoutHandler = () => {
    localStorage.removeItem("jwt");

    setSidebar(!sidebar);

    dispatch({
      type: LOGOUT_REQUEST,
    });
  };

  return (
    <header id="header" className="header">
      <div className="container">
        <Link to="/" className="header-title">
          <span>I</span>UAM
        </Link>

        <div className="menuToggle">
          {sidebar ? (
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          ) : (
            <FaIcons.FaBars onClick={showSidebar} />
          )}
        </div>

        <nav className={sidebar ? "header-nav active" : "header-nav"}>
          <ul className="header-list">
            {HeaderMenuData.map((item, index) => {
              return (
                <DropMenu
                  item={item}
                  key={index}
                  showSidebar={showSidebar}
                ></DropMenu>
              );
            })}
          </ul>

          {auth.jwt ? (
            <>
              <Link
                to={`/students/${auth.id}`}
                className="header-profile-btn"
                onClick={() => setSidebar(!sidebar)}
              >
                <div className="header-profile-box">
                  <img src={auth.profilePath} alt="프로필 이미지" />
                </div>
              </Link>
              <Link
                to="/login"
                className="header-btn"
                onClick={onLogoutHandler}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="header-btn"
                onClick={() => setSidebar(!sidebar)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="header-btn"
                onClick={() => setSidebar(!sidebar)}
              >
                SignUp
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
