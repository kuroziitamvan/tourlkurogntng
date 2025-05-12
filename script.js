async function upload() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert("Pilih gambar dulu!");

  const formData = new FormData();
  formData.append("fileToUpload", file);

  try {
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.text();
    const url = data.trim();

    document.getElementById("preview").innerHTML = `
      <p><a href="${url}" target="_blank">${url}</a></p>
      <img src="${url}" alt="Uploaded Image" />
      <br><br>
      <button onclick="copyLink('${url}')">Salin Link</button>
    `;

    copyLink(url);
  } catch (err) {
    alert("Gagal upload: " + err.message);
  }
}

function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert("Link udah disalin ke clipboard!");
  }).catch(err => {
    alert("Gagal salin link: " + err);
  });
}