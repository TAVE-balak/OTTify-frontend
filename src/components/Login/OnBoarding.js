import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();

  const accessToken = new URL(window.location.href).searchParams.get(
    "accessToken"
  );
  const refreshToken = new URL(window.location.href).searchParams.get(
    "refreshToken"
  );
  const userId = new URL(window.location.href).searchParams.get("userId");
  console.log(accessToken);
  console.log(refreshToken);
  console.log(userId);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userId", userId);

  useEffect(() => {
    // 경고를 피하기 위해 useEffect 내에서 navigate 호출
    navigate("/choose-ott");
  }, [navigate]);
};

export default OnBoarding;
