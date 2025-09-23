// src/components/Register.jsx
import axios from "axios";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendant"); // default role
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Call backend register API here
       const result = await axios.post('http://localhost:4000/api/auth/register', { name, username, password, role }, {
            withCredentials: true,
        });
        console.log(result)
        props.showModal("success", "✅ Registration successful!");
        setName("");
        setUsername("");
        setPassword("");
        setRole("attendant");
        
    } catch (error) {
        console.log(error)
        props.showModal("error", "✅ Registration unsuccessful!");

    } finally {
        setLoading(false);
    }
    console.log({ name, username, password, role });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-sm rounded-2xl bg-light p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary-lighter">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-secondary-lighter">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring"
              placeholder="John Doe"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-secondary-lighter">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring"
              placeholder="johndoe123"
            />
          </div>

          {/* Password */}
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

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-secondary-lighter">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring"
            >
              <option value="attendant">Attendant</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          {/* Submit Button */}
          {loading?<button>Loading...</button>:<button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2 text-light font-semibold shadow-md transition hover:bg-main focus:ring focus:ring-main"
          >
            Sign Up
          </button>}

          {/* Already have account */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="mt-2 text-sm text-secondary-lighter hover:underline"
            >
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
