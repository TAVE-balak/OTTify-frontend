import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import '../CSS/ChangeOTT.css'

import { fetchSavedOTT, updateOTT } from './WonAPI';

import PickOTTColor from './PickOTTColor';
import close_gray from '../img/close_gray.png';

// ChangeOTT 컴포넌트
const ChangeOTT = () => {
  const [resetStyles, setResetStyles] = useState(false);
  const [ottPick, setOTTPick] = useState([]);
  const [myOTTArray, setMyOTTArray] = useState([]);
  const { myOTTList } = useParams();

  const handleAllDelete = () => {
    setResetStyles(!resetStyles);
  };

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

         // myOTTList가 존재하면 배열로 변환하여 상태 업데이트
        setMyOTTArray(myOTTList?.split(','));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [myOTTList]);

  // myOTTArray 상태 업데이트 이후에 작업 수행
  useEffect(() => {
    console.log(myOTTArray);
  }, [myOTTArray]);

  return (
    <div className="change_ott">
      <div className="ott_title">
        <h1>구독 중인 <span>OTT</span>를 선택해주세요</h1>
      </div>
      <div className="choose_ott">
        {ottPick?.data?.ottList.map((ott) => (
          <PickOTTColor
            key = {ott.id}
            id={String(ott.id)}
            className="ott_pick_logo"
            resetStyles={resetStyles}
            myOTTArray={myOTTArray} // 배열 형태로 전달
          >
            <img src={ott.subscribeLogoPath} className="logo_img" alt="OTT Logo" />
            <span className="logo_name">{ott.name}</span>
          </PickOTTColor>
        ))}
      </div>

      <button className="all_delete" onClick={handleAllDelete}>
        <img src={close_gray} className="delete_close" alt="Close Icon" />
        <span className="delete_word">전체 취소하기</span>
      </button>

      <button className="apply_button">적용</button>
    </div>
  );
};

export default ChangeOTT;