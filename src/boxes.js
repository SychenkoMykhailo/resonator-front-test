const createBoxButtonEl = document.getElementById("createBox");

const boxesContainerEl = document.getElementById("boxesContainer");

const boxEndpoint = "/box";

const getAllBoxes = async () => {
  try {
    const response = await fetch(
      `${window.apiUrl}${boxEndpoint}/get-all-boxes`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      }
    );

    const data = await response.json();

    return { boxes: data?.data, total: data?.total };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getOneBox = async (boxId) => {
  try {
    const response = await fetch(`${window.apiUrl}${boxEndpoint}?id=${boxId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createBox = async (boxName) => {
  try {
    const response = await fetch(`${window.apiUrl}${boxEndpoint}/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
      body: JSON.stringify({ boxName }),
    });

    const data = await response.json();

    return data?.newBox;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteBox = async (boxId) => {
  try {
    const response = await fetch(`${window.apiUrl}${boxEndpoint}?id=${boxId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    });

    const data = await response.json();

    return !!data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createBoxElement = ({
  uid,
  name,
  filesIds,
  size,
  createdAt,
  boxTransactionHash,
  type,
}) => {
  const boxEl = document.createElement("div");
  boxEl.innerHTML = `
      <h1>Box ${uid}</h1>
      <p>Name: ${name}</p>
      <p>Files: ${filesIds}</p>
      <p>Size: ${size}</p>
      <p>Created At: ${createdAt}</p>
      <p>Box Transaction Hash: ${boxTransactionHash}</p>
      <p>Box Type: ${type}</p>
    `;

  const deleteBoxButtonEl = document.createElement("button");
  deleteBoxButtonEl.innerHTML = "Delete Box";
  deleteBoxButtonEl.addEventListener("click", async () => {
    const isDeleted = await deleteBox(uid);

    if (!isDeleted) {
      alert("Failed to delete box");
      return;
    }

    boxEl.remove();
  });

  const getBoxButtonEl = document.createElement("button");
  getBoxButtonEl.innerHTML = "Get and log box data";
  getBoxButtonEl.addEventListener("click", async () => {
    const box = await getOneBox(uid);

    console.log(box);
  });

  boxEl.appendChild(deleteBoxButtonEl);

  return boxEl;
};

const getAndRenderAllBoxes = async () => {
  const { boxes, total } = await getAllBoxes();

  if (!boxes) return;

  boxes.forEach((box) => {
    const boxEl = createBoxElement(box);

    boxesContainerEl.appendChild(boxEl);
  });
};

getAndRenderAllBoxes();

createBoxButtonEl.addEventListener("click", async () => {
  const boxName = prompt("Enter box name");

  const newBox = await createBox(boxName);

  const boxEl = createBoxElement(newBox);

  boxesContainerEl.appendChild(boxEl);
});
