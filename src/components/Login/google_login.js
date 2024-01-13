import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';
const clientId = "320729539723-02vbo3s54u3uibeoscrv38jve60pp9e1.apps.googleusercontent.com";
const GoogleButton = ({onSocial}) => {
   useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId,
        scope: 'email',
      });
   }
   gapi.load('client:auth2', start);
  },[]);
  const onSuccess = (response) => {
    console.log(response);
  };
  const onFailure = (response) => {
    console.log(response);
  };
return(
  <div>
    <GoogleLogin
    clientid={clientId}
    buttonText = "구글아이디로 로그인"
    onSuccess = {onSuccess}
    onFailure={onFailure}
    />
  </div>
);
    };
    export default GoogleButton;