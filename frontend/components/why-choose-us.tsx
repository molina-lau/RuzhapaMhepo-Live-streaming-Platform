import { useThemeMode } from "@/stores/user-state";
import React from "react";

export default function WhyChooseUs() {
  const lightMode = useThemeMode();
  return (
    <>
      <div className="choose-area py-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="choose-content wow fadeInUp"
                data-wow-delay=".25s"
              >
                <div className="site-heading mb-3">
                  <span
                    className={`site-title-tagline ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    <i className="fas fa-microphone-lines"></i> Why Choose Us
                  </span>
                  <h2
                    className={`site-title ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    Easy To Listen <span>Anytime</span> And Anywhere
                  </h2>
                </div>
                <p>
                  Access our podcast and features effortlessly , Whether
                  you&apos;re at home, commuting, or on the go, our content is
                  readily available whenever and wherever you choose to listen.
                </p>
                <div className="choose-item-wrap">
                  <div className="choose-item">
                    <div className="icon tw:flex! tw:justify-center!">
                      <img src="assets/img/icon/offline.svg" alt="" />
                    </div>
                    <div className="content">
                      <h5
                        className={` ${
                          lightMode.mode ? "" : " tw:text-white!"
                        }`}
                      >
                        Listen To Podcast On Offline
                      </h5>
                      <p>record and listen later </p>
                    </div>
                  </div>
                  <div className="choose-item">
                    <div className="icon  tw:flex! tw:justify-center!">
                      <img src="assets/img/icon/podcast-1.svg" alt="" />
                    </div>
                    <div className="content">
                      <h5
                        className={` ${
                          lightMode.mode ? "" : " tw:text-white!"
                        }`}
                      >
                        All Time Best Sound Quality
                      </h5>
                      <p>Best quality streaming offered by us</p>
                    </div>
                  </div>
                </div>
                <div className="mt-40">
                  <a href="#" className="theme-btn">
                    Start Listening<i className="fas fa-circle-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-img-wrap">
                <div
                  className="choose-img wow fadeInRight"
                  data-wow-delay=".25s"
                >
                  <img src="assets/img/choose/01.jpg" alt="" />
                </div>
                <div className="choose-img-shape">
                  <img src="assets/img/shape/03.png" alt="" />
                </div>
                <div
                  className="choose-img-content wow fadeInUp"
                  data-wow-delay=".50s"
                >
                  <ul>
                    <li>
                      <i className="fas fa-check-circle"></i> Available On All
                      Platform
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Record Your
                      Episodes
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Listen in Screen
                      off Position
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
