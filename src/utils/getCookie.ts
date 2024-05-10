export function getCookieValue(cookieName: string) {
  const name = `${cookieName}=`;

  if (typeof document === undefined) return;
  const decodedCookie = decodeURIComponent(document.cookie);

  const cookieArray = decodedCookie.split(';');

  let cookie = cookieArray.find((cookieItem) => {
    return cookieItem.trim().startsWith(name);
  });

  if (cookie) {
    if (cookie.charAt(0) === '=') {
      cookie = cookie.slice(1);
    }

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
