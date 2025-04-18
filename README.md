# Image Classification Tool 🌄🌌

A Node.js command-line utility that automatically classifies images as daytime or nighttime based on brightness analysis. Processes images in bulk and organizes them into appropriate folders.

![Workflow Diagram](https://via.placeholder.com/800x400.png?text=Day/Night+Image+Classification+Workflow)

## Features ✨

- 📁 Batch processes all images in input folder
- ⚡ Fast brightness analysis using Jimp library
- 📊 Simple threshold-based classification
- 📂 Automatic file organization
- 🛠️ Error handling for corrupt/invalid images

## Prerequisites 🔧

- Node.js v18+
- npm v9+

## Installation 💻

```bash
git clone https://github.com/yourusername/image-classification.git
cd image-classification
npm install
```

## Usage 🚀

1. Place images to classify in `/images` folder
2. Run classification:

```bash
node index.js
```

3. Find sorted images in:
   - `/day` - Bright images (avg brightness > 80)
   - `/night` - Dark images (avg brightness ≤ 80)

## Technical Details 🔬

### Classification Algorithm

1. Resize to 100x100 pixels
2. Convert to grayscale
3. Calculate average brightness:
   ```js
   avg = totalBrightness / (100 * 100); // Range 0-255
   ```
4. Classify based on threshold:
   - Day: avg > 80
   - Night: avg ≤ 80

### Folder Structure

```
.
├── images/    # Input images
├── day/       # Classified daytime images
├── night/     # Classified nighttime images
├── index.js   # Main application
└── package.json
```

## Dependencies 📦

| Package      | Version | Purpose                       |
| ------------ | ------- | ----------------------------- |
| jimp         | ^0.16.1 | Image processing              |
| cli-progress | ^3.12.0 | Progress visualization        |
| axios        | ^1.7.9  | (Future) Remote image support |

## Configuration ⚙️

Adjust brightness threshold in `index.js`:

```js
// Threshold check in classifyImage() function:
return avgBrightness > 80 ? "day" : "night";
```

## License 📄

MIT License
