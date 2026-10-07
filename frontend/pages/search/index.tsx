import BreadCrump from "@/components/bread-crump";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DefaultLoader } from "@/components/loader";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import { GlobalExports } from "@/global/informations";
import { Radio } from "@/types/types";
import { getAllRadiosByQuery } from "@/utils/utils";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [searchQ, setSearchQ] = useState("");
  const [searchTwo, setSearchTwo] = useState("");
  useEffect(() => {
    getResults();
  }, [router.query]);
  const getResults = async () => {
    setLoading(true);
    setSearchQ(router.query.q as string);
    const results = await getAllRadiosByQuery(router.query.q as string);
    setLoading(false);
    if (!results) {
      return;
    }
    return setRadios(results);
  };
  return (
    <>
      <Header page={"search-page"} />
      <MainMapper>
        <BreadCrump page={"search"} title={`Search for ${searchQ}`} />
        {loading && <DefaultLoader />}
        {!loading && (
          <>
            <div className="podcast-area py-100">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="podcast-sidebar">
                      <div className="podcast-widget">
                        <div className="podcast-search-form">
                          <h4 className="widget-title">Search</h4>
                          <form
                            action="#"
                            onSubmit={(e) => {
                              e.preventDefault();
                              Router.push(`/search?q=${searchTwo}`);
                            }}
                          >
                            <div className="form-group">
                              <input
                                type="text"
                                value={searchTwo}
                                className="form-control"
                                placeholder="Search"
                                onChange={(e) => setSearchTwo(e.target.value)}
                              />
                              <button
                                onClick={() => {
                                  Router.push(`/search?q=${searchTwo}`);
                                }}
                              >
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
                              <label
                                className="form-check-label"
                                htmlFor="order1"
                              >
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
                              <label
                                className="form-check-label"
                                htmlFor="order2"
                              >
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
                              <label
                                className="form-check-label"
                                htmlFor="order3"
                              >
                                Trending
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div>
                      Search results for &quot;<span>{searchQ}</span>&quot;
                    </div>
                    {radios.length > 0 &&
                      radios.map((e, i) => (
                        <div className="col-md-12" key={i}>
                          <div className="episode-item">
                            <div className="episode-img">
                              <img
                                src={GlobalExports.getImage(e.picture)}
                                alt=""
                              />
                            </div>
                            <div className="episode-content">
                              <h4>
                                <a href="#">{e.radioTitle}</a>
                              </h4>
                              <p>
                                {e.description.length > 200
                                  ? e.description.substring(0, 200) + "..."
                                  : e.description}
                              </p>
                              <div className="episode-bottom">
                                <div className="episode-host">
                                  <h6>
                                    <i className="far fa-user-tie-hair"></i>
                                    {e.radioTitle}
                                  </h6>
                                </div>
                                <div className="episode-player">
                                  <button
                                    type="button"
                                    className="player-btn amplitude-play-pause"
                                    data-song-add="11"
                                    onClick={() => {
                                      Router.push(`/radio?id=${e._id}`);
                                    }}
                                  >
                                    <i className="fas fa-play"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {radios.length === 0 && (
                      <>No radio stations found for search {searchQ}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MainMapper>
      <Footer />
      <MainPlayer index={-1} />
    </>
  );
}
