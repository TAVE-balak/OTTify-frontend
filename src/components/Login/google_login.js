import React, { useEffect } from 'react';

const GoogleLogin = () => {
  useEffect(() => {
    const initGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '320729539723-02vbo3s54u3uibeoscrv38jve60pp9e1.apps.googleusercontent.com',
        });
      });
    };

    const onSignIn = (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    };

    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initGoogleSignIn();
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Clean up script when unmounting
      document.body.removeChild(document.querySelector('script[src="https://apis.google.com/js/platform.js"]'));
    };
  }, []);

  return (
    <div>
      {/* Your component's UI */}
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
};

export default GoogleLogin;
