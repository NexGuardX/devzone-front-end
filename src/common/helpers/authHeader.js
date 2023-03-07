// get accessToken & userId in the localstorage to make the header of the requests

function authHeader() {
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  const userId = localStorage.getItem('userId');
  if (userToken && userId) {
    return { Authorization: `Bearer ${userToken}` };
  }
  return {};
}
export default authHeader;
