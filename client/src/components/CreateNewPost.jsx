import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        color: ["red", "blue", "yellow", "green", "black", "gray", "white"],
      },
      {
        background: [
          "red",
          "blue",
          "yellow",
          "green",
          "black",
          "gray",
          "white",
        ],
      },
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const CreateNewPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form
      className="flex flex-col gap-4 min-h-[55vw]"
      onSubmit={handleFormSubmit}
    >
      <input
        className="w-full p-2 text-black"
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />
      <input
        className="w-full p-2 text-black"
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
        required
      />
      <input
        className="w-full p-2"
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        required
      />
      <ReactQuill
        value={content}
        modules={modules}
        theme="snow"
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="w-full p-2 bg-gray-400 hover:bg-gray-600 hover:text-white rounded-md">
        Post
      </button>
    </form>
  );
};

export default CreateNewPost;
