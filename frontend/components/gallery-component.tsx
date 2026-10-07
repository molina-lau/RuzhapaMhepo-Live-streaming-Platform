import { useThemeMode } from "@/stores/user-state";
import React from "react";

export default function GalleryComponent() {
  const lightMode = useThemeMode();
  return (
    <>
      <div className="gallery-area py-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="site-heading text-center wow fadeInDown"
                data-wow-delay=".25s"
              >
                <span
                  className={`site-title-tagline ${
                    lightMode.mode ? "" : " tw:text-white!"
                  }`}
                >
                  <i className="fas fa-microphone-lines"></i> Gallery
                </span>
                <h2
                  className={`site-title ${
                    lightMode.mode ? "" : " tw:text-white!"
                  }`}
                >
                  Let&apos;s Check Our Photo <br /> <span>Gallery</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4 popup-gallery">
            <div className="col-md-6">
              <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                <div className="gallery-img">
                  <img src="/assets/img/gallery/01.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/01.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                <div className="gallery-img">
                  <img src="/assets/img/gallery/02.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/02.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="gallery-item wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div className="gallery-img">
                  <img src="/assets/img/gallery/03.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/03.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                <div className="gallery-img">
                  <img src="/assets/img/gallery/04.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/04.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="gallery-item wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div className="gallery-img">
                  <img src="/assets/img/gallery/05.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/05.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                <div className="gallery-img">
                  <img src="/assets/img/gallery/06.jpg" alt="" />
                  <a
                    className="popup-img gallery-link"
                    href="/assets/img/gallery/06.jpg"
                  >
                    <i className="fal fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
