import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) =>
      response.json().then((data) => setPostInfo(data))
    );
  }, []);

  const handleDeletePost = async () => {
    const res = confirm("Are you sure you want to delete this post?");
    if (res) {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).catch((err) => alert("Can not Delete this Post"));

        if (response.ok) {
          setRedirect(true);
          alert(`Post Deleted Successfully। `);
        } else {
          alert("Can not Delete this Post");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!postInfo) return <></>;

  const { cover, title, content, author, createdAt, updatedAt, _id } = postInfo;

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-center font-semibold">{title}</h1>
      <div className="flex text-red-600 gap-4 font-semibold justify-center items-center">
        {userInfo?.id !== author._id ? (
          <span>By @{author.username}</span>
        ) : (
          <span>By You</span>
        )}
        <span>-</span>
        {createdAt === updatedAt ? (
          <time className="font-normal">
            Posted on {format(new Date(createdAt), "d-MMM-yyyy p")}
          </time>
        ) : (
          <time className="font-normal">
            Last Updated {format(new Date(updatedAt), "d-MMM-yyyy p")}
          </time>
        )}
        {userInfo?.id === author._id && (
          <>
            <span>-</span>
            <Link
              to={`/edit/${_id}`}
              className="text-black flex gap-1 bg-yellow-300 py-1 px-2 rounded-md"
            >
              Edit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
            <button
              className="text-black flex gap-1 bg-red-400 py-1 px-2 rounded-md"
              onClick={handleDeletePost}
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </>
        )}
        {userInfo?.id && (
          <div className="flex gap-1 text-[#000]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            <span>20</span>
          </div>
        )}
      </div>
      <img
        src={`http://localhost:4000/${cover}`}
        alt={title}
        className="max-h-[200px] overflow-hidden object-cover flex"
      />
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </div>
  );
};

export default PostPage;
