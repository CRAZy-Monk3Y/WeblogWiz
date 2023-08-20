import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { UserContextProvider } from "./UserContext";
import CreateNewPost from "./components/CreateNewPost";
import Footer from "./components/Footer";
import PostPage from "./routes/PostPage";
import EditPost from "./routes/EditPost";

const App = () => {
  return (
    <UserContextProvider>
      <main className="p-[10px] max-w-[768px] m-auto min-h-screen">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateNewPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />

          {/* Case No routes defined */}
          <Route path="*" element={<Error message="Invalid route given" />} />
        </Routes>
        <Footer />
      </main>
    </UserContextProvider>
  );
};

export default App;
