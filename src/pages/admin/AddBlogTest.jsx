// ...keep all imports the same
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import axios from "axios";

const AddBlogTest = () => {
  const [form, setForm] = useState({
    title: "",
    des: "",
    banner: "",
    tags: "",
    draft: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        content: editor.getHTML(),
        tags: form.tags.split(",").map((tag) => tag.trim()),
      };

      await axios.post("/api/blogs", payload);
      setMessage("✅ Blog created successfully!");
      setForm({
        title: "",
        des: "",
        banner: "",
        tags: "",
        draft: false,
      });
      editor.commands.setContent("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error creating blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Create New Blog</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />

        <input
          type="text"
          name="des"
          value={form.des}
          onChange={handleChange}
          placeholder="Short Description"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />

        <input
          type="text"
          name="banner"
          value={form.banner}
          onChange={handleChange}
          placeholder="Banner Image URL (optional)"
          className="w-full border border-gray-300 p-3 rounded"
        />

        {/* --- TOOLBAR START --- */}
        {editor && (
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("italic")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 1 })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              H1
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                editor.isActive("bulletList")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              Bullet List
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${
                editor.isActive("orderedList")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } px-2 py-1 rounded text-sm`}
            >
              Numbered List
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL");
                editor.chain().focus().setLink({ href: url }).run();
              }}
              className="bg-gray-200 px-2 py-1 rounded text-sm"
            >
              Link
            </button>
          </div>
        )}
        {/* --- TOOLBAR END --- */}

        <div className="min-h-[200px] p-3 border rounded bg-white text-base leading-relaxed focus:outline-none prose max-w-none">
          <EditorContent editor={editor} />
        </div>

        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border border-gray-300 p-3 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="draft"
            checked={form.draft}
            onChange={handleChange}
          />
          <span>Save as Draft</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogTest;
