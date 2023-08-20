import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

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

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center mb-[50px]">
      <NavLink to="/" className="font-bold text-[1.6rem]">
        WeBlogWiz
      </NavLink>
      <nav className="text-[#222] flex flex-col md:flex-row gap-3 md:items-center">
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
