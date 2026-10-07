import BreadCrump from "@/components/bread-crump";
import ContactForm from "@/components/contact-form";
import FavouritePodcastsTab from "@/components/fav-podcast-tab";
import FavouriteRadioTab from "@/components/fav-radio-tab";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import { TabContainer } from "@/components/tab-bar";
import { InitUser } from "@/utils/utils";
import React, { useEffect, useState } from "react";

export default function Favourites() {
  const [tab, setTabBar] = useState("radios");
  useEffect(() => {
    InitUser();
  }, []);
  return (
    <>
      <Header page={""} />
      <MainMapper>
        <BreadCrump page={"favourites"} title={"Favourites Tab"} />
        <TabContainer setActiveTab={setTabBar} activeTab={tab} />
        <div className="container">
          {tab === "radios" && <FavouriteRadioTab />}
          {tab === "podcasts" && <FavouritePodcastsTab />}
        </div>
        <ContactForm />
      </MainMapper>
      <Footer />
      <MainPlayer index={2} />
    </>
  );
}
