const REST_API_KEY = import.meta.env.VITE_REACT_APP_KAKAO_OAUTH_API_KEY
const REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI

export const Kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?
response_type=code&
client_id=${REST_API_KEY}&
redirect_uri=${REDIRECT_URI}`
