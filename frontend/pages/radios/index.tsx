import BreadCrump from "@/components/bread-crump";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import RadioGridList from "@/components/radio-grid-list";
import { useThemeMode } from "@/stores/user-state";
import Router from "next/router";
import React, { useState } from "react";

export default function Radios() {
  const [query, setQuery] = useState("");
  const lightMode = useThemeMode();
  return (
    <>
      <Header page={"radio"} />
      <MainMapper>
        <BreadCrump page={"radio"} title={"Radio Stations"} />
        <div
          className={`podcast-area py-100 ${
            lightMode.mode ? "" : "tw:bg-gray-950! tw:text-white!"
          }`}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className={`podcast-sidebar ${
                    lightMode.mode ? "" : "tw:bg-gray-950!"
                  }`}
                >
                  <div className="podcast-widget">
                    <div className="podcast-search-form">
                      <h4
                        className={`widget-title ${
                          lightMode.mode ? "" : "tw:text-white!"
                        }`}
                      >
                        Search
                      </h4>
                      <form
                        action="#"
                        onSubmit={(e) => {
                          e.preventDefault();
                          Router.push("/search?q=" + query);
                        }}
                      >
                        <div className="form-group">
                          <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-control"
                            placeholder="Search"
                          />
                          <button>
                            <i className="feather-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="podcast-widget">
                    <h4 className="widget-title">Order By</h4>
                    <ul className="checkbox-list">
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="order1"
                          />
                          <label className="form-check-label" htmlFor="order1">
                            Newest
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="order2"
                          />
                          <label className="form-check-label" htmlFor="order2">
                            Popular
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="order3"
                          />
                          <label className="form-check-label" htmlFor="order3">
                            Trending
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <RadioGridList />
            </div>
          </div>
        </div>
      </MainMapper>
      <Footer />
      <MainPlayer index={1} />
    </>
  );
}
