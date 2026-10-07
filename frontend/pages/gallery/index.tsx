import BreadCrump from "@/components/bread-crump";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import GalleryComponent from "@/components/gallery-component";
import Header from "@/components/header";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import React from "react";

export default function GalleryPage() {
  return (
    <>
      <Header page={"gallery"} />
      <MainMapper>
        <BreadCrump page={"gallery"} title={"Our Gallery"} />
        <GalleryComponent />
        <ContactForm />
      </MainMapper>
      <Footer />
      <MainPlayer index={-1} />
    </>
  );
}
