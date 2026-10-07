import { GlobalExports } from "@/global/informations";
import { useThemeMode } from "@/stores/user-state";
import { showSuccessToast } from "@/utils/time-ops";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const themeState = localStorage.getItem("theme");
    setTheme(themeState ?? "light");
  }, []);
  return (
    <>
      <footer className="footer-area">
        <div className="footer-widget">
          <div className="container">
            <div className="footer-widget-wrapper pt-80 pb-50">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <div className="footer-widget-box about-us">
                    <Link href="#" className="footer-logo">
                      <img
                        src="assets/img/logo/logo.png"
                        className="logo-dark-mode"
                        alt=""
                      />
                      <img
                        src="assets/img/logo/logo-dark.png"
                        className="logo-light-mode"
                        alt=""
                      />
                    </Link>
                    <p className="mb-3">
                      RuzhaPamhepo &quot;Your Ultimate News, Education
                      &Entertainment FM&quot;!
                    </p>
                    <ul className="footer-social mt-20">
                      <li>
                        <Link href={GlobalExports.Facebook}>
                          <i className="fab fa-square-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={GlobalExports.Instagram}>
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={GlobalExports.Whatsapp}>
                          <i className="fab fa-whatsapp"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={GlobalExports.Youtube}>
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li>
                    </ul>
                    <div className="footer-language">
                      <div className="">
                        <select
                          value={theme}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value == "theme" || value == "light") {
                              setTheme(value);
                              showSuccessToast("Theme changed");
                              localStorage.setItem("theme", value);
                              return useThemeMode.setState({ mode: true });
                            } else if (value == "dark") {
                              setTheme(value);
                              showSuccessToast("Theme changed");
                              localStorage.setItem("theme", value);
                              return useThemeMode.setState({ mode: false });
                            }
                          }}
                          className="form-select theme-select"
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            background: theme === "dark" ? "#222" : "#fff",
                            color: theme === "dark" ? "#fff" : "#222",
                            fontSize: "1rem",
                            outline: "none",
                            minWidth: "110px",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <option value={"theme"}>Theme</option>
                          <option value={"dark"}>Dark</option>
                          <option value={"light"}>Light</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget-box list">
                    <h4 className="footer-widget-title">Ruzha Pamhepo</h4>
                    <ul className="footer-list">
                      <li>
                        <Link href="/about">About Us</Link>
                      </li>
                      <li>
                        <Link href="/team">Team</Link>
                      </li>
                      <li>
                        <Link href="/gallery">Gallery</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget-box list">
                    <h4 className="footer-widget-title">Explore</h4>
                    <ul className="footer-list">
                      <li>
                        <Link href="/radios">Radios</Link>
                      </li>
                      <li>
                        <Link href="/podcasts">Podcast</Link>
                      </li>
                      <li>
                        <Link href="/favourites">My Favourites</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget-box list">
                    <h4 className="footer-widget-title">Community</h4>
                    <ul className="footer-list">
                      <li>
                        <Link href="/faq">FAQ&apos;s</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="footer-widget-box list">
                    <h4 className="footer-widget-title">Newsletter</h4>
                    <div className="footer-newsletter">
                      <p>
                        Subscribe Our Newsletter To Get Latest Update And News
                      </p>
                      <div className="subscribe-form">
                        <form action="/podcasts">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                          />
                          <button className="theme-btn" type="submit">
                            Subscribe Now<i className="far fa-paper-plane"></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <p className="copyright-text">
                  &copy; Copyright {new Date().getFullYear()}{" "}
                  <Link href="/"> RuzhaPamhepo </Link> All Rights Reserved.
                </p>
              </div>
              <div className="col-md-6 align-self-center">
                <ul className="footer-menu">
                  <li>
                    <Link href="#">Support</Link>
                  </li>
                  <li>
                    <Link href="#">Terms Of Services</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
