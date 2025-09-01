// src/components/Login.jsx  //LOGIN PAGE FOR THE ATTENDANT TO LOG IN, IMMEDIATELY THE LOGIN IS SUCCESSFUL, THEY ARE REDIRECTED TO THE DASHBOARD PAGE WHERE THEY CAN CLICK FOR MODALS TO APPEAR FOR VARIOUS ACTIONS
import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend login API here
    console.log({ email, password });
    props.showModal("success", "✅ Login successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-100 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-light p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary-800">
          Warehouse Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-secondary-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-main px-3 py-2 text-sm shadow-sm focus:border-main focus:ring focus:ring-primary-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-secondary-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-primary-100 px-3 py-2 text-sm shadow-sm focus:border-main focus:ring focus:ring-primary-200"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-100 px-4 py-2 text-light font-semibold shadow-md transition hover:bg-main focus:ring focus:ring-main"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
