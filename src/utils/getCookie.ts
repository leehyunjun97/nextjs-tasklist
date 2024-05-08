export function getCookieValue(cookieName: string) {
  const name = `${cookieName}=`;

  if (typeof document === undefined) return;
  const decodedCookie = decodeURIComponent(document.cookie);

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

export function deleteCookie(cookieName: string) {
  document.cookie =
    cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
