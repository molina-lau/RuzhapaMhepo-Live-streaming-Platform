import React from "react";

export default function Features() {
  return (
    <>
      <div className="feature-area pt-80">
        <div className="container">
          <div className="feature-wrapper">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item wow fadeInUp"
                  data-wow-delay=".25s"
                >
                  <span className="count">01</span>
                  <div className="feature-icon tw:flex! tw:justify-center!">
                    <img src="assets/img/icon/podcast-1.svg" alt="" />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">On Time Live Podcast</h4>
                    <p>
                      Tune in to our live podcast where we discuss the latest
                      industry trends, behind-the-scenes insights, current
                      events etc . Join us for real-time conversations, expert
                      interviews, and the opportunity to engage directly with
                      our hosts
                    </p>
                  </div>
                  <div className="feature-shape">
                    <img src="assets/img/icon/podcast-1.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item active wow fadeInDown"
                  data-wow-delay=".25s"
                >
                  <span className="count">02</span>
                  <div className="feature-icon tw:flex! tw:justify-center!">
                    <img src="assets/img/icon/podcast.svg" alt="" />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Best Sound Quality</h4>
                    <p>
                      Immerse yourself in high-fidelity audio. We prioritize
                      sound quality to make sure every word and sound effect is
                      delivered with richness and clarity, creating a truly
                      enjoyable and engaging listening experience for you.
                    </p>
                  </div>
                  <div className="feature-shape">
                    <img src="assets/img/icon/podcast.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div
                  className="feature-item wow fadeInUp"
                  data-wow-delay=".25s"
                >
                  <span className="count">03</span>
                  <div className="feature-icon tw:flex! tw:justify-center!">
                    <img src="assets/img/icon/host.svg" alt="" />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Most Popular Hosts</h4>
                    <p>
                      Join the many who tune in specifically for our beloved
                      hosts! Their charisma, wit, and ability to connect with
                      listeners create a warm and inviting atmosphere.
                      You&apos;ll feel like you&apos;re part of the conversation
                      with every episode
                    </p>
                  </div>
                  <div className="feature-shape">
                    <img src="assets/img/icon/host.svg" alt="" />
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
