import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
const TOKEN_VALUE = "rogin-test-token";

export function getAccessToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setAccessToken() {
  Cookies.set(TOKEN_KEY, TOKEN_VALUE, { path: "/" });
}

export function removeAccessToken() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
} 