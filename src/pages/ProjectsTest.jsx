// import { useEffect, useState } from "react";
// import axios from "axios"

import HeaderAssistant from "../_components/HeaderAssistant";
import Loader from "../_components/Loader";

const ProjectsTest = ({projects}) => {
  // const [projects, setProjects] = useState([]);

  // Simulate fetching data (replace this later with actual API call)
  // useEffect(() => {
  //   // const dummyProjects = [
  //   //   {
  //   //     _id: "1",
  //   //     title: "AI Portfolio Site",
  //   //     image: "https://via.placeholder.com/600x400",
  //   //     technologies: "React, Tailwind, Node.js",
  //   //     link: "https://example.com/project1",
  //   //   },
  //   //   {
  //   //     _id: "2",
  //   //     title: "E-Commerce Backend",
  //   //     image: "https://via.placeholder.com/600x400",
  //   //     technologies: "Express, MongoDB, Stripe",
  //   //     link: "https://example.com/project2",
  //   //   },
  //   //   {
  //   //     _id: "3",
  //   //     title: "Mobile Chat App",
  //   //     image: "https://via.placeholder.com/600x400",
  //   //     technologies: "React Native, Firebase",
  //   //     link: "https://example.com/project3",
  //   //   },
  //   // ];
  //   // setProjects(dummyProjects);

  //   axios
  //     .get("http://localhost:3000/api/project/get-all-project")
  //     .then((res) => setProjects(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <HeaderAssistant />
      <div>
        {/* Header Section */}
        <div
          className="relative h-60 md:h-80 bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1350&q=80")`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-main opacity-60"></div>
          <h1 className="text-4xl md:text-5xl font-bold z-10">Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!projects ? (
            <Loader />
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.technologies}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-main text-white rounded hover:bg-purple-800"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsTest;
