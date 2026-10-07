import Link from "next/link";
import React from "react";

export default function BreadCrump({page , title} :{page : string,title : string}) {
  return (
    <>
      <div
        className="site-breadcrumb"
        style={{
          background: "url(/assets/img/breadcrumb/01.jpg)",
        }}
      >
        <div className="container">
          <h2 className="breadcrumb-title">{title}</h2>
          <ul className="breadcrumb-menu">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="active">{page}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
