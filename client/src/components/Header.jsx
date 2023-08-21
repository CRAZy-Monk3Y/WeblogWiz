import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ModeContext } from "../ModeContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { isDarkMode, setIsDarkMode } = useContext(ModeContext);

  const logout = () => {
    try {
      fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((res) => {
        res.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center mb-[50px]">
      <NavLink to="/" className="font-bold text-[1.6rem]">
        WeBlogWiz
      </NavLink>
      <nav
        className={`${
          !isDarkMode && "text-[#222]"
        } flex flex-col md:flex-row gap-3 md:items-center`}
      >
        <label className="switch h-4">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>

        {username ? (
          <>
            <p className="text-gray-500">Welcome {username}</p>
            <Link
              to="/create"
              className="hover:text-cyan-400 hover:font-semibold transition duration-300"
            >
              Create new post
            </Link>
            <a
              onClick={logout}
              className="cursor-pointer hover:text-cyan-400 hover:font-semibold transition duration-300"
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="hover:text-cyan-400 hover:font-semibold transition duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="hover:text-cyan-400 hover:font-semibold transition duration-300"
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
