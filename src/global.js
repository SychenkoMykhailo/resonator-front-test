import { apiUrl } from "./constants";

const checkAuth = async () => {
  try {
    const response = await fetch(`${apiUrl}/check-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const { authenticated } = await response.json();

    console.log({ authenticated });
    window.isAuth = authenticated;
  } catch (error) {
    console.error(error);
    window.isAuth = false;
  }
};

checkAuth();
