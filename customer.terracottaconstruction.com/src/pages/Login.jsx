import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if customer already exists
    const { data, error } = await supabase
      .from("customers")
      .select("id")
      .eq("email", user.email)
      .single();

    if (!data) {
      // Add to Supabase if not found
      await supabase.from("customers").insert([
        {
          email: user.email,
          name: user.displayName || "Google User",
          phone: "",         // Optional: can add later via Settings
          address: "",       // Optional
        },
      ]);
    }

    navigate("/");
  } catch (err) {
    console.error("Google login error:", err);
    setError("Google sign-in failed.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#c1440e] mb-6 text-center">
          Customer Login
        </h1>

        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c1440e]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c1440e]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#c1440e] text-white py-2 rounded hover:bg-orange-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
