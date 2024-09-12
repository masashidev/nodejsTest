const fileInput = document.getElementById("fileInput");
const urlInput = document.getElementById("urlInput");
const dropZone = document.getElementById("dropZone");
const combineButton = document.getElementById("combineButton");
const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");


function getPixelsFromImage(canvas) {
  const imagePixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imagePixelData.data;
}

function toGrayScale(pixels) {
  const grayScalePixels = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    grayScalePixels.push(avg);
    grayScalePixels.push(avg);
    grayScalePixels.push(avg);
    grayScalePixels.push(pixels[i + 3]);
  }
  return grayScalePixels;
}

function generateStripeImage(images) {
  const minWidth = Math.min(...images.map((img) => img.width));
  const minHeight = Math.min(...images.map((img) => img.height));

  canvas.width = minWidth;
  canvas.height = minHeight;

  const imagePartitionCount = images.length;
  const bandWidth = Math.floor(minWidth / imagePartitionCount);

  let xOffset = 0;
  images.forEach((img, index) => {
    // Source rectangle ( where to start clipping )
    // const totalImages = images.length;
    // const lastIndex = totalImages - 1;
    // const imageWidth = img.width;
    // const availableWidth = imageWidth - bandWidth;
    // const relativePosition = index / lastIndex;
    // const sx = Math.floor(availableWidth * relativePosition);
    // if index is 0, sx = 0
    // if index is lastIndex, sx = availableWidth
    // so sx is a linear function of index
    // think of this from right to left
    const sx = Math.floor(
      (img.width - bandWidth) * (index / (images.length - 1))
    );
    const sy = 0;
    const sWidth = bandWidth;
    const sHeight = minHeight;

    // Destination rectangle ( where to place the image on the canvas )
    const dx = xOffset;
    const dy = 0;
    const dWidth = bandWidth;
    const dHeight = minHeight;

    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    xOffset += bandWidth;
  });
  // const pixels = getPixelsFromImage(canvas);
  // const grayScalePixels = toGrayScale(pixels);
  // ctx.putImageData(new ImageData(new Uint8ClampedArray(grayScalePixels), canvas.width, canvas.height), 0, 0);
}


function processImages(files) {
  const images = [];
  for (let file of files) {
    if (file.type.startsWith("image/")) {
      // create a new FileReader object
      const reader = new FileReader();
      reader.onload = (e) => { // e: ProgressEvent<FileReader>
        //HTMLImageElement
        const img = new Image();
        img.onload = () => images.push(img);
        // fill the src attribute of the image with the data URL
        // target is the FileReader object, result is the data URL
        img.src = e.target.result
      };
      // read the file as a data URL
      reader.readAsDataURL(file);
      console.log(file);
    }
  }
  console.log(images);
  setTimeout(() => {
    generateStripeImage(images); // images: HTMLImageElement[]
  }, 1000);
};

fileInput.addEventListener("change", () => {
  processImages(fileInput.files);
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  processImages(e.dataTransfer.files);
});
