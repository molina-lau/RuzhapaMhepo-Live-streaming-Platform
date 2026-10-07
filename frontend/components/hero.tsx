import { PodcastCrew } from "@/global/images";
import Link from "next/link";
import Router from "next/router";
import React from "react";

export default function Hero() {
  return (
    <>
      <div
        className="hero-section"
        style={{
          overflow: "clip",
          backgroundColor: "rgb(4,0,39)",
        }}
      >
        <div
          className="hero-single"
          style={{
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          <div
            className="hero-shape"
            style={{
              zIndex: -2,
              top: -50,
              position: "absolute",
            }}
          >
            <img src="assets/img/shape/01.png" alt="" />
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12 col-lg-6">
                <div className="hero-content">
                  <h6
                    className="hero-sub-title wow fadeInDown"
                    data-wow-delay=".25s"
                  >
                    <i className="far fa-microphone-lines"></i> Welcome
                  </h6>
                  <h1
                    className="hero-title wow fadeInRight"
                    data-wow-delay=".50s"
                  >
                    to <span>Ruzha</span>PaMhepo
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay=".75s">
                    We are glad you are here. Tune in live to hear the best
                    music/talk shows in the world, and explore our site for
                    news!
                  </p>
                  <div className="hero-btn wow fadeInUp" data-wow-delay="1s">
                    <Link href="/radios" className="theme-btn">
                      Explore More<i className="fas fa-circle-arrow-right"></i>
                    </Link>
                    <Link href="/podcasts" className="theme-btn theme-btn2">
                      Latest Podcasts
                      <i className="fas fa-circle-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div
                  className="hero-img wow fadeInRight"
                  data-wow-delay=".25s"
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => Router.push("/radios")}
                    type="button"
                    className="player-btn play-btn amplitude-play-pause"
                    style={{
                      background: "transparent",
                      position: "absolute",
                      border: "none",
                      top: "50%",
                      transform: "translateX(-50%) translateY(-50%)",
                      left: "50%",
                    }}
                    data-song-add="8"
                  >
                    <i className="fas fa-play"></i>
                  </button>
                  <div className="row g-4">
                    {PodcastCrew.map((e, i) => (
                      <div className="col-6" key={i}>
                        <div className="img-1">
                          <img
                            src={e.image}
                            alt={e.name}
                            style={{
                              borderTopLeftRadius: i == 0 || i == 3 ? 0 : "30%",
                              borderBottomRightRadius:
                                i == 1 || i == 2 ? "30%" : 0,
                              borderTopRightRadius:
                                i == 0 || i == 3 ? "30%" : 0,
                              borderBottomLeftRadius:
                                i == 0 || i == 3 ? "30%" : 0,
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
