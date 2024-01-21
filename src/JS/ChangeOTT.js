import React, {useState, useEffect} from 'react';
import { useParams, useLocation  } from 'react-router-dom';
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
  const { state } = useLocation();
  const userId = state?.userId || 0;

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
  }, []);


  const handleToggleOTT = (id, isSelected) => {
    const idAsString = String(id); // 선택된 아이디를 문자열로 변환
  
    if (isSelected) {
      // 선택된 경우, 해당 아이디를 myOTTArray에 추가
      setMyOTTArray((prevArray) => {
        const newArray = [...prevArray, idAsString];
        console.log('New myOTTArray:', newArray); // 추가된 로그
        return newArray;
      });
    } else {
      // 선택이 해제된 경우, 해당 아이디를 myOTTArray에서 제거
      setMyOTTArray((prevArray) => {
        const newArray = prevArray.filter((itemId) => itemId !== idAsString);
        console.log('New myOTTArray:', newArray); // 추가된 로그
        return newArray;
      });
    }
  };
  

  useEffect(()=>{
    const storedUpdatedOTT = sessionStorage.getItem('updatedOTT');
    if (storedUpdatedOTT){
      setMyOTTArray(JSON.parse(storedUpdatedOTT))
    }
  }, []);

  const handleApplyChanges = async () => {
    try {
      // myOTTArray의 문자열을 정수로 변환하여 ottList에 넣기
      const updateRequestDto = {
        ottList: myOTTArray.map(Number), // myOTTArray의 각 원소를 정수로 변환
      };

      const updatedOTTData = await updateOTT(updateRequestDto, userId);
      sessionStorage.setItem('updatedOTT', JSON.stringify(updateRequestDto.ottList.map(String)));
      console.log("updated successfully", updatedOTTData);
      setMyOTTArray(updateRequestDto.ottList.map(String));

      // 성공적으로 API 호출되면 메시지 출력
      console.log('Changes applied successfully!');
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

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
            onToggleOTT={handleToggleOTT}
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

      <button className="apply_button" onClick={handleApplyChanges}>적용</button>
    </div>
  );
};

export default ChangeOTT;