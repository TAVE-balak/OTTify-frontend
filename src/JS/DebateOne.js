import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DebateList from "./DebateList";
import "../CSS/MyDebate.css";

import { fetchProgramDiscussion } from "./WonAPI";

import back from "../img/back.png";

const DebateOne = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [programData, setProgramData] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출하여 데이터 가져오기
        const programId = location.state?.programId;
        const title = location.state?.title;
        const discussionProgramData = await fetchProgramDiscussion(programId);

        setProgramData(discussionProgramData);
        // setMovieTitle(discussionProgramData.data.list[0]?.programName || "");
        setMovieTitle(title || "");
      } catch (error) {
        console.error("Error fetching Discussion Total:", error);
      }
    };
    fetchData();
  }, []);

  const dummyList = programData
    ? programData.data.list.map((item) => {
        const targetDate = new Date(item.createdAt);
        const currentDate = new Date();
        const timeDiff = currentDate - targetDate;
        // 밀리초를 일로 변환
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        let displayDate;
        if (daysDiff < 30) {
          displayDate = `${daysDiff}일 전`;
        } else if (daysDiff < 365) {
          const monthsDiff = Math.floor(daysDiff / 30);
          displayDate = `${monthsDiff}달 전`;
        } else {
          const yearsDiff = Math.floor(daysDiff / 365);
          displayDate = `${yearsDiff}년 전`;
        }

        return {
          id: item.subjectId,
          movie: item.programName,
          poster: item.imageUrl || "",
          debateTitle: item.title,
          content: item.content,
          created_date: displayDate,
          favorite: item.likeCount,
          comment: item.commentCount,
        };
      })
    : [];

  const goToWrite = () => {
    navigate("/DebateWrite", {
      state: { programId: location.state?.programId },
    });
  };

  return (
    <div className="DebateOne">
      <div className="debateone_page">
        <div className="debateone_title">
          <img
            src={back}
            className="debateone_back"
            alt="뒤로 가기"
            onClick={() => navigate(-1)}
          />
          <h2>{`토론 > ${movieTitle}`}</h2>
          <button className="debate_write" onClick={goToWrite}>
            토론하기
          </button>
        </div>
        <DebateList debateList={dummyList} />
      </div>
    </div>
  );
};

export default DebateOne;
