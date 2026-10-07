import React, { useEffect, useState } from "react";
import { Radio } from "@/types/types";
import { getAllRadios, InitUser } from "@/utils/utils";
import { GlobalExports } from "@/global/informations";
import { DefaultLoader } from "./loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useThemeMode } from "@/stores/user-state";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function RadioList() {
  const [loading, setLoading] = useState(false);
  const [radios, setRadios] = useState<Radio[]>([]);
  const lightMode = useThemeMode();
  const init = async (page: number) => {
    setLoading(true);
    const response = await getAllRadios(page);
    if (typeof response !== "string") {
      setRadios(response.radios);
    }
    setLoading(false);
  };

  useEffect(() => {
    InitUser();
    init(1);
  }, []);
  return (
    <>
      <div className="show-area bg py-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div
                className="site-heading-inline wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div>
                  <span
                    className={`site-title-tagline ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    <i className="fas fa-microphone-lines"></i> Our Radios
                  </span>
                  <h2
                    className={`site-title ${
                      lightMode.mode ? "" : " tw:text-white!"
                    }`}
                  >
                    Most Popular Radios
                  </h2>
                </div>
                <Link href="/radios" className="theme-btn">
                  View All<i className="fas fa-circle-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <Carousel
            autoPlay
            ssr={true}
            transitionDuration={1000}
            infinite={true}
            autoPlaySpeed={500}
            itemClass="carousel-item-padding-40-px"
            responsive={responsive}
            className="show-slider"
          >
            {!loading &&
              Array.isArray(radios) &&
              radios.length > 0 &&
              radios.map((e, i) => (
                <div className="show-item m-3" key={i}>
                  <div className="show-img">
                    <a href="#" className="show-favourite">
                      <i className="far fa-heart"></i>
                    </a>
                    <img
                      src={GlobalExports.getImage(e.picture)}
                      alt=""
                      style={{
                        width: "120px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="show-content">
                    <h4>
                      <a href="#">{e.radioTitle}</a>
                    </h4>
                    <p>
                      {e.description.length > 200
                        ? e.description.substring(0, 200)
                        : e.description}
                    </p>
                  </div>
                  <div className="show-bottom">
                    <div className="show-host">
                      <div className="host-img">
                        <img src={GlobalExports.getImage(e.picture)} alt="" />
                      </div>
                      <div className="host-content">
                        <h6>{e.radioFM}</h6>
                        <p>{e.likes} likes</p>
                      </div>
                    </div>
                    <div className="show-player">
                      <button
                        type="button"
                        className="player-btn amplitude-play-pause"
                        data-song-add="0"
                      >
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {loading && (
              <div className="w-100 d-flex justify-content-center">
                <DefaultLoader />
              </div>
            )}
            {!loading && (!Array.isArray(radios) || radios.length == 0) && (
              <div className="w-100 d-flex justify-content-center">
                No radio stations Found
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </>
  );
}
