import { useThemeMode } from "@/stores/user-state";
import Link from "next/link";
import React from "react";

export default function FaqsSection() {
  const lightMode = useThemeMode();
  return (
    <>
      <div className="faq-area py-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-right wow fadeInLeft" data-wow-delay=".25s">
                <div className="site-heading mb-3">
                  <span
                    className={`site-title-tagline justify-content-start ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    <i className="fas fa-microphone-lines"></i> Faq&apos;s
                  </span>
                  <h2
                    className={`site-title my-3 ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    General <span>frequently</span> asked questions
                  </h2>
                </div>
                <p className="mb-3">
                  Here are some of the popular questions we came through our
                  clients
                </p>
                <Link href="/about#contact-us" className="theme-btn mt-2">
                  Have Any Question ?
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="accordion wow fadeInUp"
                data-wow-delay=".25s"
                id="accordionExample"
              >
                <div
                  className={`accordion-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900! tw:text-white!"
                  }`}
                >
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className={`accordion-button ${
                        lightMode.mode ? "" : " tw:text-white!"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      What kind of music/content do you play?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We play a variety of genres. We also feature talk shows,
                      podcasts, and other contents focused on trending issues.
                    </div>
                  </div>
                </div>
                <div
                  className={`accordion-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className={`accordion-button collapsed ${
                        lightMode.mode ? "" : " tw:text-white!"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>
                      How do l listen to your radio station?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      You can listen to our radio station online by visiting our
                      website and clicking on the &quot;play/listen live&quot;
                      button.
                    </div>
                  </div>
                </div>
                <div
                  className={`accordion-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className={`accordion-button collapsed ${
                        lightMode.mode ? "" : " tw:text-white!"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>{" "}
                      Can l request a song or dedicate a song to someone?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! You can request or dedicate a song to someone by
                      sending us a message through our website or social media
                      accounts.
                    </div>
                  </div>
                </div>
                <div
                  className={`accordion-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className={`accordion-button collapsed ${
                        lightMode.mode ? "" : " tw:text-white!"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>
                      Can l listen on my mobile app?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes! You can listen via any search engine.
                    </div>
                  </div>
                </div>
                <div
                  className={`accordion-item ${
                    lightMode.mode ? "" : " tw:bg-gray-900!"
                  }`}
                >
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className={`accordion-button collapsed ${
                        lightMode.mode ? "" : " tw:text-white!"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <span>
                        <i className="far fa-question"></i>
                      </span>
                      How can l advertise on your website or radio station?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      We offer a variety of advertising options, including
                      commercial and sponsored content and online ads. Contact
                      our sales team through our website and get started.
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
