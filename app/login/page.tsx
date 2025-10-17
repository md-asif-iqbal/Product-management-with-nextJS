"use client";
import { useLoginMutation, useRegisterMutation } from "@/store/services/products";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

function getErrorMessage(err: unknown): string | null {
  const e = err as FetchBaseQueryError | SerializedError | undefined;
  if (!e) return null;
  if (typeof (e as FetchBaseQueryError).status !== "undefined") {
    const data = (e as FetchBaseQueryError).data as { message?: string } | undefined;
    return data?.message ?? null;
  }
  if ((e as SerializedError).message) return (e as SerializedError).message as string;
  return null;
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = isLoginLoading || isRegisterLoading;
  const error = loginError || registerError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await login({ 
          email: formData.email, 
          password: formData.password 
        }).unwrap();
        toast.success("Welcome back!");
      } else {
        result = await register({ 
          name: formData.name,
          email: formData.email, 
          password: formData.password 
        }).unwrap();
        toast.success("Account created successfully!");
      }
      
      dispatch(setCredentials({ 
        token: result.token, 
        email: result.email,
        name: result.name 
      }));
      router.push("/products");
    } catch (_err) {
      toast.error(isLogin ? "Login failed" : "Registration failed");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color:var(--bg)] via-[color:var(--surface)] to-[color:var(--bg)]">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="card backdrop-blur-sm bg-[color:var(--surface)]/80 border-[color:var(--surface2)]/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="helper">
              {isLogin 
                ? "Sign in to your account to continue" 
                : "Join us to start managing your products"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="label">Full Name</label>
                <input 
                  className="input" 
                  type="text" 
                  required={!isLogin}
                  value={formData.name} 
                  onChange={(e) => handleInputChange("name", e.target.value)} 
                  placeholder="John Doe" 
                />
              </div>
            )}

            <div>
              <label className="label">Email Address</label>
              <input 
                className="input" 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => handleInputChange("email", e.target.value)} 
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input 
                className="input" 
                type="password" 
                required 
                value={formData.password} 
                onChange={(e) => handleInputChange("password", e.target.value)} 
                placeholder="••••••••" 
              />
            </div>

            {!isLogin && (
              <div>
                <label className="label">Confirm Password</label>
                <input 
                  className="input" 
                  type="password" 
                  required={!isLogin}
                  value={formData.confirmPassword} 
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)} 
                  placeholder="••••••••" 
                />
                {!isLogin && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="error">Passwords do not match</p>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-[color:var(--danger)]/15 border border-[color:var(--danger)]/40">
                <p className="text-sm text-[color:var(--danger)]">
                  {getErrorMessage(error) || "Authentication failed"}
                </p>
              </div>
            )}

            <button 
              disabled={isLoading || !formData.email || !formData.password || (!isLogin && (!formData.name || formData.password !== formData.confirmPassword))} 
              className="button button-primary w-full py-3 text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm opacity-70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "", confirmPassword: "" });
              }}
              className="link text-sm mt-2"
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
