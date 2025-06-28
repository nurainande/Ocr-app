import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContextProvider";

const renderBlock = (block, index) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {block.data.text}
        </p>
      );

    case "header": {
      const Tag = `h${block.data.level}`;
      return (
        <Tag key={index} className="my-6 text-blue-700 font-bold text-2xl">
          {block.data.text}
        </Tag>
      );
    }

    case "list": {
      const items = (block.data.items || []).map((item, i) => {
        const text = typeof item === "string" ? item : item?.content || "Item";
        return <li key={i}>{text}</li>;
      });

      return block.data.style === "unordered" ? (
        <ul key={index} className="list-disc ml-6 mb-4">
          {items}
        </ul>
      ) : (
        <ol key={index} className="list-decimal ml-6 mb-4">
          {items}
        </ol>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4"
        >
          {block.data.text}
        </blockquote>
      );

    case "image":
      return (
        <div key={index} className="my-6">
          <img
            src={block.data.file?.url}
            alt={block.data.caption || ""}
            className="w-full rounded-lg shadow"
          />
          {block.data.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {block.data.caption}
            </p>
          )}
        </div>
      );

    case "code":
      return (
        <pre
          key={index}
          className="bg-gray-800 text-green-300 p-4 rounded-md text-sm overflow-x-auto mb-6"
        >
          <code>{block.data.code}</code>
        </pre>
      );

    default:
      return null;
  }
};

const SingleBlog = () => {
  const { BACKEND_URL } = useAppContext();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/get-blog/${id}`);
        setBlog(res.data.blog);
        console.log(res.data.blog);

      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  const contentBlocks = blog?.content?.blocks;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500">
          Written by {blog.author?.fullName || "Unknown Author"}
        </p>
      </div>

      {/* Banner */}
      <div className="mb-10">
        <img
          src={blog.banner}
          alt="Blog banner"
          className="w-full h-80 object-cover rounded-lg shadow"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        {contentBlocks?.length > 0 ? (
          contentBlocks.map((block, i) => renderBlock(block, i))
        ) : (
          <p className="text-gray-400 italic">No content found.</p>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
