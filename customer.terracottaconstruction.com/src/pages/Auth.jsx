import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      setMessage(isLogin ? "Logged in!" : "Check your email to confirm.");
    } catch (err) {
      setMessage(err.message || "An error occurred.");
    }
  };

  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setMessage(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Customer Login" : "Create an Account"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-terracotta text-white py-2 rounded hover:bg-terracotta-dark"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button className="text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>

        <div className="border-t pt-4 mt-4">
          <button
            onClick={() => handleOAuth("google")}
            className="w-full border px-3 py-2 rounded mb-2 hover:bg-gray-50"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("apple")}
            className="w-full border px-3 py-2 rounded hover:bg-gray-50"
          >
            Continue with Apple
          </button>
        </div>

        {message && (
          <div className="mt-4 text-center text-sm text-red-600">{message}</div>
        )}
      </div>
    </div>
  );
}

export default Auth;
