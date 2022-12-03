import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContentForGoal } from "../../redux/slices/goalSlice";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArticleIcon from "@mui/icons-material/Article";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import SubtitlesIcon from "@mui/icons-material/Subtitles";

import "../../styles/personalisedContent.scss";

const getIcon = (type) => {
  switch (type) {
    case "Article":
      return <ArticleIcon />;
    case "Video":
      return <OndemandVideoIcon />;
    case "Book":
      return <MenuBookIcon />;
    case "Podcast":
      return <PodcastsIcon />;
    default:
      return <SubtitlesIcon />;
  }
};

const PersonalisedContent = ({ goalId }) => {
  const dispatch = useDispatch();
  const goalContents = useSelector((state) => state?.goal?.goalContents);

  useEffect(() => {
    if (goalId) {
      dispatch(getContentForGoal({ goalId }));
    }
  }, [goalId]);

  return (
    <div className="personalizedContent">
      {!!goalContents?.length && goalContents.length < 5 && (
        <div className="personalizedContent__info">
          Assign more tags to view more content.
        </div>
      )}

      <div className="personalizedContent__wrapper">
        {!!goalContents?.length
          ? goalContents.map((x) => (
              <div key={x?.contentNumber} className="content">
                <div className="content__length">{x?.length}</div>
                <div className="content__icon">
                  {getIcon(x?.learningMethod)}
                </div>
                <div className="content__title">
                  <a href={x?.pcLink || "#"} target="_blank">
                    {x?.title}
                  </a>
                </div>
                <div className="content__author">{x?.author || ""}</div>
                <div className="content__description">{x?.description}</div>
                <div className="content__tag">{x?.tag}</div>
              </div>
            ))
          : "No content yet, coming soon!"}
      </div>
    </div>
  );
};

export default PersonalisedContent;
