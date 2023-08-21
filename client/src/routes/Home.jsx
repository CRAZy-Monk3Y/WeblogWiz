import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const response = await fetch("http://localhost:4000/post");
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} {...post} />)
      ) : (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <h1
            className="text-3xl"
            style={{ animation: "ping 4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          >
            No Posts Found
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
