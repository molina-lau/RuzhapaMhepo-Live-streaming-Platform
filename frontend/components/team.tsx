import { GlobalExports } from "@/global/informations";
import { useThemeMode } from "@/stores/user-state";
import React from "react";

export default function Team() {
  const lightMode = useThemeMode();

  return (
    <>
      <div className="team-area py-100" id="team">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div
                className="site-heading text-center wow fadeInDown"
                data-wow-delay=".25s"
              >
                <span
                  className={`site-title-tagline  ${
                    lightMode.mode ? "" : " tw:text-white!"
                  }`}
                >
                  <i className="fas fa-microphone-lines"></i> Our Team
                </span>
                <h2
                  className={`site-title  ${
                    lightMode.mode ? "" : " tw:text-white!"
                  }`}
                >
                  Meet With Our <span>Podcaster</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay=".25s">
            {GlobalExports.PodcastTeams.map((e, i) => (
              <div className={`col-md-6 col-lg-4 col-xl-3 `} key={i}>
                <div
                  className={`team-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <div className="team-img">
                    <img src={e.src} alt="thumb" />
                    <div className="team-social">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                  <div
                    className={`team-info ${
                      lightMode.mode ? "" : " tw:bg-gray-900! "
                    }`}
                  >
                    <h5>
                      <a
                        href="#"
                        className={`${lightMode.mode ? "" : " tw:text-white!"}`}
                      >
                        {e.name}
                      </a>
                    </h5>
                    <span>{e.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
