export function getCookieValue(cookieName: string) {
  const name = `${cookieName}=`;
  // console.log(document);
  if (typeof window === undefined) return;
  const decodedCookie = decodeURIComponent(window.document.cookie);

  console.log('디코딩된쿠키: ', decodedCookie);

  const cookieArray = decodedCookie.split(';');

  const cookie = cookieArray.find((cookieItem) => {
    return cookieItem.trim().startsWith(name);
  });

  if (cookie) {
    return cookie.substring(name.length, cookie.length);
  }
  return null;
}

export function getAccessTokenFromCookie() {
  return getCookieValue('accessToken');
}

export function getRefreshTokenFromCookie() {
  return getCookieValue('refreshToken');
}
