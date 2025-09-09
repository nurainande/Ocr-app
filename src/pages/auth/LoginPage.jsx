// src/components/Login.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend login API here
    console.log({ email, password });
    props.showModal("success", "✅ Login successful!");
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring "
              placeholder="youemail@gmail.com"
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
          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2 text-light font-semibold shadow-md transition           hover:bg-main focus:ring focus:ring-main"
          >
            Sign In
          </button>

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
