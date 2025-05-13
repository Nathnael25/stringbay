import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Eye, EyeOff, User, Lock, AlertTriangle } from "lucide-react";

const LoginOrRegisterPage = () => {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("buyer");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regFullName || !regEmail || !regPassword || !regRole) {
      setRegError("All fields are required");
      return;
    }

    try {
      setRegError("");
      setRegLoading(true);
      await register(
        regFullName, // → maps to fullName
        regEmail, // → maps to email
        regPassword, // → maps to password
        regRole // → maps to role
      );
      navigate("/");
    } catch (err) {
      setRegError(err.message || "Registration failed");
    } finally {
      setRegLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 font-medium border-b-2 ${
              tab === "login"
                ? "border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-4 py-2 font-medium border-b-2 ${
              tab === "register"
                ? "border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {tab === "login" && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Login
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Password"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Log In"}
              </button>

              <div className="text-right mt-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </>
        )}

        {tab === "register" && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Register
            </h2>
            {regError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms
                </label>
              </div>
              <button
                type="submit"
                disabled={regLoading}
                className={`w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md ${
                  regLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {regLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegisterPage;
