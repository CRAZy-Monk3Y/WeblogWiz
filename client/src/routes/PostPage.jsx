import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) =>
      response.json().then((data) => setPostInfo(data))
    );
  }, []);

  if (!postInfo) return <></>;

  const { cover, title, content, author, createdAt, updatedAt, _id } = postInfo;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-center font-semibold">{title}</h1>
      <div className="flex text-red-600 gap-4 font-semibold justify-center items-center">
        <span>By @{author.username}</span>
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
          </>
        )}
      </div>
      <img
        src={`http://localhost:4000/${cover}`}
        alt={title}
        className="max-h-[200px] overflow-hidden object-cover flex"
      />
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostPage;
