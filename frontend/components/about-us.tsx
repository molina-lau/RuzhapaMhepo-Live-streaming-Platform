import { GlobalExports } from "@/global/informations";
import { useThemeMode } from "@/stores/user-state";
import Link from "next/link";
import React from "react";

export default function AboutUs() {
  const lightMode = useThemeMode();
  return (
    <>
      <div className="about-area py-80 mb-20">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                <div className="about-img">
                  <div className="about-experience">
                    <h6>10k</h6>
                    <p>Listeners</p>
                  </div>
                  <div className="row">
                    <div className="col-6 ">
                      <div className="img-1">
                        <img src="/assets/img/about/01.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="img-2">
                        <img src="/assets/img/about/02.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-right wow fadeInRight"
                data-wow-delay=".25s"
              >
                <div className="site-heading mb-3">
                  <span
                    className={`site-title-tagline ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    <i className="fas fa-microphone-lines"></i> About Us
                  </span>
                  <h2
                    className={`site-title ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    Easy & Quick <span>Way To Listen</span> Favorite Podcast
                  </h2>
                </div>
                <div className="about-content">
                  <p className="about-text">
                    We are glad you are here. Tune in live to hear the best
                    music/talk shows in the world, and explore our site for
                    news!
                  </p>
                  <div className="about-item-wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="about-item">
                          <div className="icon tw:flex! tw:justify-center! tw:items-center!">
                            <img src="assets/img/icon/podcast-1.svg" alt="" />
                          </div>
                          <div className="content">
                            <h4
                              className={` ${
                                lightMode.mode ? "" : " tw:text-white!"
                              }`}
                            >
                              On Time Live Podcast
                            </h4>
                            <p>live streaming</p>
                          </div>
                        </div>
                        <div className="about-item">
                          <div className="icon tw:flex! tw:justify-center! tw:items-center!">
                            <img src="assets/img/icon/podcast.svg" alt="" />
                          </div>
                          <div className="content">
                            <h4
                              className={` ${
                                lightMode.mode ? "" : " tw:text-white!"
                              }`}
                            >
                              Best Sound Quality
                            </h4>
                            <p>Best streaming queality offered</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <ul className="about-list">
                          <li className="about-list-item">
                            <i className="fas fa-circle-check"></i> On Time Live
                            Podcast
                          </li>
                          <li className="about-list-item">
                            <i className="fas fa-circle-check"></i> Record
                            Podcasts
                          </li>
                          <li className="about-list-item">
                            <i className="fas fa-circle-check"></i>Download
                            Recorded Podcasts
                          </li>
                          <li className="about-list-item">
                            <i className="fas fa-circle-check"></i> All Type
                            Podcast Show
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="about-bottom">
                  <Link href="/about" className="theme-btn">
                    Discover More<i className="fas fa-circle-arrow-right"></i>
                  </Link>
                  <div className="about-phone">
                    <div className="icon">
                      <i className="far fa-headset"></i>
                    </div>
                    <div className="number">
                      <span>Call Now</span>
                      <h6>
                        <a href={`tel:${GlobalExports.PhoneF}`}>
                          {GlobalExports.Phone}
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
