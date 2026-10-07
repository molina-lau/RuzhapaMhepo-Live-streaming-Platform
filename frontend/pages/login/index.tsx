import BreadCrump from "@/components/bread-crump";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DefaultLoader } from "@/components/loader";
import MainMapper from "@/components/main-mapper";
import { User } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/time-ops";
import {
  getDeviceId,
  saveSessionToLocalStorage,
  saveUserToLocalStorage,
} from "@/utils/utils";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async () => {
    if (loading) return;
    if (!email.trim()) {
      showErrorToast("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showErrorToast("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      showErrorToast("Password is required");
      return;
    }
    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/login`, {
        method: "POST",
        headers: {
          "x-device-id": getDeviceId(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      if (response.ok) {
        showSuccessToast("Login was successful");
        const data: { payload: { user: User; payload: string } } =
          await response.json();
        saveSessionToLocalStorage(data.payload.payload);
        saveUserToLocalStorage(data.payload.user);
        return Router.back();
      }
      if (response.status == 401) {
        return showErrorToast("The credentials were not sent in full");
      }
      if (response.status == 400) {
        const { message } = await response.json();
        return showErrorToast(message);
      }
      return showErrorToast("There was unkown error :" + response.status);
    } catch (e) {
      showErrorToast(`There was error : ${e}`);
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster />
      <Header page={""} />
      <MainMapper>
        <BreadCrump page={"login"} title={"Welcome Back"} />
        <div className="auth-area py-80">
          <div className="container">
            <div className="col-md-5 col-lg-4 mx-auto">
              <div className="auth-wrap">
                <div className="auth-header">
                  <img src="assets/img/logo/logo-dark.png" alt="" />
                  <p>Login with your RuzhaPamhepo account</p>
                </div>
                <div className="auth-form">
                  <div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Your Password"
                      />
                    </div>
                    <div className="auth-check">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                      <a href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="auth-btn">
                      <button
                        type="submit"
                        className="theme-btn"
                        onClick={() => login()}
                      >
                        {loading ? (
                          <DefaultLoader />
                        ) : (
                          <>
                            {" "}
                            <span className="far fa-sign-in"></span>Login In
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="auth-footer">
                    <div className="auth-social">
                      <span className="auth-divider">or</span>
                      <div className="auth-social-list">
                        <a href="#" className="auth-fb">
                          <i className="fab fa-facebook-f"></i>Facebook
                        </a>
                        <a href="#" className="auth-gl">
                          <i className="fab fa-google"></i>Google
                        </a>
                        <a href="#" className="auth-tw">
                          <i className="fab fa-x-twitter"></i>Twitter
                        </a>
                      </div>
                    </div>
                    <p>
                      Dont have an account?{" "}
                      <Link href="/register">Register.</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainMapper>
      <Footer />
    </>
  );
}
