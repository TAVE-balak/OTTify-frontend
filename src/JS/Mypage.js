import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../CSS/Mypage.css";

import {
  fetchUserProfile,
  fetchSavedGenre,
  update1stGenre,
  updateMyProfile,
} from "./WonAPI";

import GradeGraph from "./GradeGraph";
import PickButton from "./PickButton";
import SlidePoster from "./SlidePoster";
import Wonmodal from "./Wonmodal";

import badge from "../img/profile_badge.png";
import arrow from "../img/arrow.png";
import star from "../img/star.png";
import write_review from "../img/write_review.png";
import like_review from "../img/like_review.png";
import my_debate from "../img/my_debate.png";
import par_debate from "../img/par_debate.png";
import change_img from "../img/change_img.png";
import close_gray from "../img/close_gray.png";

const Mypage = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [likeData, setLikeData] = useState([]);
  const [hateData, setHateData] = useState([]);
  const [secondGenres, setSecondGenres] = useState([]);

  // 파일 입력 요소
  const [selectedImage, setSelectedImage] = useState(null);
  const [editImgSrc, setEditImgSrc] = useState(null);
  const fileInput = React.useRef(null);
  //프로필 변경
  const [nickname, setNickname] = useState(
    userProfile ? userProfile.data.nickName : ""
  );

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = (event) => {
    // 파일 선택 시 호출되는 이벤트 핸들러
    const selectedFile = event.target.files[0];

    // 선택된 파일을 상태에 업데이트
    setSelectedImage(selectedFile);

    // 선택된 파일을 미리보기로 표시
    const reader = new FileReader();
    reader.onload = (e) => {
      setEditImgSrc(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const [editNickName, setEditNickName] = useState(userProfile?.data.nickName);
  const [editProfileImage, setEditProfileImage] = useState(
    userProfile?.data.profilePhoto
  );
  useEffect(() => {
    const storedUpdatednick = sessionStorage.getItem("editNickName");
    if (storedUpdatednick) {
      setEditNickName(JSON.parse(storedUpdatednick));
    }

    const storedUpdatedImage = sessionStorage.getItem("editProfileImage");
    if (storedUpdatedImage) {
      setEditProfileImage(JSON.parse(storedUpdatedImage));
    }
  }, []);

  const handleImageNicknameChange = async () => {
    // 서버에 이미지 업로드 요청 등을 수행
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 변경
      formData.append("userId", userId);
      formData.append(
        "nickName",
        nickname !== "" ? nickname : userProfile.data.nickName
      );
      formData.append(
        "profilePhoto",
        selectedImage === null ? "" : selectedImage
      );

      // 서버에 이미지 업로드 요청
      const updatedProfile = await updateMyProfile(formData, userId);
      sessionStorage.setItem("editNickName", JSON.stringify(nickname));
      setEditNickName(nickname);

      sessionStorage.setItem("editProfileImage", JSON.stringify(selectedImage));
      setEditProfileImage(selectedImage);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, genreData] = await Promise.all([
          fetchUserProfile(userId),
          fetchSavedGenre(),
        ]);

        //user profile api
        let storedProfile = sessionStorage.getItem(`userProfile_${userId}`);
        let fetchedProfileData;

        if (storedProfile) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          fetchedProfileData = JSON.parse(storedProfile);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          fetchedProfileData = profileData;
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(
            `userProfile_${userId}`,
            JSON.stringify(fetchedProfileData)
          );
        }
        setUserProfile(fetchedProfileData);

        //second genre api
        let storedGenre = sessionStorage.getItem(`secondGenres`);
        let fetchedGenreData;

        if (storedGenre) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          fetchedGenreData = JSON.parse(storedGenre);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          fetchedGenreData = genreData;
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(
            `secondGenres`,
            JSON.stringify(fetchedGenreData)
          );
        }
        setSecondGenres(fetchedGenreData);

        //좋아요 & 관심없어요 프로그램
        if (profileData) {
          const newlikeData = [];
          for (let i = 0; i < profileData.data.likedProgram.totalCnt; i++) {
            newlikeData.push({
              poster:
                "https://image.tmdb.org/t/p/original" +
                profileData.data.likedProgram.likedProgramList[i].posterPath,
            });
          }
          setLikeData(newlikeData);

          const newhateData = [];
          for (
            let i = 0;
            i < profileData.data.uninterestedProgram.totalCnt;
            i++
          ) {
            newhateData.push({
              poster:
                "https://image.tmdb.org/t/p/original" +
                profileData.data.uninterestedProgram.uninterestedProgramList[i]
                  .posterPath,
            });
          }
          setHateData(newhateData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const [updatedGenre, setUpdatedGenre] = useState(null);
  useEffect(() => {
    // 세션 스토리지에서 값 불러오기
    const storedUpdatedGenre = sessionStorage.getItem("updatedGenre");
    if (storedUpdatedGenre) {
      setUpdatedGenre(JSON.parse(storedUpdatedGenre));
    }
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  const handleGenreChange = async (e) => {
    try {
      const selectedGenreName = e.target.value;
      const selectedGenre = secondGenres.data.genreShowSavedDtos.find(
        (genre) => genre.name === selectedGenreName
      );

      const updatedRequestDto = {
        genreId: selectedGenre.id,
      };

      const updatedData = await update1stGenre(updatedRequestDto, userId);
      console.log(updatedRequestDto, userId);
      console.log("1stGenre updated successfully:", updatedData);

      // 세션 스토리지에 값 저장
      sessionStorage.setItem("updatedGenre", JSON.stringify(updatedRequestDto));

      setUpdatedGenre(updatedRequestDto);
    } catch (error) {
      console.error("Error updating 1stGenre:", error);
    }
  };

  const navigate = useNavigate();
  const goToOTT = () => {
    navigate("/ChangeOTT");
  };
  const goToWrite = () => {
    navigate(`/MyWrite/${userId}`);
  };

  const goToFavorite = () => {
    navigate(`/MyFavorite/${userId}`);
  };

  const goToParticipate = () => {
    navigate(`/MyParticipate/${userId}`);
  };

  const goToHost = () => {
    navigate(`/MyHost/${userId}`);
  };

  //내 리뷰 평점 그래프
  const reviewList = [];
  let reviews = null;

  if (userProfile) {
    for (const key in userProfile.data.ratingList) {
      const reviewCount = userProfile.data.ratingList[key];
      if (reviewCount > 0) {
        for (let i = 0; i < reviewCount; i++) {
          reviewList.push(key);
        }
      }
    }

    for (let i = 0; i < reviewList.length; i++) {
      if (reviewList[i] === "pointFiveCnt") {
        reviewList[i] = 0.5;
      } else if (reviewList[i] === "oneCnt") {
        reviewList[i] = 1.0;
      } else if (reviewList[i] === "oneDotFiveCnt") {
        reviewList[i] = 1.5;
      } else if (reviewList[i] === "twoCnt") {
        reviewList[i] = 2.0;
      } else if (reviewList[i] === "twoDotFiveCnt") {
        reviewList[i] = 2.5;
      } else if (reviewList[i] === "threeCnt") {
        reviewList[i] = 3.0;
      } else if (reviewList[i] === "threeDotFiveCnt") {
        reviewList[i] = 3.5;
      } else if (reviewList[i] === "fourCnt") {
        reviewList[i] = 4.0;
      } else if (reviewList[i] === "fourDotFiveCnt") {
        reviewList[i] = 4.5;
      } else if (reviewList[i] === "fiveCnt") {
        reviewList[i] = 5.0;
      }
    }
  }
  reviews = reviewList.filter((item) => item !== "totalCnt");

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="Mypage">
      {userProfile && secondGenres ? (
        <>
          <div className="my_profile">
            <img
              src={
                selectedImage === null
                  ? userProfile?.data.profilePhoto
                  : URL.createObjectURL(selectedImage)
              }
              className="profile_img"
              alt="profile"
            ></img>
            <div className="profile_bottom">
              <div className="profile_info">
                <div className="info_nickname">
                  <span className="name">
                    {nickname !== ""
                      ? editNickName
                      : userProfile?.data.nickName}
                  </span>
                  {userProfile.data.grade == "GENERAL" ? (
                    <img></img>
                  ) : (
                    <img src={badge} className="badge"></img>
                  )}
                </div>
                <div className="info_email">
                  <span className="email">{userProfile.data.email}</span>
                </div>
                <div className="info_edit">
                  <button className="edit_btn_profile" onClick={openModal}>
                    프로필 변경
                  </button>
                  <Wonmodal open={modalOpen} close={closeModal}>
                    <img
                      src={close_gray}
                      className="modal_close"
                      onClick={closeModal}
                    ></img>
                    <div className="modal_img" onClick={handleButtonClick}>
                      {editImgSrc ? (
                        <img
                          src={editImgSrc}
                          className="edit_img"
                          alt="Selected Image"
                        />
                      ) : (
                        <img
                          src={userProfile.data.profilePhoto}
                          className="edit_img"
                          alt="Default Image"
                        />
                      )}
                      <input
                        type="file"
                        ref={fileInput}
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <img
                        src={change_img}
                        className="change_img"
                        alt="Change Image"
                      />
                    </div>
                    <span className="nickname">닉네임</span>
                    <div className="modal_nickname">
                      <input
                        className="nickname_input"
                        defaultValue={
                          nickname !== ""
                            ? editNickName
                            : userProfile?.data.nickName
                        }
                        onChange={(e) => setNickname(e.target.value)}
                      ></input>
                      <button
                        className="nickname_btn"
                        onClick={(e) => {
                          handleImageNicknameChange(e);
                          closeModal(e);
                        }}
                      >
                        변경
                      </button>
                    </div>
                  </Wonmodal>
                </div>
              </div>

              <div className="profile_ott">
                <div className="ott_subject">
                  <span className="ott_mine">구독 중인 OTT</span>
                  <img
                    src={arrow}
                    className="arrow"
                    onClick={goToOTT}
                    alt="화면 전환 화살표"
                  ></img>
                </div>
                <div className="ott_imgs">
                  {userProfile.data.ott.ottList
                    .slice(0, 3)
                    .map((ott, index) => (
                      <img
                        key={index}
                        src={ott.logoPath}
                        className="ott_logo"
                        alt={`ott_logo_${index}`}
                      />
                    ))}
                  {userProfile.data.ott.ottList.length > 3 && (
                    <span className="ott_more">
                      +{userProfile.data.ott.ottList.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="profile_grade">
                <div className="grade_subject">
                  <span className="grade_mine">내 리뷰 평균 평점</span>
                  <div className="grade_num">
                    <img src={star} className="grade_star"></img>
                    <span className="grade_point">
                      {userProfile.data.averageRating.toFixed(2)}/5
                    </span>
                  </div>
                </div>
                <div className="grade_graph">
                  <GradeGraph reviews={reviews} />
                </div>
              </div>
            </div>
          </div>

          <div className="my_content">
            <div className="content_div">
              <div className="content_subject">
                <span className="content_mine">내 취향 장르</span>
                <select
                  className="content_select"
                  name="genre_1st"
                  onChange={handleGenreChange}
                >
                  <option selected disabled hidden>
                    1순위 장르
                  </option>
                  {secondGenres.data.genreShowSavedDtos.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.name}
                      selected={
                        updatedGenre
                          ? updatedGenre.genreId === genre.id
                          : userProfile.data.firstGenre.name === genre.name
                      }
                    >
                      {genre.name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="content_pick">
                {secondGenres.data.genreShowSavedDtos.map((genre) => (
                  <PickButton
                    key={genre.id}
                    className="pick"
                    genre={genre}
                    userProfileGenres={userProfile.data.secondGenre}
                  >
                    {genre.name}
                  </PickButton>
                ))}
              </div>

              <div className="content_like">
                <span className="like_title">보고싶어요</span>
                <div className="like_posters">
                  <SlidePoster data={likeData} type="favorite" />
                </div>
              </div>

              <div className="content_hate">
                <span className="hate_title">관심없어요</span>
                <div className="hate_posters">
                  <SlidePoster data={hateData} type="hate" />
                </div>
              </div>
            </div>
          </div>

          <div className="my_review">
            <div className="write_review" onClick={goToWrite}>
              <img src={write_review} className="write_img"></img>
              <a className="write_text">작성 리뷰 모아보기</a>
            </div>
            <div className="like_review" onClick={goToFavorite}>
              <img src={like_review} className="like_img"></img>
              <a className="like_text">좋아요한 리뷰 모아보기</a>
            </div>
            <div className="my_debate" onClick={goToHost}>
              <img src={my_debate} className="my_img"></img>
              <a className="my_text">내가 주최한 토론 모아보기</a>
            </div>
            <div className="par_debate" onClick={goToParticipate}>
              <img src={par_debate} className="par_img"></img>
              <a className="par_text">내가 참여한 토론 모아보기</a>
            </div>
          </div>

          <div className="my_out">
            <a className="log_out">로그아웃</a>
          </div>
        </>
      ) : (
        <p> None </p>
      )}
    </div>
  );
};

export default Mypage;
