import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.status === 200) {
        response.json().then((data) => {
          setUserInfo(data);
          setRedirect(true);
        });
      } else {
        alert("Wrong Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="max-w-[400px] m-auto">
      <h2 className="text-[1.5rem] text-center font-semibold mb-4">Login</h2>
      <input
        type="text"
        className={`block mb-4 w-full p-[8px] text-black bg-[#eee] rounded-md`}
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        className="block mb-4 w-full p-[8px] text-black bg-[#eee] rounded-md"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button
        className="block bg-yellow-300 hover:bg-yellow-500 p-2 rounded-lg w-full text-gray-700 hover:text-gray-100"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
