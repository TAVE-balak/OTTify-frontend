import axios from 'axios';

const Wonapi = axios.create({
  baseURL: 'http://52.79.200.90:8080'
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const fetchUserProfile = async () => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODg0NDI4NCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.uju19MtWa6QEtdqg7gw15fw7uEjWdcXLwNDull9zFzZTew9gKb1G9maEzXSRycECMdM-ceEysyZkORn1L4nsDQ"
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
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODE5NDk5OCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.raWVcLVGLDeiEzMPY9ryfQekb2aIWGbsNauNp2dZSfnB71AiEl5cWaj3UYW1O7nHR0xL_fl0r_usiCma6qyLUA"
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

const fetchMyFavorite = async () => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODE5NDk5OCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.raWVcLVGLDeiEzMPY9ryfQekb2aIWGbsNauNp2dZSfnB71AiEl5cWaj3UYW1O7nHR0xL_fl0r_usiCma6qyLUA"
  try {
    const response = await Wonapi.get(`/api/v1/users/likedReviews`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyHost = async () => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODE5NDk5OCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.raWVcLVGLDeiEzMPY9ryfQekb2aIWGbsNauNp2dZSfnB71AiEl5cWaj3UYW1O7nHR0xL_fl0r_usiCma6qyLUA"
  try {
    const response = await Wonapi.get(`/api/v1/users/discussion/hosting`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const fetchMyParticipate = async () => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODE5NDk5OCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.raWVcLVGLDeiEzMPY9ryfQekb2aIWGbsNauNp2dZSfnB71AiEl5cWaj3UYW1O7nHR0xL_fl0r_usiCma6qyLUA"
  try {
    const response = await Wonapi.get(`/api/v1/users/discussion/participating`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
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

const update1stGenre = async (updateRequestDto) => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODc1OTk3NCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.-ZOfYcJqHJJbFd08_PTLDgLN-947kcq0XFpAf2-8ZluHWJior2T1jo_xLbXfX72kmdvE2o2LaOOpCJA2d3pYCw"
  try {
    const response = await Wonapi.patch(`/api/v1/users/1stGenre`, updateRequestDto, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

const update2ndGenre = async (updateRequestDTO) => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODg0NDI4NCwiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.uju19MtWa6QEtdqg7gw15fw7uEjWdcXLwNDull9zFzZTew9gKb1G9maEzXSRycECMdM-ceEysyZkORn1L4nsDQ"
  try {
    const response = await Wonapi.patch(`/api/v1/users/2ndGenre`, updateRequestDTO, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};
const updateMyProfile = async (nickName, formData) => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODMzOTIyNywiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.g6ij-K7efrQt_tpCVLji2SPGk78iF4hiUfwTy17FDjeeeVtTzWnibGqeRwVWRkFm28CvpEDofkBCsWZkoBY4hA"
  try {
    const response = await Wonapi.patch(`/api/v1/users/profile?nickName=${nickName}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${accessToken}`
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

const updateOTT = async (updateRequestDto) => {
  const accessToken = getAccessToken();
  //const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODMzOTIyNywiZW1haWwiOiJoeXVuYXdvbjQxN0BnbWFpbC5jb20ifQ.g6ij-K7efrQt_tpCVLji2SPGk78iF4hiUfwTy17FDjeeeVtTzWnibGqeRwVWRkFm28CvpEDofkBCsWZkoBY4hA"
  try {
    const response = await Wonapi.patch(`/api/v1/users/otts`, updateRequestDto, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    });
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