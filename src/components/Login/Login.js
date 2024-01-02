import React from 'react';
import naverButtonImage from '../Login/btnG_완성형.png';
import googleButtonImage from '../Login/google.png';
import './Login.css';

const Login = () => {
  const titleStyle = {
    color: 'var(--primary, #FD7E14)',
    fontFamily: 'Pretendard',
    fontSize: '36px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '44px',
  };

  const subTitleStyle = {
    color: 'var(--Gray-800, #343A40)',
    fontFamily: 'Pretendard',
    fontSize: '36px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '44px',
  };

  const handleNaverLogin = () => {
    window.location.href =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE_PARAM';
  };

  const handleGoogleLogin = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile%20openid&access_type=offline&state=YOUR_STATE_PARAM';
  };

  return (
    <div className="login-box">
      <h2 style={titleStyle}>OTTify</h2>
      <h2 style={subTitleStyle}>와 함께하는 영화 라이프 같이 즐겨볼까요?</h2>
      {/* Social Login Buttons */}
      <div className="social-buttons">
        {/* Naver Login Button */}
        <button className="naver-button" onClick={handleNaverLogin}>
          <img src={naverButtonImage} alt="Naver Button" />
        </button>
        {/* Google Login Button */}
        <button className="google-button" onClick={handleGoogleLogin}>
          <img src={googleButtonImage} alt="Google Button" />
        </button>
      </div>
    </div>
  );
};

export default Login;
