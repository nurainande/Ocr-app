import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Dummy data (replace later with actual API call)
    const dummyBlogs = [
      {
        _id: "1",
        title: "How I Built a Recharge API",
        des: "I walk through how I developed a smart recharge system using Node.js and MongoDB...",
        banner: "https://via.placeholder.com/600x400",
        tags: ["Node.js", "MongoDB", "Automation"],
        blog_id: "blog1",
        draft: false,
        author: "Nurain",
      },
      {
        _id: "2",
        title: "Building Business Websites Fast",
        des: "Here’s how I speed up web development using reusable React components and Tailwind.",
        banner: "https://via.placeholder.com/600x400",
        tags: ["React", "Tailwind", "Freelance"],
        blog_id: "blog2",
        draft: false,
        author: "Nurain",
      },
    ];

    setBlogs(dummyBlogs);
  }, []);

  return (
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
              <a
                href={`/blog/${blog._id}`}
                className="inline-block text-white bg-main px-4 py-2 rounded hover:bg-purple-700"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
