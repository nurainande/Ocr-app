// src/components/Login.jsx
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";
import { getLoggedInUser } from "../../services/services";

export default function Login(props) {
  const { setUserAuth,BACKEND_URL } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Call backend login API here
    try {
      const result = await axios.post(`${BACKEND_URL}/auth/login`, { username, password }, {
            withCredentials: true,
        });
        console.log("RESULT",result)
        props.showModal("success", "✅ Login successful!");
        const user = await getLoggedInUser(`${BACKEND_URL}/auth/me`);
        navigate("/")
        setUserAuth(user);
        setUsername("");
        setPassword("");
    } catch (error) {
        props.showModal("error", "🚩🚩 Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-sm rounded-2xl bg-light p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary-lighter">
          Warehouse Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-secondary-lighter">
              Username
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring "
              placeholder="your username"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-secondary-lighter">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-primary-100 px-3 py-2 text-sm shadow-sm focus:border-main focus:ring focus:ring-primary-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-secondary-lighter focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Submit Button */}
          {loading?<button>Loading...</button>:<button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2 text-light font-semibold shadow-md transition           hover:bg-main focus:ring focus:ring-main"
          >
            Sign In
          </button>}

          {/* Back to Home */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="mt-2 text-sm text-secondary-lighter hover:underline"
            >
              Back to Home
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
