const generateLoginURL = () => {
  const baseURL = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  baseURL.searchParams.append(
    "client_id",
    "715521523586-mavq0ndfstkgoopr23tqvbh421d8irio.apps.googleusercontent.com"
  );
  baseURL.searchParams.append(
    "scope",
    "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
  );
  baseURL.searchParams.append("redirect_uri", "http://localhost:5173/token/");
  baseURL.searchParams.append("response_type", "token");

  return baseURL.href;
};

export default generateLoginURL;
