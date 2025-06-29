import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContextProvider";
import { Link } from "react-router-dom";
import HeaderAssistant from "../_components/HeaderAssistant";
import Loader from "../_components/Loader";

const ProjectsTest2 = () => {
  const { BACKEND_URL } = useAppContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/project/get-all-project`)
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => console.error("Failed to fetch projects:", err))
      .finally(() => setLoading(false));
  }, [BACKEND_URL]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-60">
  //       <p className="text-gray-500 text-lg">Loading projects...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <HeaderAssistant />

      {/* Header Section */}
      <div
        className="relative h-60 md:h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1350&q=80")`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-main opacity-60"></div>
        <h1 className="text-4xl md:text-5xl font-bold z-10">Projects</h1>
      </div>

      {/* Project Cards */}
      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <Loader color="purple-700" size="60" text="Loading Projects, Please wait..." />
        </div>
      ) : (
        <div className="p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all"
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
                  <p className="text-gray-600 text-sm mb-2">
                    {project.technologies}
                  </p>
                  <Link
                    to={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white bg-main px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Visit Project
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No projects available.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsTest2;
