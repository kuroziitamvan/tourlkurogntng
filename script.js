async function upload() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert("Pilih gambar dulu!");
    return;
  }

  const formData = new FormData();
  formData.append("fileToUpload", file);

  try {
    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.text();
    
    if (data.includes('https://')) {
      const url = data.trim();
      document.getElementById("preview").innerHTML = `
        <p><a href="${url}" target="_blank">${url}</a></p>
        <img src="${url}" alt="Uploaded Image" />
        <br><br>
        <button onclick="copyLink('${url}')">Salin Link</button>
      `;
      copyLink(url);
    } else {
      alert("Gagal upload gambar! Coba lagi.");
    }
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
