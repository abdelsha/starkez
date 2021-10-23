import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./StudyHistoryPage.module.css";

function StudyHistoryPage() {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  return (
    <div className={classes.Layouts}>
      <div className={classes.History}>
        <div className={classes.CommonCard}>History</div>
      </div>

      <div className={classes.Recommend}>
        <div className={classes.CommonCard}>
          Recommendation
        </div>
      </div>
      <div className={classes.Status}>
        <div className={classes.CommonCard}>
          Status
        </div>
      </div>
    </div>
  );
}

export default StudyHistoryPage;
