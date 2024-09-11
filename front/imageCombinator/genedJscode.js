const fileInput = document.getElementById("fileInput");
const urlInput = document.getElementById("urlInput");
const dropZone = document.getElementById("dropZone");
const combineButton = document.getElementById("combineButton");
const preview = document.getElementById("preview");
const ctx = preview.getContext("2d");

let images = [];

function handleFiles(files) {
  for (let file of files) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => images.push(img);
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

function handleUrls(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => images.push(img);
    img.src = url;
  });
}


fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  handleFiles(e.dataTransfer.files);
});

combineButton.addEventListener("click", () => {
  const urls = urlInput.value.split("\n").filter((url) => url.trim() !== "");
  handleUrls(urls);

  setTimeout(() => {
    let maxWidth = 0;
    let totalHeight = 0;

    images.forEach((img) => {
      maxWidth = Math.max(maxWidth, img.width);
      totalHeight += img.height;
    });

    preview.width = maxWidth;
    preview.height = totalHeight;

    let y = 0;
    images.forEach((img) => {
      ctx.drawImage(img, 0, y);
      y += img.height;
    });

    images = [];
  }, 1000); // Wait for images to load
});

// Handle pasted images
document.addEventListener("paste", (e) => {
  const items = e.clipboardData.items;
  for (let item of items) {
    if (item.type.indexOf("image") !== -1) {
      const blob = item.getAsFile();
      handleFiles([blob]);
    }
  }
});
