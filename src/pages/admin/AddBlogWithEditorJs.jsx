import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import ImageTool from "@editorjs/image";
import axios from "axios";
import { useAppContext } from "../../context/AppContextProvider";

const AddBlogWithEditorJs = () => {
  const { BACKEND_URL } = useAppContext();
  const ejInstance = useRef();
  const [form, setForm] = useState({
    title: "",
    des: "",
    banner: "",
    tags: "",
    draft: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Write your blog content here...",
      tools: {
        header: Header,
        paragraph: Paragraph,
        list: List,
        quote: Quote,
        code: Code,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                return {
                  success: 1,
                  file: {
                    url: URL.createObjectURL(file),
                  },
                };
              },
            },
          },
        },
      },
      onReady: () => {
        ejInstance.current = editor;
      },
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    setTimeout(async () => {
      try {
        const content = await ejInstance.current.save();

        if (!content?.blocks?.length) {
          setMessage("❌ You need to add some content to the blog.");
          setSaving(false);
          return;
        }

        const payload = {
          title: form.title,
          des: form.des,
          banner: form.banner,
          tags: form.tags.split(",").map((tag) => tag.trim()),
          content,
          draft: form.draft,
        };

        await axios.post(`${BACKEND_URL}/blog/create-blog`, payload, {
          withCredentials: true,
        });

        setMessage("✅ Blog created successfully!");
        setForm({
          title: "",
          des: "",
          banner: "",
          tags: "",
          draft: false,
        });
        ejInstance.current.clear();
      } catch (error) {
        console.error(error);
        setMessage("❌ Failed to create blog");
      } finally {
        setSaving(false);
      }
    }, 300); // Add delay to ensure EditorJS finishes syncing input
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Create Blog</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="Banner Image URL"
          className="w-full border border-gray-300 p-3 rounded"
        />

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
          <span className="text-sm">Save as Draft</span>
        </label>

        <div
          id="editorjs"
          className="border rounded bg-white p-4 min-h-[300px]"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogWithEditorJs;
