import BreadCrump from "@/components/bread-crump";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DefaultLoader } from "@/components/loader";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "@/utils/time-ops";
import {
  getDeviceId,
  saveSessionToLocalStorage,
  saveUserToLocalStorage,
} from "@/utils/utils";
import Router from "next/router";
import Link from "next/link";
import MainMapper from "@/components/main-mapper";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!fullName.trim()) {
      showErrorToast("Full Name is required");
      return;
    }
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      showErrorToast("Please enter both first name and last name");
      return;
    }
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}user/register`,
        {
          method: "POST",
          headers: {
            "x-device-id": getDeviceId(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: fullName.split(" ")[0],
            lastName: fullName.split(" ")[1],
            email,
            password,
          }),
        }
      );
      setLoading(false);
      if (response.ok) {
        showSuccessToast("account creation successfull");
        const { payload } = await response.json();
        saveSessionToLocalStorage(payload);
        saveUserToLocalStorage({
          email: email,
          lastName: fullName.split(" ")[1],
          firstName: fullName.split(" ")[0],
          role: "",
          likes: [],
          podcasts: [],
        });
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
        <BreadCrump page={"register"} title={"Register With Us"} />
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
                      <label>FullName</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-control"
                        placeholder="Your FullName"
                      />
                    </div>
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

                    <div className="auth-btn">
                      <button
                        type="submit"
                        className="theme-btn"
                        onClick={() => signUp()}
                      >
                        {loading ? (
                          <DefaultLoader />
                        ) : (
                          <>
                            {" "}
                            <span className="far fa-sign-in"></span>Register
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
                      Have an account? <Link href="/login">Login.</Link>
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
