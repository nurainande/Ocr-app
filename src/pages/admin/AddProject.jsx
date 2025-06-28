import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContextProvider";

const AddProject = () => {
  const { BACKEND_URL } = useAppContext();

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        technologies: form.technologies,
        image: form.image,
        link: form.link,
      };

      await axios.post(`${BACKEND_URL}/project/create-project`, payload, {
        withCredentials: true, // for cookie auth if needed
      });

      setMessage("✅ Project created successfully!");
      setForm({
        title: "",
        description: "",
        technologies: "",
        image: "",
        link: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Add New Project</h2>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description (optional)"
          className="w-full border border-gray-300 p-3 rounded"
          rows="3"
        />

        <input
          type="text"
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="Technologies (e.g. React, Node.js, MongoDB)"
          className="w-full border border-gray-300 p-3 rounded"
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 p-3 rounded"
        />

        <input
          type="text"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project Link (GitHub, Live Site...)"
          className="w-full border border-gray-300 p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
