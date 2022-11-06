import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContentForGoal } from "../../redux/slices/goalSlice";

const PersonalizedContent = ({ goalId }) => {
  const dispatch = useDispatch();
  const goalContents = useSelector((state) => state?.goal?.goalContents);

  useEffect(() => {
    if (goalId) {
      dispatch(getContentForGoal({ goalId }));
    }
  }, [goalId]);

  return <div className="personalizedContent"></div>;
};

export default PersonalizedContent;
