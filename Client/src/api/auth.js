import axiosConf from './axios'; 

export const registerRequest = async (user) => axiosConf.post('/register', user);

export const loginRequest = async (user) => axiosConf.post('/login', user);

export const logoutRequest = async () => axiosConf.post('/logout');

export const verifyTokenRequest = async () => axiosConf.get('/profile');

export const getPostsRequest = async () => axiosConf.get('/posts')

export const createPostRequest = (post) => axiosConf.post('/post', post);

export const getPostRequest = (id) => axiosConf.get(`/post/${id}`);

export const getCommentsRequest = (postId) => axiosConf.get(`/comments/${postId}`);

export const createCommentRequest = (data) => axiosConf.post('/comment', data);

export const deletePostRequest = (id) => axiosConf.delete(`/post/${id}`);

export const updatePostRequest = (id, post) => axiosConf.put(`/post/${id}`, post);