const getUser = async () => {
  if (!window.isAuth) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch(`${window.apiUrl}/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const { user } = await response.json();

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserBalance = async () => {
  if (!window.isAuth) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch(`${window.apiUrl}/user/balance`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const logOut = async () => {
  try {
    const response = await fetch(`${window.apiUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

document.getElementById("logoutBtn").addEventListener("click", async () => {
  const { message } = await logOut();

  if (message) {
    window.isAuth = false;
    window.user = null;
  }
});

document.getElementById("getUserBtn").addEventListener("click", async () => {
  const user = await getUser();

  console.log("user: ", user);

  const balance = await getUserBalance();

  console.log("balance: ", balance);
});
