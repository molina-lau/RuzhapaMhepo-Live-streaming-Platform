import { Radio } from "@/types/types";
import { getAllRadios, InitUser, likeRadio, saveUserToLocalStorage } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { DefaultLoader } from "./loader";
import { FaComment, FaHeart, FaThumbsUp } from "react-icons/fa";
import { GlobalExports } from "@/global/informations";
import { showErrorToast, showSuccessToast } from "@/utils/time-ops";
import Router from "next/router";
import { useUserState } from "@/stores/user-state";
import { Toaster } from "react-hot-toast";

export default function RadioGridList() {
  const user = useUserState();
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [radios, setRadios] = useState<Radio[]>([]);
  const [likeloading, setLikeLoading] = useState(false);
  const [likeId, setLikeId] = useState("");

  const init = async (page: number) => {
    setLoading(true);
    const response = await getAllRadios(page);
    if (typeof response !== "string") {
      setNextPage(response.page);
      setRadios(response.radios);
    }
    setLoading(false);
  };
  const placeLike = async (id: string) => {
    if (user.email.length == 0)
      return showErrorToast("Please login in to like");
    setLikeId(id)
    setLikeLoading(true);
    const response = await likeRadio(id);
    setLikeLoading(false);
    setLikeId("")
    if (typeof response == "string") return showErrorToast(response);
    const { payload, message } = response;
    showSuccessToast(message);
    useUserState.setState(payload.user);
    saveUserToLocalStorage(payload.user);
  };
  useEffect(() => {
    InitUser();
    init(1);
  }, []);
  return (
    <>
    <Toaster/>
      <div className="col-lg-9">
        <div className="row g-4">
          {!loading &&
            radios.length > 0 &&
            radios.map((e, i) => (
              <div className="col-md-12 col-lg-6" key={i}>
                <div className="episode-item">
                  <div className="episode-img">
                    <span onClick={() => placeLike(e._id)}>
                      {likeloading && likeId == e._id ? (
                        <DefaultLoader />
                      ) : (
                        <>
                          {Array.isArray(user.podcasts) ? (
                            user.likes.some((obj) => obj._id === e._id) ? (
                              <a href="#" className="episode-favourite">
                                <FaHeart
                                  style={{
                                    color: "red",
                                  }}
                                />
                              </a>
                            ) : (
                              <>
                                {" "}
                                <a href="#" className="episode-favourite">
                                  <i className="far fa-heart"></i>
                                </a>
                              </>
                            )
                          ) : (
                            <>
                              {" "}
                              <a href="#" className="episode-favourite">
                                <i className="far fa-heart"></i>
                              </a>
                            </>
                          )}
                        </>
                      )}
                    </span>
                    <img src={GlobalExports.getImage(e.picture)} alt="" />
                  </div>
                  <div className="episode-content">
                    <h4>
                      <a href="#">{e.radioTitle}</a>
                    </h4>
                    <div className="episode-meta">
                      <ul>
                        <li>
                          <FaThumbsUp /> {e.likes}
                        </li>
                        <li>
                          <FaComment /> {e.comments}
                        </li>
                      </ul>
                    </div>
                    <div className="episode-bottom">
                      <div className="episode-host">
                        <h6>
                          <i className="far fa-user-tie-hair"></i> {e.radioFM}
                        </h6>
                      </div>
                      <div className="episode-player">
                        <button
                          type="button"
                          className="player-btn amplitude-play-pause"
                          data-song-add="8"
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
          {loading && <DefaultLoader />}
          {!loading && radios.length === 0 && (
            <>No radio stations uploaded yet</>
          )}
        </div>
        <div className="pagination-area mt-50">
          <div aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className="page-item"
                onClick={() => {
                  if (nextPage < 2) return showErrorToast("cant go back");
                  init(nextPage - 2);
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
                  <li className="page-item" onClick={() => init(1)}>
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
              <li className="page-item" onClick={() => init(nextPage)}>
                <a className="page-link" href="#">
                  {nextPage}
                </a>
              </li>
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
              <li className="page-item" onClick={() => init(nextPage + 8)}>
                <a className="page-link" href="#">
                  {nextPage + 8}
                </a>
              </li>
              <li
                className="page-item"
                onClick={() => {
                  init(nextPage);
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
    </>
  );
}
