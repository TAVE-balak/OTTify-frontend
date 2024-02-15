import axios from 'axios';

const Wonapi = axios.create({
  baseURL: 'http://52.79.200.90:8080'
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const fetchUserProfile = async () => {
  // const accessToken = getAccessToken();
  const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODA0MTQyNCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.Yxt6xAoHXvIoNdpGotmSP-uJVOxWRktSrqFIvR5PCxEaADYzvZHnzrWkTwq4fJP25_EsKN7rnTDazKyc_zKdiQ"
  try {
    const response = await Wonapi.get(`/api/v1/users/`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyWrite = async () => {
  // const accessToken = getAccessToken();
  const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODA0MTQyNCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.Yxt6xAoHXvIoNdpGotmSP-uJVOxWRktSrqFIvR5PCxEaADYzvZHnzrWkTwq4fJP25_EsKN7rnTDazKyc_zKdiQ"
  try {
    const response = await Wonapi.get(`/api/v1/users/reviews`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
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

const fetchSavedGenre = async () => {
  try {
    const response = await Wonapi.get(`/api/v1/show/saved/genre`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const update1stGenre = async (updateRequestDto, userId) => {
  try {
    const response = await Wonapi.patch(`/api/v1/users/${userId}/1stGenre`, updateRequestDto);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const update2ndGenre = async (updateRequestDto, userId) => {
  try {
    const response = await Wonapi.patch(`/api/v1/users/${userId}/2ndGenre`, updateRequestDto);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const updateMyProfile = async (formData, userId) => {
  try {
    const response = await Wonapi.patch(`/api/v1/users/${userId}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchSavedOTT = async () => {
  try {
    const response = await Wonapi.get(`/api/v1/saved/ott`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const updateOTT = async (updateRequestDto, userId) => {
  try {
    const response = await Wonapi.patch(`/api/v1/users/${userId}/otts`, updateRequestDto);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchTotalDiscussion = async () => {
  try {
    const response = await Wonapi.get(`/api/v1/discussion/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchProgramDiscussion = async (programId) => {
  try {
    const response = await Wonapi.get(`/api/v1/discussion/program`, {
      params: { programId: programId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
    throw error;
  }
};

const createDiscussionSubject = async (formData) => {
  const accessToken = getAccessToken();
  try {
    const response = await Wonapi.post('/api/v1/discussion/subject', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const editDiscussionSubject = async (formData) => {
  const accessToken = getAccessToken();
  try {
    const response = await Wonapi.put('/api/v1/discussion/subject', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error);
    throw error;
  }
};

const deleteDiscussionSubject = async (subjectId) => {
  const accessToken = getAccessToken();
  try {
    const response = await Wonapi.delete(`/api/v1/discussion/subject/${subjectId}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error);
    throw error;
  }
};

const fetchDiscussionEach = async (subjectId) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.get(`/api/v1/discussion/${subjectId}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error);
    throw error;
  }
};

const createDiscussionComment = async (replyCommentCreateDTO ) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.post('/api/v1/discussion/comment', replyCommentCreateDTO , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const editDiscussionComment = async (replyCommentCreateDTO ) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.put('/api/v1/discussion/comment', replyCommentCreateDTO , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const deleteDiscussionComment = async (subjectId, commentId) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.delete(`/api/v1/discussion/comment/${subjectId}/${commentId}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const createDiscussionReComment = async (replyRecommentCreateDTO ) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.post('/api/v1/discussion/recomment', replyRecommentCreateDTO , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const editDiscussionReComment = async (replyRecommentCreateDTO ) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.put('/api/v1/discussion/recomment', replyRecommentCreateDTO , {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating discussion subject:', error.response);
    throw error;
  }
};

const deleteDiscussionReComment = async (recommentId) => {
  const accessToken = getAccessToken();
  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNzgyMDQ5MCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-eNJWvyroRfBZed-ElxjekaLfEzJRyDfPTjmHie5S2gl7EScxHXb3e3OYPWqpIlXksd60bizFRooXEh0r3FbJA"
  try {
    const response = await Wonapi.delete(`/api/v1/discussion/recomment/${recommentId}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting discussion recomment:', error.response);
    throw error;
  }
};

export { Wonapi, fetchUserProfile, fetchMyWrite, fetchMyFavorite, fetchMyHost, fetchMyParticipate,
  fetchSavedGenre, update1stGenre, update2ndGenre, updateMyProfile, fetchSavedOTT, updateOTT,
  fetchTotalDiscussion, fetchProgramDiscussion, 
  createDiscussionSubject, editDiscussionSubject, deleteDiscussionSubject, fetchDiscussionEach,
  createDiscussionComment, editDiscussionComment, deleteDiscussionComment,
  createDiscussionReComment, editDiscussionReComment, deleteDiscussionReComment};