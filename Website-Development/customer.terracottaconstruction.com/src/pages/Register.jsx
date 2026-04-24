import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { auth, db } from "../supabase";
import logo from "../assets/logo.jpg";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await auth.signUp(form.email, form.password, {
        first_name: form.firstName,
        last_name: form.lastName
      });

      // Best-effort profile creation. If RLS or email-confirmation
      // blocks the insert, we still show the verify-email screen so
      // the customer knows to confirm their account.
      try {
        if (user?.id) {
          await db.createCustomer({
            user_id: user.id,
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            address_street: form.address,
            status: 'active'
          });
        }
      } catch (profileErr) {
        console.warn("Customer profile insert deferred:", profileErr?.message);
      }

      setRegistered(true);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please check your info.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendError("");
    setResendMessage("");
    setResendLoading(true);
    try {
      await auth.resend(form.email);
      setResendMessage("Verification email sent. Please check your inbox.");
    } catch (err) {
      console.error("Resend failed:", err);
      setResendError(err.message || "Could not resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src={logo}
              alt="Terracotta Construction"
              className="h-12 w-auto mb-4"
            />
            <FiCheckCircle className="text-terracotta mb-3" size={64} />
            <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
              One more step
            </h1>
            <p className="text-charcoal text-sm leading-relaxed">
              We have sent a verification email to{" "}
              <span className="font-semibold break-all">{form.email}</span>.
              Please click the link in that email before logging in. The email
              may take a minute or two to arrive.
            </p>
          </div>

          {resendMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-md px-3 py-2 text-sm">
              {resendMessage}
            </div>
          )}
          {resendError && (
            <div className="mb-4 bg-red-100 border border-red-300 text-red-700 rounded-md px-3 py-2 text-sm">
              {resendError}
            </div>
          )}

          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className={`w-full px-6 py-3 rounded-md font-semibold transition mb-3 ${
              resendLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-terracotta text-white hover:bg-terracotta-dark"
            }`}
          >
            {resendLoading ? "Sending..." : "Resend verification email"}
          </button>

          <Link
            to="/login"
            className="inline-block text-terracotta hover:text-terracotta-dark font-medium underline text-sm"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Terracotta Construction"
            className="h-12 w-auto mb-3"
          />
          <h1 className="font-heading text-3xl font-bold text-charcoal text-center">
            Create Account
          </h1>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-terracotta text-white hover:bg-terracotta-dark"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-terracotta hover:text-terracotta-dark font-medium underline"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Register;
