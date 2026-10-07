import { GlobalExports } from "@/global/informations";
import { useThemeMode } from "@/stores/user-state";
import React from "react";

export default function ContactForm() {
  const lightMode = useThemeMode();
  return (
    <>
      <div className="contact-area py-100" id="contact-us">
        <div className="container">
          <div className="contact-content">
            <div className="row">
              <div className={`col-md-4`}>
                <div
                  className={`contact-info ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <div className="contact-info-icon">
                    <i className="fal fa-location-dot"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5
                      className={` ${lightMode.mode ? "" : " tw:text-white!"}`}
                    >
                      Address
                    </h5>
                    <p>{GlobalExports.Address}</p>
                  </div>
                </div>
              </div>
              <div className={`col-md-4`}>
                <div
                  className={`contact-info ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <div className="contact-info-icon">
                    <i className="fal fa-phone-arrow-down-left"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5
                      className={` ${lightMode.mode ? "" : " tw:text-white!"}`}
                    >
                      Call Us
                    </h5>
                    <p>{GlobalExports.Phone}</p>
                  </div>
                </div>
              </div>
              <div className={`col-md-4`}>
                <div
                  className={`contact-info ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <div className="contact-info-icon">
                    <i className="fal fa-envelopes"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5
                      className={` ${lightMode.mode ? "" : " tw:text-white!"}`}
                    >
                      Email Us
                    </h5>
                    <p>
                      <p>{GlobalExports.Email}</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`"contact-form-wrap "${
              lightMode.mode ? "" : " tw:bg-gray-950!"
            }`}
          >
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="contact-img">
                  <img src="assets/img/contact/01.png" alt="" />
                </div>
              </div>
              <div className="col-lg-7 align-self-center">
                <div className="contact-form ">
                  <div className="contact-form-header">
                    <h2
                      className={` ${lightMode.mode ? "" : " tw:text-white!"}`}
                    >
                      Get In Touch
                    </h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page randomised
                      words which don&apos;t look even slightly when looking at
                      its layout.{" "}
                    </p>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Your Subject"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        cols={30}
                        rows={5}
                        className="form-control"
                        placeholder="Write Your Message"
                      ></textarea>
                    </div>
                    <button type="submit" className="theme-btn">
                      Send Message <i className="far fa-paper-plane"></i>
                    </button>
                    <div className="col-md-12 mt-3">
                      <div className="form-messege text-success"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
