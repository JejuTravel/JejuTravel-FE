// src/utils/OAuth.js
const CLIENT_ID = ''; // 실제 REST API 키
const REDIRECT_URI = encodeURIComponent('redirect_uri'); // 리다이렉트 URI

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
