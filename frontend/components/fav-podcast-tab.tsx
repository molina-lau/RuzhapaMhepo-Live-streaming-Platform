import { GlobalExports } from "@/global/informations";
import { useUserState } from "@/stores/user-state";
import Router from "next/router";
import React from "react";

export default function FavouritePodcastsTab() {
  const user = useUserState();
  return (
    <div className="container">
      <div className="col-lg-9">
        <div className="row g-4">
          {Array.isArray(user.podcasts) &&
            user.podcasts.length > 0 &&
            user.podcasts.map((e, i) => (
              <div className="col-md-12" key={i}>
                <div className="episode-item">
                  <div className="episode-img">
                    <img src={GlobalExports.getImage(e.picture)} alt="" />
                  </div>
                  <div className="episode-content">
                    <h4>
                      <a href="#">{e.title}</a>
                    </h4>
                    <p>
                      {e.description && e.description.length > 200
                        ? e.description.substring(0, 200) + "..."
                        : e.description}
                    </p>
                    <div className="episode-bottom">
                      <div className="episode-host">
                        <h6>
                          <i className="far fa-user-tie-hair"></i>
                          {e.website}
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
          {Array.isArray(user.podcasts) && user.podcasts.length === 0 && (
            <>No Favourite Podcats yet</>
          )}
        </div>
      </div>
    </div>
  );
}
