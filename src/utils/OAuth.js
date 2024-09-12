// src/utils/OAuth.js
const CLIENT_ID = '647d68e7afa94a2fe6555b148a87ad29'; // 실제 REST API 키
const REDIRECT_URI = encodeURIComponent('http://localhost:5173/oauth/callback/kakao');

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
