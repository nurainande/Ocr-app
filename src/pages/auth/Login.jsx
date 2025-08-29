// src/components/Login.jsx  //LOGIN PAGE FOR THE ATTENDANT TO LOG IN, IMMEDIATELY THE LOGIN IS SUCCESSFUL, THEY ARE REDIRECTED TO THE DASHBOARD PAGE WHERE THEY CAN CLICK FOR MODALS TO APPEAR FOR VARIOUS ACTIONS
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend login API here
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Warehouse Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold shadow-md transition hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
