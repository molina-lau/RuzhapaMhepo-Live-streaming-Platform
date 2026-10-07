import BreadCrump from "@/components/bread-crump";
import FaqsSection from "@/components/faqs";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MainMapper from "@/components/main-mapper";
import React from "react";

export default function Faqs() {
  return (
    <>
      <Header page={"faqs"} />
      <MainMapper>
        <BreadCrump page={"faqs"} title={"Faqs"} />
        <FaqsSection />
      </MainMapper>
      <Footer />
    </>
  );
}
