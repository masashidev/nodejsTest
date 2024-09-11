const fileInput = document.getElementById("fileInput");
const urlInput = document.getElementById("urlInput");
const dropZone = document.getElementById("dropZone");
const combineButton = document.getElementById("combineButton");
const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");

// simulate image upload


function combineImages(files) {
  // console.log(files);
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = (e) => {
    // console.log(reader.result);
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      preview.width = img.width;
      preview.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      console.log(imageData);
      console.log(img.src);
      const data = imageData.data;
      console.log(data);

      // invert colors
      // for (let i = 0; i < data.length; i += 4) {
      //   data[i] = 255 - data[i];
      //   data[i + 1] = 255 - data[i + 1];
      //   data[i + 2] = 255 - data[i + 2];
      // }

      // grayscale
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);

      // canvas.toBlob((blob) => {
      //   const form = new FormData();
      //   form.append("image", blob, "generatedImage.png");

      //   fetch("http://localhost:3000/upload", {
      //     method: "POST",
      //     body: form,
      //   })
      //     .then((res) => res.json())
      //     .then((data) => {
      //       console.log(data);
      //     });

      // });


    };
  };
};

fileInput.addEventListener("change", () => {
  combineImages(fileInput.files);
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  combineImages(e.dataTransfer.files);
});
