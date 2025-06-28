import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContextProvider";
import { Link } from "react-router-dom";
import HeaderAssistant from "../_components/HeaderAssistant";

const BlogsTest = () => {
  const {BACKEND_URL} = useAppContext()
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Dummy data (replace later with actual API call)
    axios
      .get(`${BACKEND_URL}/blog/get-all-blog`)
      .then((res) => {
        console.log(res);
        setBlogs(res.data.blogs);
      })
      .catch((err) => console.error(err));
    setBlogs(blogs);
  }, []);

  return (
    <>
    <HeaderAssistant/>
      <div>
        {/* Header Section */}
        <div
          className="relative h-60 md:h-80 bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80")`,
            backgroundBlendMode: "overlay",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-main opacity-60"></div>
          <h1 className="text-4xl md:text-5xl font-bold z-10">Blog</h1>
        </div>

        {/* Blog Cards */}
        <div className="p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all"
            >
              <img
                src={blog.banner}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{blog.des}</p>
                <div className="flex flex-wrap gap-2 text-xs text-main mb-3">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="bg-yellow-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-block text-white bg-main px-4 py-2 rounded hover:bg-purple-700"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsTest;
