import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "../CSS/ChangeOTT.css";
import { fetchSavedOTT } from "../JS/WonAPI";
import PickOTTColor from "../JS/PickOTTColor";
import close_gray from "../img/close_gray.png";

// ChooseOTT 컴포넌트
const ChooseOTT = () => {
  const [resetStyles, setResetStyles] = useState(false);
  const [ottPick, setOTTPick] = useState([]);
  const [myOTTArray, setMyOTTArray] = useState([]);
  const { myOTTList } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedOTT = sessionStorage.getItem(`ottPick`);
        let fetchedOTTData;
        if (storedOTT) {
          fetchedOTTData = JSON.parse(storedOTT);
        } else {
          fetchedOTTData = await fetchSavedOTT();
          sessionStorage.setItem(`ottPick`, JSON.stringify(fetchedOTTData));
        }
        setOTTPick(fetchedOTTData);
        setMyOTTArray(myOTTList?.split(",") || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [myOTTList]);

  const handleAllDelete = () => {
    setMyOTTArray([]);
    setResetStyles(!resetStyles);
  };

  const handleToggleOTT = (id, isSelected) => {
    const idAsString = String(id);
    if (isSelected) {
      setMyOTTArray((prevArray) => [...prevArray, idAsString]);
    } else {
      setMyOTTArray((prevArray) =>
        prevArray.filter((itemId) => itemId !== idAsString)
      );
    }
  };

  const handleApplyChoose = () => {
    // 선택된 OTT를 sessionStorage에 저장하고 /preferences로 이동
    sessionStorage.setItem("selectedOTT", JSON.stringify(myOTTArray));
    navigate("/preferences"); // 'preferences.js'로 가정함
  };

  return (
    <div className="change_ott">
      <div className="ott_title">
        <h1>
          구독 중인 <span>OTT</span>를 선택해 주세요
        </h1>
      </div>
      <div className="choose_ott">
        {ottPick?.data?.ottList.map((ott) => (
          <PickOTTColor
            key={ott.id}
            id={String(ott.id)}
            className="ott_pick_logo"
            resetStyles={resetStyles}
            myOTTArray={myOTTArray}
            onToggleOTT={handleToggleOTT}
          >
            <img
              src={ott.subscribeLogoPath}
              className="logo_img"
              alt="OTT Logo"
            />
            <span className="logo_name">{ott.name}</span>
          </PickOTTColor>
        ))}
      </div>

      <button className="all_delete" onClick={handleAllDelete}>
        <img src={close_gray} className="delete_close" alt="Close Icon" />
        <span className="delete_word">전체 취소하기</span>
      </button>

      <button className="apply_button" onClick={handleApplyChoose}>
        적용
      </button>
    </div>
  );
};

export default ChooseOTT;
