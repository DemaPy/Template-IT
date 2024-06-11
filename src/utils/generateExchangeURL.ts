const generateExchangeURL = (code: string) => {
  const baseURL = new URL("https://oauth2.googleapis.com/token");

  baseURL.searchParams.append("client_id", import.meta.env.REACT_APP_CLIENT_ID!);
  baseURL.searchParams.append(
    "client_secret",
    import.meta.env.REACT_APP_CLIENT_SECRET!
  );
  baseURL.searchParams.append("code", code);
  baseURL.searchParams.append(
    "redirect_uri",
    import.meta.env.REACT_APP_REDIRECT_URL!
  );
  baseURL.searchParams.append("grant_type", "authorization_code");

  return baseURL.href;
};

export default generateExchangeURL;
