const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const inputFolder = "./images";
const nightFolder = "./night";
const dayFolder = "./day";

if (!fs.existsSync(nightFolder)) fs.mkdirSync(nightFolder);
if (!fs.existsSync(dayFolder)) fs.mkdirSync(dayFolder);

async function classifyImage(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    image.resize(100, 100).grayscale();

    let totalBrightness = 0;
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        totalBrightness += Jimp.intToRGBA(image.getPixelColor(x, y)).r;
      }
    }

    const avgBrightness = totalBrightness / (100 * 100);
    return avgBrightness > 80 ? "day" : "night";
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return "unknown";
  }
}

async function processImages() {
  const files = fs
    .readdirSync(inputFolder)
    .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file));

  console.log(`Found ${files.length} images. Starting classification...`);

  for (const file of files) {
    const filePath = path.join(inputFolder, file);
    const category = await classifyImage(filePath);

    if (category !== "unknown") {
      const destination = category === "day" ? dayFolder : nightFolder;
      fs.renameSync(filePath, path.join(destination, file));
      console.log(`Moved (${file}) to ${destination}`);
    } else {
      console.log(`Failed to classify (${file}) due to an error.`);
    }
  }

  console.log("All images have been successfully classified!");
}

processImages().catch(console.error);

function canNest(arr1, arr2) {
  if (
    Math.min(...arr1) > Math.min(...arr2) &&
    Math.max(...arr1) < Math.max(...arr2)
  ) {
    return true;
  } else {
    return false;
  }
}

const test = (arr1, arr2) => {
  if (
    Math.min(...arr1) > Math.min(...arr2) &&
    Math.max(...arr1) < Math.max(...arr2)
  ) {
    return true;
  } else {
    return false;
  }
};
