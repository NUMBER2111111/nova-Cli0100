// GitHub login with Firebase Auth
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const provider = new GithubAuthProvider();
const auth = getAuth();

export function githubLogin() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // User info: result.user
      // GitHub access token: result._tokenResponse.oauthAccessToken
      return result;
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
    });
}
