import { RiHome6Line } from "react-icons/ri";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PiHeartStraight, PiRadio } from "react-icons/pi";
import { useThemeMode } from "@/stores/user-state";

export default function MainPlayer({ index }: { index: number }) {
  const lightMode = useThemeMode();
  const [shown, setShown] = useState(true);
  const [iconHeight, setIconHeight] = useState(80);
  const [floatingHeight, setFloatingHeight] = useState(80);
  const MusicHeaderRef = useRef<HTMLDivElement>(null);
  const IconRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (MusicHeaderRef.current) {
      const height = MusicHeaderRef.current.offsetHeight;
      setFloatingHeight(height);
    }
    if (IconRef.current) {
      const height = IconRef.current.offsetHeight;
      setIconHeight(height);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShown(false);
    }, 1500);
  }, []);
  const navsItems: {
    title: string;
    link: string;
    id: number;
    icon: ReactNode;
  }[] = [
    {
      title: "home",
      link: "/",
      id: 0,
      icon: <RiHome6Line />,
    },
    {
      title: "radio",
      link: "/radios",
      id: 1,
      icon: <PiRadio />,
    },
    {
      title: "favourites",
      link: "/favourites",
      id: 2,
      icon: <PiHeartStraight />,
    },
  ];
  return (
    <>
      <div
        className={`main-player tw:bg-gray-950!`}
        style={{
          zIndex: 999,
        }}
      >
        <div
          ref={MusicHeaderRef}
          className={
            shown
              ? `audio-player`
              : `audio-player show  ${lightMode.mode ? "" : "tw:bg-gray-950!"}`
          }
          style={{
            bottom: shown ? 0 : -floatingHeight + iconHeight - 20,
          }}
        >
          <button
            ref={IconRef}
            type="button"
            className={`audio-player-hide ${
              lightMode.mode ? "" : "tw:bg-gray-950!"
            }`}
            onClick={() => setShown(!shown)}
          >
            {shown ? (
              <FaChevronDown
                className={lightMode.mode ? "" : "tw:text-white!"}
              />
            ) : (
              <FaChevronUp className={lightMode.mode ? "" : "tw:text-white!"} />
            )}
          </button>
          <div className={`${lightMode.mode ? "" : "tw:bg-gray-950!"}`}>
            <ul
              className=""
              style={{
                display: "flex",
                padding: "1.2em",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "2em",
              }}
            >
              {navsItems.map((e, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10spx",
                    borderBottom:
                      index === e.id
                        ? "4px solid var(--theme-color)"
                        : lightMode.mode
                        ? ""
                        : "tw:text-white!",
                  }}
                >
                  <a
                    href={e.link}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color:
                        index === e.id
                          ? "var(--theme-color)"
                          : lightMode.mode
                          ? ""
                          : "white",
                      columnGap: "8px",
                    }}
                  >
                    {e.icon} {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
