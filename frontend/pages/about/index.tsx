import AboutUs from "@/components/about-us";
import BreadCrump from "@/components/bread-crump";
import ContactForm from "@/components/contact-form";
import Counter from "@/components/counter";
import FaqsSection from "@/components/faqs";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import Team from "@/components/team";
import WhyChooseUs from "@/components/why-choose-us";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Header page={"about"} />
      <MainMapper>
        <BreadCrump page={"about"} title={"About Us"} />
        <AboutUs />
        <Counter />
        <WhyChooseUs />
        <Team />
        <FaqsSection />
        <ContactForm />
      </MainMapper>
      <Footer />
      <MainPlayer index={-1} />
    </>
  );
}
