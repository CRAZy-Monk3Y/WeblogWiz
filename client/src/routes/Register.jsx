import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // field validation
    const pwdRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

    // if (!pwdRegex.test(password)) {
    //   alert(
    //     "Please ensure these rules for password :\n \
    //   - At least one alphabetical character.\n \
    //   - At least one digit.\n \
    //   - At least one special character from the set [@$!%*#?&].\n \
    //   - Minimum length of 6 characters."
    //   );
    //   setPassword("");
    //   return;
    // }
    // if (!usernameRegex.test(username)) {
    //   alert(
    //     "Please ensure these rules for username :\n \
    //   - Allowed characters include uppercase and lowercase letters, digits, underscores, and hyphens.\n \
    //   - The username should be between 3 and 16 characters in length. "
    //   );
    // }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        alert("Registration failed. try again later.");
      }
      setRedirect(true);
    } catch (error) {
      console.log(error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form className="max-w-[400px] m-auto" onSubmit={handleFormSubmit}>
      <h2 className="text-[1.5rem] text-center font-semibold mb-4">Register</h2>
      <input
        type="text"
        className="block mb-4 w-full p-[8px] bg-[#eee] rounded-md"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="block mb-4 w-full p-[8px] bg-[#eee] rounded-md"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="block bg-yellow-300 hover:bg-yellow-500 p-2 rounded-lg w-full text-gray-700 hover:text-gray-100">
        Register
      </button>
    </form>
  );
};

export default Register;
