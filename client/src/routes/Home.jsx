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
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Home;
