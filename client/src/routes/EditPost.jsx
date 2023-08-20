import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [author, setAuthor] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) =>
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setAuthor(data.author);
      })
    );
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }
    await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    setRedirect(true);
  };

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

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form
      className="flex flex-col gap-4 min-h-[55vw]"
      onSubmit={handleFormSubmit}
    >
      <input
        className="w-full p-2"
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        className="w-full p-2"
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />
      <input
        className="w-full p-2"
        type="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <ReactQuill
        value={content}
        modules={modules}
        theme="snow"
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="w-full p-2 bg-gray-400 hover:bg-gray-600 hover:text-white rounded-md">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
