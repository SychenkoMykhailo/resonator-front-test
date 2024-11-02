import { apiUrl } from "./constants";

document.getElementById("logoutBtn").addEventListener("click", () => {
  fetch(`${apiUrl}/logout`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

document.getElementById("checkAuthBtn").addEventListener("click", () => {
  fetch(`${apiUrl}/check-auth`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
