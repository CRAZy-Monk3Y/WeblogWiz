import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, createdAt, author, _id }) => {
  return (
    <div className="my-4 bg-slate-300 p-4 rounded-lg flex gap-4 min-h-[250px] md:flex-row flex-col">
      <Link to={`/post/${_id}`} className="md:w-[45%] w-full">
        <img
          src={`http://localhost:4000/${cover}`}
          alt={title}
          className="max-h-[250px] w-full h-full"
          loading="lazy"
        />
      </Link>
      <div className="md:w-[55%] w-full">
        <Link to={`/post/${_id}`}>
          <h2 className="text-[1.5rem] font-semibold pt-2">{title}</h2>{" "}
        </Link>
        <p className="text-gray-500 mb-2 text-[0.85rem] font-semibold">
          <a href="" className="mr-2">
            {author.username}
          </a>
          <span className="font-normal">
            {format(new Date(createdAt), "d-MMM-yyyy p")}
          </span>
        </p>
        <p className="text-justify text-sm leading-5">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
