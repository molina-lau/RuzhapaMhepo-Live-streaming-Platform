import AboutUs from "@/components/about-us";
import Counter from "@/components/counter";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import OurTypes from "@/components/our-types";
import RadioList from "@/components/radio-lists";
import Team from "@/components/team";
import WhyChooseUs from "@/components/why-choose-us";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    alert(`${process.env.NEXT_PUBLIC_API_URL}`);
  }, []);

  return (
    <>
      <Header page={"/"} />
      <MainMapper>
        <Hero />
        <OurTypes />
        <Features />
        <AboutUs />
        <Counter />
        <RadioList />
        <WhyChooseUs />
        <Team />
      </MainMapper>
      <Footer />
      <MainPlayer index={0} />
    </>
  );
}
