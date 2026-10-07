import { useThemeMode } from "@/stores/user-state";
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
export default function OurTypes() {
  const lightMode = useThemeMode();

  return (
    <>
      <div
        className="platform wow fadeInUp"
        data-wow-delay="1.25s"
        style={{
          position: "relative",
        }}
      >
        <div
          className={`platform-content ${
            lightMode.mode ? "" : "tw:bg-gray-950! tw:text-white!"
          } `}
          style={{
            position: "absolute",
            background: "white",
            zIndex: 200,
            padding: 10,
            top: -50,
          }}
        >
          <h4>Listen To Our Podcast:</h4>
          <ul>
            <li>
              <a
                href="#"
                className={`${lightMode.mode ? "" : " tw:text-white!"}`}
              >
                <div className="platform-item">
                  <MdKeyboardDoubleArrowRight /> Accurate News
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${lightMode.mode ? "" : " tw:text-white!"}`}
              >
                <div className="platform-item">
                  <MdKeyboardDoubleArrowRight /> ZIM Stations
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${lightMode.mode ? "" : " tw:text-white!"}`}
              >
                <div className="platform-item">
                  <MdKeyboardDoubleArrowRight /> Edutainment & Entertainment
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
