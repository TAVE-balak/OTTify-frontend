import axios from 'axios';

const Wonapi = axios.create({
  baseURL: 'http://52.79.200.90:8080', 
});

const fetchUserProfile = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyWrite = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyFavorite = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/likedReviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyHost = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/discussion/hosting`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyParticipate = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/discussion/participating`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};


export { Wonapi, fetchUserProfile, fetchMyWrite, fetchMyFavorite, fetchMyHost, fetchMyParticipate};
