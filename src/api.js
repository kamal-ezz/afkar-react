export const ACCESS_TOKEN = "accessToken";
export const API_BASE_URL = "http://localhost:8080/api";
export const STORY_LIST_SIZE = 20;

const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const autorization = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  },
};

export function getAllStories() {
  return axios.get(API_BASE_URL + "/story", autorization);
}

export function createStory(storyData) {
  return axios.post(API_BASE_URL + "/story", storyData, autorization);
}

export function getStoryDetails(id) {
  return axios.get(API_BASE_URL + "/story/" + id, autorization);
}

export function updateStory(id, data) {
  /*return request({
    url: API_BASE_URL + "/story/" + id,
    method: "PUT",
    body: JSON.stringify(data),
  });*/
}

export function deleteStory(id) {
  return axios.delete(API_BASE_URL + "/story/" + id, autorization);
}

export function getComments(story_id) {
  return axios.get(API_BASE_URL + "/" + story_id + "/comment", autorization);
}

export function createComment(story_id, commentData) {
  return axios.post(
    API_BASE_URL + "/" + story_id + "/comment",
    commentData,
    autorization
  );
}

export function deleteComment(id) {
  return axios.delete(API_BASE_URL + "/comment/" + id, autorization);
}

export function getReplies(comment_id) {
  return axios.get(API_BASE_URL + "/replies/" + comment_id, autorization);
}

export function createReply(comment_id, replyData) {
  return axios.post(
    API_BASE_URL + "/reply/" + comment_id,
    replyData,
    autorization
  );
}

export function deleteReply(id) {
  return axios.delete(API_BASE_URL + "/reply/" + id, autorization);
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return axios.get(API_BASE_URL + "/auth/user/myInfos", autorization);
}

export function getUserInfo(id) {
  return axios.get(API_BASE_URL + "/auth/user/" + id, autorization);
}

export function getCurrentUserStories() {
  return axios.get(API_BASE_URL + "/story/myStories", autorization);
}

export function getUserStories(id) {
  return axios.get(API_BASE_URL + "/stories/by-user/" + id, autorization);
}

export function login(loginRequest) {
  return axios.post(API_BASE_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest) {
  return axios.post(API_BASE_URL + "/auth/signup", signupRequest);
}

export function uploadImage(file) {
  return axios.post(API_BASE_URL + "/auth/upload", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
