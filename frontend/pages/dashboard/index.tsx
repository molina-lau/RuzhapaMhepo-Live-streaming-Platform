import { useUserState } from "@/stores/user-state";
import UploadPodcasts from "@/subpages/upload_podcast";
import UploadRadio from "@/subpages/upload_radio";
import UploadTimeTable from "@/subpages/upload_time_table";
import { InitUser } from "@/utils/utils";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdRadio } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { MdOutlinePodcasts } from "react-icons/md";
export default function Dashboard() {
  const user = useUserState()
  const [page,setPage] = useState(0)
  const [hasPriviledge, setHasPriviledge] = useState(false)
  useEffect(()=>{
    InitUser()
     if (!user || user.email.trim().length == 0) {
            Router.push("/login")
        }
        if (user.role !== 'admin') {
            setHasPriviledge(false)
            setTimeout(() => {
                Router.push("/login")
            }, 6000)
        } else {
            setHasPriviledge(true)
        }
  },[])
  return (
    <>
      {hasPriviledge && <><nav className="navbar navbar-expand-lg google-ads-header">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/assets/img/logo/logo.png" alt="Ruzha Pamhepo Logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Ruzha PaMhepo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="d-flex justify-center">
          <div className="col-auto col-md-3 col-lg-2 sidebar">
            <div className="d-flex flex-column align-items-start">
              <ul className="nav nav-pills flex-column w-100">
                <li className="nav-item" onClick={()=>setPage(0)}>
                  <a className={`d-flex align-items-center gap-2 nav-link  ${page == 0 ? 'active' : ''}`} href="#">
                   <IoCalendarClear />
                    <span>Upload Time Table</span>
                  </a>
                </li>
                <li className="nav-item"  onClick={()=>setPage(1)}>
                  <a className={`d-flex align-items-center gap-2 nav-link ${page == 1 ? 'active' : ''}`} href="#">
                   <MdOutlinePodcasts />
                    <span>Upload Podcast</span>
                  </a>
                </li>
                <li className="nav-item"  onClick={()=>setPage(2)}>
                  <a className={`d-flex align-items-center gap-2 nav-link ${page == 2 ? 'active' : ''}`} href="#">
                    <IoMdRadio />
                    <span>Upload Radio</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9 col-lg-10"> 
            {page == 0 && <UploadTimeTable/>}
            {page == 1 && <UploadPodcasts/>}
            {page == 2 && <UploadRadio/>}
          </div>
        </div>
      </div></>}
      {!hasPriviledge && <>You have no admin permissions to open this Page , redirecting in seconds</>}
    </>
  );
}
