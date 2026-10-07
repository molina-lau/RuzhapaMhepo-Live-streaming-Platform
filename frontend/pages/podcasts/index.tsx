import BreadCrump from "@/components/bread-crump";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DefaultLoader } from "@/components/loader";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import { GlobalExports } from "@/global/informations";
import { useThemeMode, useUserState } from "@/stores/user-state";
import { Podcasts, User } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/time-ops";
import {
  getAllPodcasts,
  InitUser,
  likePodcast,
  saveUserToLocalStorage,
} from "@/utils/utils";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

export default function PodcatsPage() {
  const lightMode = useThemeMode();
  const user = useUserState();
  const router = useRouter();
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [likeloading, setLikeLoading] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [podcastItems, setPodcastsItems] = useState<Podcasts[]>([]);
  const [query, setQuery] = useState("");
  const getPodcasts = async (page: number, query: string) => {
    setLoading(true);
    const response = await getAllPodcasts(page, query);
    setLoading(false);
    if (typeof response != "string") {
      setNextPage(response.page);
      return setPodcastsItems(response.podcasts);
    }
    showErrorToast(response);
  };
  const likeInitiate = async (likeId: string) => {
    setLikeLoading(true);
    setLikeId(likeId);
    const response = await likePodcast(likeId);
    setLikeLoading(false);
    setLikeId("");
    if (typeof response === "string") return showErrorToast(response);
    saveUserToLocalStorage(response.payload.user);
    showSuccessToast(response.message);
    useUserState.setState(response.payload.user as User);
  };
  useEffect(() => {
    InitUser();
    let page = 1;
    try {
      page = parseInt((router.query.page as string) ?? "");
    } catch {}
    if (page < 1) {
      page = 1;
    }
    getPodcasts(page, (router.query.q as string) ?? "");
  }, [router.query]);
  return (
    <>
      <Toaster />
      <Header page={"podcasts"} />
      <MainMapper>
        <BreadCrump page={"podcasts"} title={"Top Podcasts"} />
        <div className="podcast-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className={`podcast-sidebar ${
                    lightMode.mode ? "" : "tw:bg-gray-950!"
                  }`}
                >
                  <div>
                    <div className="podcast-search-form">
                      <h4
                        className={`widget-title ${
                          lightMode.mode ? "" : "tw:text-white!"
                        }`}
                      >
                        Search
                      </h4>
                      <form action="#">
                        <div className="form-group">
                          <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-control"
                            placeholder="Search"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                Router.push(`/podcasts?page=${1}&q=${query}`);
                              }
                            }}
                          />
                          <button
                            onClick={() =>
                              Router.push(`/podcasts?page=${1}&q=${query}`)
                            }
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
              <div className="col-lg-9">
                <div className="episode-list">
                  <div className="row g-4">
                    {!loading &&
                      Array.isArray(podcastItems) &&
                      podcastItems.length > 0 &&
                      podcastItems.map((e, i) => (
                        <div className="col-md-12" key={i}>
                          <div className="episode-item">
                            <div className="episode-img">
                              <span onClick={() => likeInitiate(e._id)}>
                                {likeloading && likeId == e._id ? (
                                  <DefaultLoader />
                                ) : (
                                  <>
                                    {Array.isArray(user.podcasts) ? (
                                      user.podcasts.some(
                                        (obj) => obj._id === e._id
                                      ) ? (
                                        <a
                                          href="#"
                                          className="episode-favourite"
                                        >
                                          <FaHeart
                                            style={{
                                              color: "red",
                                            }}
                                          />
                                        </a>
                                      ) : (
                                        <>
                                          {" "}
                                          <a
                                            href="#"
                                            className="episode-favourite"
                                          >
                                            <i className="far fa-heart"></i>
                                          </a>
                                        </>
                                      )
                                    ) : (
                                      <>
                                        {" "}
                                        <a
                                          href="#"
                                          className="episode-favourite"
                                        >
                                          <i className="far fa-heart"></i>
                                        </a>
                                      </>
                                    )}
                                  </>
                                )}
                              </span>
                              <img
                                src={GlobalExports.getImage(e.picture)}
                                alt=""
                              />
                            </div>
                            <div className="episode-content">
                              <h4>
                                <a href="#">{e.title}</a>
                              </h4>
                              <div className="episode-meta">
                                <ul>
                                  <li>
                                    <i className="far fa-podcast"></i> {e.likes}
                                    likes
                                  </li>
                                </ul>
                              </div>
                              <p>{e.description}</p>
                              <div className="episode-bottom">
                                <div className="episode-host">
                                  <h6>
                                    <i className="far fa-user-tie-hair"></i>
                                    {e.presenter}
                                  </h6>
                                </div>
                                <div className="episode-player">
                                  <button
                                    type="button"
                                    className="player-btn amplitude-play-pause"
                                    data-song-add="11"
                                    onClick={() => {
                                      Router.push(e.website);
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
                    {!loading && podcastItems.length === 0 && (
                      <>No Podcasts to show</>
                    )}
                    {loading && <DefaultLoader />}
                  </div>
                </div>
                <div className="pagination-area mt-50">
                  <div aria-label="Page navigation example">
                    <ul className="pagination">
                      <li
                        className="page-item"
                        onClick={() => {
                          if (nextPage < 2)
                            return showErrorToast("cant go back");
                          Router.push(
                            `/podcasts?page=${nextPage - 1}&q=${query}`
                          );
                        }}
                      >
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">
                            <i className="fas fa-arrow-left"></i>
                          </span>
                        </a>
                      </li>
                      {nextPage > 2 && (
                        <>
                          <li
                            className="page-item"
                            onClick={() =>
                              Router.push(`/podcasts?page=${1}&q=${query}`)
                            }
                          >
                            <a className="page-link" href="#">
                              {1}
                            </a>
                          </li>
                        </>
                      )}
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          {nextPage - 1}
                        </a>
                      </li>
                      <li
                        className="page-item"
                        onClick={() =>
                          Router.push(`/podcasts?page=${nextPage}&q=${query}`)
                        }
                      >
                        <a className="page-link" href="#">
                          {nextPage}
                        </a>
                      </li>
                      <li className="page-item">
                        <span className="page-link">...</span>
                      </li>
                      <li
                        className="page-item"
                        onClick={() =>
                          Router.push(
                            `/podcasts?page=${nextPage + 8}&q=${query}`
                          )
                        }
                      >
                        <a className="page-link" href="#">
                          {nextPage + 8}
                        </a>
                      </li>
                      <li
                        className="page-item"
                        onClick={() => {
                          Router.push(`/podcasts?page=${nextPage}&q=${query}`);
                        }}
                      >
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">
                            <i className="fas fa-arrow-right"></i>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainMapper>
      <Footer />
      <MainPlayer index={-1} />
    </>
  );
}
