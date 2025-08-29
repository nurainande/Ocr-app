import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";
import { getLoggedInUser } from "../utils/getLoggedInUser";

const AuthPage = () => {
  const {setUserAuth}= useAppContext()
  const BACKEND_URL= 'https://'
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const url = isLogin ? `${BACKEND_URL}/user/login` : `${BACKEND_URL}/user/signup`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(url, payload, {
        withCredentials: true, // 👈 Required for cookie-based auth
      });
      console.log(res)

       // 👇 Get the logged-in user info from backend
    const user = await getLoggedInUser(BACKEND_URL);
    setUserAuth(user); // ✅ set into global state

      setMessage("✅ Success! Redirecting...");
      setTimeout(() => {
        navigate("/admin"); // or wherever your admin goes
      }, 1000);
    } catch (error) {
      setMessage(
        "❌ " + (error.response?.data?.message || "Something went wrong.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? "Login to Admin" : "Register Admin"}
        </h2>

        {message && (
          <p className="text-sm mb-4 text-center text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
