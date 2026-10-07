import { ReactNode } from "react";
import { CiViewTimeline } from "react-icons/ci";
import { HiOutlineRadio } from "react-icons/hi2";
import { PiApplePodcastsLogoLight } from "react-icons/pi";

export const NavMenu: { title: string, icon: ReactNode, page: number }[] = [
    {
        title: "Upload TimeTable",
        icon: <CiViewTimeline />,
        page: 0
    },
    {
        title: "Upload Podcaster",
        icon: <PiApplePodcastsLogoLight />,
        page: 1
    },
    {
        title: "Upload Radio",
        icon: <HiOutlineRadio />,
        page: 2
    },

]