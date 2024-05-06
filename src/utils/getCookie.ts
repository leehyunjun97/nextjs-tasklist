export function getCookieValue(cookieName: string) {
  const name = `${cookieName}=`;

  if (typeof document === undefined) return;
  const decodedCookie = decodeURIComponent(document.cookie);

  const cookieArray = decodedCookie.split(';');

  const cookie = cookieArray.find((cookieItem) => {
    return cookieItem.trim().startsWith(name);
  });

  if (cookie) {
    return cookie.substring(name.length + 1, cookie.length);
  }
  return null;
}

export function getAccessTokenFromCookie() {
  return getCookieValue('accessToken');
}

export function getRefreshTokenFromCookie() {
  return getCookieValue('refreshToken');
}
