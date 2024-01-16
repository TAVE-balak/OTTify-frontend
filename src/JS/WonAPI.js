import axios from 'axios';

const Wonapi = axios.create({
  baseURL: 'http://52.79.200.90:8080', 
});

const fetchUserProfile = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyWrite = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/reviews`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyFavorite = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/likedReviews`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyHost = async (userId) => {
  try {
    const response = await Wonapi.get(`/api/v1/users/${userId}/discussion/hosting`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

export { Wonapi, fetchUserProfile, fetchMyWrite, fetchMyFavorite, fetchMyHost};
