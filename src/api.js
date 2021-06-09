export const ACCESS_TOKEN = "accessToken";
export const API_BASE_URL = "http://localhost:8080/api";
export const STORY_LIST_SIZE = 20;

const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export function getAllStories() {
  return axios.get(API_BASE_URL + "/story");
}

export function createStory(storyData) {
  return axios.post(API_BASE_URL + "/story", { storyData });
}

export function getStoryDetails(id) {
  return axios.get(API_BASE_URL + "/story/" + id);
}

export function updateStory(id, data) {
  /*return request({
    url: API_BASE_URL + "/story/" + id,
    method: "PUT",
    body: JSON.stringify(data),
  });*/
}

export function deleteStory(id) {
  return axios.delete(API_BASE_URL + "/story/" + id);
}

export function getComments(story_id) {
  return axios.get(API_BASE_URL + "/" + story_id + "/comment");
}

export function createComment(story_id, commentData) {
  return (
    axios.post(API_BASE_URL + "/" + story_id + "/comment"), { commentData }
  );
}

export function deleteComment(id) {
  return axios.delete(API_BASE_URL + "/comment/" + id);
}

export function getReplies(comment_id) {
  return axios.get(API_BASE_URL + "/replies/" + comment_id);
}

export function createReply(comment_id, replyData) {
  return axios.post(API_BASE_URL + "/reply/" + comment_id, { replyData });
}

export function deleteReply(id) {
  return axios.delete(API_BASE_URL + "/reply/" + id);
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return axios.get(API_BASE_URL + "/user/myInfos");
}

export function getUserInfo(id) {
  return axios.get(API_BASE_URL + "/user/" + id);
}

export function getCurrentUserStories() {
  return axios.get(API_BASE_URL + "/story/myStories");
}

export function getUserStories(id) {
  return axios.get(API_BASE_URL + "/stories/by-user/" + id);
}

export function login(loginRequest) {
  return axios.post(API_BASE_URL + "/auth/login", { loginRequest });
}

export function signup(signupRequest) {
  return axios.post(API_BASE_URL + "/auth/signup", { signupRequest }, config);
}
