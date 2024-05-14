import { createCanvas } from "canvas";
import fs from "fs";
import { formatTitle } from "./utils/format-title.js";

function createTextStory(title, bgColor) {
  const width = 800;
  const height = 1600;
  const lineHeight = 50;
  const titleY = height / 2; // Vertical center of canvas

  // Create canvas and context
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Set background color
  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height); // Fill entire canvas with background color

  // Font settings
  const font = "Arial";
  let fontSize = 30;

  // Function to calculate maximum font size that fits the text within canvas width
  function calculateMaxFontSize(textLines, maxWidth) {
    let size = 30;
    context.font = `bold ${size}px ${font}`;
    let currentWidth = getMaxTextWidth(textLines, size);

    // Reduce font size until text fits within maxWidth
    while (currentWidth > maxWidth && size > 10) {
      size--;
      context.font = `bold ${size}px ${font}`;
      currentWidth = getMaxTextWidth(textLines, size);
    }
    return size;
  }

  // Function to calculate maximum text width for given font size
  function getMaxTextWidth(textLines, fontSize) {
    context.font = `bold ${fontSize}px ${font}`;
    let maxTextWidth = 0;

    // Measure each line's width and find the maximum width
    textLines.forEach((line) => {
      const lineWidth = context.measureText(line).width;
      if (lineWidth > maxTextWidth) {
        maxTextWidth = lineWidth;
      }
    });

    return maxTextWidth;
  }

  // Split title into lines using formatTitle function
  const textLines = formatTitle(title);

  // Calculate the maximum font size to fit the text within the canvas width
  fontSize = calculateMaxFontSize(textLines, 0.9 * width);

  // Clear canvas before drawing text
  context.clearRect(0, 0, width, height);

  // Set text alignment and color
  context.textAlign = "center";
  context.fillStyle = "#fff"; // White text color

  // Calculate vertical position for text lines to center vertically
  const totalTextHeight = textLines.length * lineHeight;
  let startY = titleY - totalTextHeight / 2;

  // Render each line of text centered vertically on the canvas
  textLines.forEach((line, index) => {
    const textY = startY + index * lineHeight;
    context.fillText(line, width / 2, textY);
  });

  // Save canvas image to file as PNG
  const buffer = canvas.toBuffer("image/jpeg"); // Use synchronous version for simplicity
  fs.writeFileSync("./image.jpeg", buffer);

  console.log("Image saved successfully.");
}

export { createTextStory };
