import { createCanvas } from "canvas";
import fs from 'fs';

// Define a function to create and save the image
function createTextStory(title, bgColor, font) {
  console.log(title, bgColor, font);
    // dimension for the image
    const width = 300;
    const height = 600;

    // Instantiate the canvas object
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Fill the rectangle with purple
    context.fillStyle = "#EF4262";
    context.fillRect(0, 0, width, height);

    const fontSize =35;
    const fontFamily = "Arial"; // Change the font family here
    context.font = `bold ${fontSize}pt '${fontFamily}'`; // Set font style


    // Set the style of the text and render it to the canvas
    context.font = "Sans Bold";
    context.textAlign = "center";
    context.fillStyle = "#fff";
    // Render the provided title text at the center
    context.fillText(title, width / 2, 170);

    // Write the image to file
    const buffer = canvas.toBuffer("image/png");
    const textStory =  fs.writeFileSync("./image.png", buffer);
    console.log('image saved ');

}

// Export the function to make it accessible from other files
export { createTextStory };
