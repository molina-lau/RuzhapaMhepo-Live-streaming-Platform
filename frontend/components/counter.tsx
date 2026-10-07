import { GlobalExports } from "@/global/informations";
import React from "react";

export default function Counter() {
  return (
    <>
      <div className="counter-area pt-40 pb-40">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay=".25s">
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon  tw:flex! tw:items-center! tw:justify-center!">
                  <img src="assets/img/icon/podcast.svg" alt="" />
                </div>
                <div className="counter-item">
                  <div className="counter-content">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="80"
                      data-speed="3000"
                    >
                      {GlobalExports.Podcasts}
                    </span>
                    <span className="counter-unit">+</span>
                  </div>
                  <h6 className="title">Total Podcats</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon  tw:flex! tw:items-center! tw:justify-center!">
                  <img src="assets/img/icon/love.svg" alt="" />
                </div>
                <div className="counter-item">
                  <div className="counter-content">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="900"
                      data-speed="3000"
                    >
                      {GlobalExports.Listeners / 1000}
                    </span>
                    <span className="counter-unit">k</span>
                  </div>
                  <h6 className="title">Happy Listener</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon  tw:flex! tw:items-center! tw:justify-center!">
                  <img src="assets/img/icon/rate.svg" alt="" />
                </div>
                <div className="counter-item">
                  <div className="counter-content">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="30"
                      data-speed="3000"
                    >
                      {GlobalExports.RadioStations}
                    </span>
                    <span className="counter-unit">+</span>
                  </div>
                  <h6 className="title">RadioStations</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon  tw:flex! tw:items-center! tw:justify-center!">
                  <img src="assets/img/icon/rate.svg" alt="" />
                </div>
                <div className="counter-item">
                  <div className="counter-content">
                    <span
                      className="counter"
                      data-count="+"
                      data-to="30"
                      data-speed="3000"
                    >
                      1000
                    </span>
                    <span className="counter-unit">+</span>
                  </div>
                  <h6 className="title">Reviews</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
