import BreadCrump from "@/components/bread-crump";
import CommentSection from "@/components/comment-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { DefaultLoader } from "@/components/loader";
import MainMapper from "@/components/main-mapper";
import MainPlayer from "@/components/main-player";
import RecordButton from "@/components/record-button";
import { AudioRecordingsList } from "@/components/recordings";
import { TabContainerMain } from "@/components/tab-bar";
import TimeTable from "@/components/time-table";
import { useRadioState } from "@/stores/radio-state";
import { useUserState } from "@/stores/user-state";
import { EventsTimeTable, Radio } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/time-ops";
import {
  InitUser,
  getAllRadios,
  getRadio,
  getSortedEvents,
  likeRadio,
  saveUserToLocalStorage,
} from "@/utils/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaComment,
  FaFacebookSquare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { IoLogoWhatsapp, IoShareSocialSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function RadioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useUserState();
  const [activeTab, setActiveTab] = useState("event");
  const radio = useRadioState();
  const [events, setEvents] = useState<EventsTimeTable[]>([]);
  const [selectedDate] = useState(new Date());
  const [radios, setRadios] = useState<Radio[]>([]);
  useEffect(() => {
    getRadios();
    InitUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  const getRadios = async () => {
    const path = router.query.id as string;
    if (path == "" || path == null) return;
    InitUser();
    setLoading(true);
    const response = await getRadio(path);
    if (typeof response == "string") return showErrorToast(response);
    useRadioState.setState(response);
    const events = await getSortedEvents(
      path,
      Math.floor(selectedDate.getTime() / 1000)
    );
    setEvents(events);
    setLoading(false);
    const r2 = await getAllRadios(1);
    if (typeof r2 !== "string") {
      setRadios(r2.radios);
    }
  };

  const { updateLikes } = useRadioState();
  const [liking, setLiking] = useState(false);
  const placeLike = async () => {
    if (user.email.length == 0)
      return showErrorToast("Please login in to like");
    setLiking(true);
    const response = await likeRadio(router.query.id as string);
    setLiking(false);
    if (typeof response == "string") return showErrorToast(response);
    const { payload, message } = response;
    showSuccessToast(message);
    useUserState.setState(payload.user);
    saveUserToLocalStorage(payload.user);
    updateLikes(payload.radioLikes);
  };
  return (
    <>
      <Header page={""} />
      <Toaster />
      <MainMapper>
        <BreadCrump page={radio._id} title={radio.radioTitle} />
        {!loading && radio && radio._id.length > 2 && (
          <>
            <div className="episode-single py-100">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-xl-3">
                    <div className="widget">
                      <h4 className="widget-title">Other Radios</h4>
                      <div className="category-list">
                        {radios.map((e, i) => (
                          <a href={`/radio?id=${e._id}`} key={i}>
                            <i className="far fa-arrow-right"></i>
                            {e.radioTitle}
                            <span>({e.likes})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="widget">
                      <h4 className="widget-title">Popular Tags</h4>
                      <div className="tag-list">
                        <a href="#">Podcast</a>
                        <a href="#">Business</a>
                        <a href="#">Hosts</a>
                        <a href="#">Live</a>
                        <a href="#">Stream</a>
                        <a href="#">Digital</a>
                        <a href="#">Modern</a>
                        <a href="#">Music</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-xl-9">
                    <div className="episode-single-content">
                      <div className="widget">
                        <h4 className="widget-title tw:flex tw:justify-between tw:items-center">
                          {radio.radioTitle}{" "}
                          <span>
                            <div className="dropdown">
                              <div
                                className="tw:cursor-pointer dropdown-toggle tw:flex tw:items-center"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <IoShareSocialSharp />
                              </div>
                              <ul className="dropdown-menu">
                                <li>
                                  <a
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    className="dropdown-item  tw:flex tw:items-center tw:gap-x-3"
                                    href={`https://wa.me/?text=${encodeURIComponent(
                                      radio.path
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <IoLogoWhatsapp /> Whatsapp
                                  </a>
                                </li>
                                <li>
                                  <a
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    className="dropdown-item tw:flex tw:items-center tw:gap-x-3"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                      radio.path
                                    )}&quote=${encodeURIComponent(
                                      radio.radioTitle
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FaFacebookSquare /> Facebook
                                  </a>
                                </li>
                                <li>
                                  <a
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    className="dropdown-item tw:flex tw:items-center tw:gap-x-3"
                                    href={`mailto:?subject=${encodeURIComponent(
                                      radio.radioTitle
                                    )}&body=${encodeURIComponent(radio.path)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <MdEmail /> Email
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </span>
                        </h4>
                        <div className="row d-flex justify-content-center align-items-center">
                          <audio
                            controls
                            className="col-8"
                            src={radio.path}
                          ></audio>
                          <div
                            className={"col-4 d-flex align-items-center gap-4"}
                          >
                            <RecordButton radio={radio} className={""} />
                            <div
                              className={" pointer"}
                              onClick={() => placeLike()}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {liking && <DefaultLoader />}
                              {!liking && (
                                <>
                                  {Array.isArray(user.likes) &&
                                  user.likes.some(
                                    (obj) => obj._id == radio._id
                                  ) ? (
                                    <FaHeart
                                      style={{
                                        color: "red",
                                      }}
                                    />
                                  ) : (
                                    <FaRegHeart />
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="col-12 d-flex gap-4 justify-content-center">
                            <div className="d-flex gap-2 align-items-center">
                              <FaHeart /> {radio.likes}
                            </div>
                            <div className="d-flex gap-2 align-items-center">
                              <FaComment /> {radio.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="widget">
                        <h4 className="widget-title">{radio.radioTitle}</h4>
                        <TabContainerMain
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                        {activeTab == "event" && <TimeTable events={events} />}
                        {activeTab == "comments" && <CommentSection />}
                        {activeTab == "recordings" && (
                          <AudioRecordingsList r={radio} />
                        )}
                      </div>
                      <div className="episode-single-info">
                        <h3 className="title">{radio.radioTitle}</h3>
                        <p className="mb-20">{radio.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {loading && (
          <>
            <DefaultLoader />
          </>
        )}
        {!loading && (!radio || radio._id.trim().length == 0) && (
          <>The radio station with the given id was not found!</>
        )}
      </MainMapper>
      <Footer />
      <MainPlayer index={-1} />
    </>
  );
}
