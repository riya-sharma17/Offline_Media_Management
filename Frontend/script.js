const API_BASE = "http://localhost:5174";

const uploadForm = document.getElementById("uploadForm");
const videoInput = document.getElementById("videoInput");
const videoList = document.getElementById("videoList");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = videoInput.files[0];
  if (!file) return alert("Select a video");

  const formData = new FormData();
  formData.append("video", file);

  await fetch(`${API_BASE}/api/v1/videos/upload`, {
    method: "POST",
    body: formData,
  });

  videoInput.value = "";
  fetchVideos();
});

async function fetchVideos() {
  videoList.innerHTML = "";

  const res = await fetch(`${API_BASE}/api/v1/videos`);
  const result = await res.json();

  result.data.videos.forEach((v) => {
    const card = document.createElement("div");
    card.className = "video-card";

    const video = document.createElement("video");
    video.src = `${API_BASE}${v.path}`;
    video.controls = true;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "delete-btn";

    delBtn.onclick = async () => {
      await fetch(`${API_BASE}/api/v1/videos/${v._id}`, {
        method: "DELETE",
      });
      fetchVideos();
    };

    card.appendChild(video);
    card.appendChild(delBtn);
    videoList.appendChild(card);
  });
}

fetchVideos();
