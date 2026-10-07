import Link from "next/link";
import Router from "next/router";
import { FaUser } from "react-icons/fa";
import { clearUserSession, InitUser } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useThemeMode, useUserState } from "@/stores/user-state";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Toaster } from "react-hot-toast";
import { showSuccessToast } from "@/utils/time-ops";
export default function Header({ page }: { page: string }) {
  const user = useUserState();
  const lightMode = useThemeMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const themeState = localStorage.getItem("theme");
    useThemeMode.setState({ mode: themeState == "light" || !themeState });
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    InitUser();
    window.addEventListener("scroll", handleScroll);
  }, []);
  function promptALert(): void {
    setShowDialog(true);
  }
  return (
    <>
      <Toaster />
      <div
        className="vw-100 position-fixed vh-100  justify-content-center align-items-center"
        style={{
          backgroundColor: "#00000099",
          zIndex: 9999,
          display: showDialog ? "flex" : "none",
        }}
      >
        <Alert show={showDialog} variant="danger">
          <Alert.Heading>Logout</Alert.Heading>
          <p>Are you sure you want to logout?</p>
          <hr />
          <div className="d-flex justify-content-end gap-3">
            <Button
              onClick={() => {
                setShowDialog(false);
              }}
              variant="outline-success"
            >
              No
            </Button>
            <Button
              onClick={() => {
                setShowDialog(false);
                clearUserSession();
                showSuccessToast("Logged out successfully");
                Router.reload();
              }}
              variant="outline-danger"
            >
              Yes
            </Button>
          </div>
        </Alert>
      </div>

      <div className={searchActive ? "search-active" : ""}>
        <div className="search-popup">
          <button
            className="close-search"
            onClick={() => setSearchActive(false)}
          >
            <span className="far fa-times"></span>
          </button>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              Router.push("/search?q=" + searchTerm);
            }}
          >
            <div className="form-group">
              <input
                value={searchTerm}
                type="search"
                name="search-field"
                placeholder="Search Radios Stations..."
                required
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <button type="submit">
                <i className="far fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <header className={`header ${lightMode.mode ? "" : "dark-mode"}`}>
          <div className="main-navigation">
            <nav
              className={`navbar navbar-expand-lg ${
                isVisible
                  ? `fixed-top ${
                      lightMode.mode ? "" : "bg-dark tw:bg-gray-950!"
                    }`
                  : ""
              } ${lightMode.mode ? "" : "navbar-dark "}`}
            >
              <div className="container position-relative">
                <Link className="navbar-brand" href="index-2.html">
                  <img
                    src={
                      lightMode.mode
                        ? "assets/img/logo/logo-dark.png"
                        : "assets/img/logo/logo.png"
                    }
                    className="logo-display"
                    alt="logo"
                  />
                  <img
                    src={
                      lightMode.mode
                        ? "assets/img/logo/logo-dark.png"
                        : "assets/img/logo/logo.png"
                    }
                    className="logo-scrolled"
                    alt="logo"
                  />
                </Link>
                <div className="mobile-menu-right">
                  <div className="nav-search-wrap">
                    <div className="search-btn">
                      <button
                        type="button"
                        className="nav-right-link search-box-outer"
                        style={{
                          cursor: "pointer",
                          color: lightMode.mode ? undefined : "#fff",
                        }}
                        onClick={() => setSearchActive(!searchActive)}
                      >
                        <i className="feather-search"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main_nav"
                    aria-expanded="false"
                  >
                    <span className="navbar-toggler-mobile-icon">
                      <i className="feather-menu"></i>
                    </span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="main_nav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${page == "/" ? "active" : ""} ${
                          lightMode.mode ? "" : "tw:text-white!"
                        }`}
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          page == "about" ? "active" : ""
                        } ${lightMode.mode ? "" : "tw:text-white!"}`}
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          page == "podcasts" ? "active" : ""
                        } ${lightMode.mode ? "" : "tw:text-white!"}`}
                        href="/podcasts"
                      >
                        Podcast
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          page == "team" ? "active" : ""
                        } ${lightMode.mode ? "" : "tw:text-white!"}`}
                        href="/about#team"
                      >
                        Our Team
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          page == "gallery" ? "active" : ""
                        } ${lightMode.mode ? "" : "tw:text-white!"}`}
                        href="/gallery"
                      >
                        Gallery
                      </Link>
                    </li>
                  </ul>
                  <div className="nav-right">
                    <div
                      className="search-btn"
                      onClick={() => setSearchActive(!searchActive)}
                    >
                      <button
                        type="button"
                        className="nav-right-link search-box-outer"
                        style={{
                          color: lightMode.mode ? undefined : "#fff",
                        }}
                      >
                        <i className="feather-search"></i>
                      </button>
                    </div>
                    {(!user.email || user.email.trim().length == 0) && (
                      <div className="nav-right-btn">
                        <Link
                          href="/login"
                          className={`theme-btn ${
                            lightMode.mode ? "" : "btn-dark"
                          }`}
                        >
                          Register Now
                        </Link>
                      </div>
                    )}
                    {(user.email || user.email.trim().length > 0) && (
                      <div
                        className="nav-right-btn text-white"
                        style={{
                          background: "var(--theme-color)",
                          borderRadius: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }}
                      >
                        <Link className="text-white p-1" href={""}>
                          <Dropdown>
                            <Dropdown.Toggle
                              style={{
                                background: "transparent",
                                border: "none",
                                color: lightMode.mode ? undefined : "#fff",
                              }}
                              id="dropdown-basic"
                              className=" gap-2 d-flex align-items-center"
                            >
                              <FaUser />
                              {user.firstName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => promptALert()}>
                                Logout
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Link>
                      </div>
                    )}
                    <div className="sidebar-btn">
                      <button
                        type="button"
                        className="nav-right-link"
                        style={{
                          color: lightMode.mode ? undefined : "#fff",
                        }}
                      >
                        <i className="far fa-bars-sort"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
