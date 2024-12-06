import * as fs from "fs";
import { exec } from "child_process";
import * as path from "path";

// Define input and output directories
const INPUT_DIR = "C:\\Users\\Vitali\\Downloads\\TEST_TEST";
const OUTPUT_DIR = "C:\\Users\\Vitali\\Downloads\\TEST_OUTPUT";

// Ensure the directories exist
if (!fs.existsSync(INPUT_DIR)) {
  console.error(`Input directory not found: ${INPUT_DIR}`);
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  try {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error(`Failed to create output directory: ${OUTPUT_DIR}`);
    process.exit(1);
  }
}

// Process each image in the input directory
const files = fs.readdirSync(INPUT_DIR).filter((file) => file.endsWith(".jpg"));

files.forEach((file, index) => {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(
    OUTPUT_DIR,
    `${path.parse(file).name}_upscaled.jpg`
  );

  console.log(`Processing ${inputPath}...`);

  // Call Upscayl with the relevant parameters
  const upscaylCommand = `"C:\\Path\\To\\Upscayl.exe" -i "${inputPath}" -o "${outputPath}" -s 4 -z 4`;
  exec(upscaylCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error processing ${file}:`, error);
    } else {
      console.log(`Processed ${file} successfully.`);
    }
  });

  // Optional delay to avoid overloading the system
  setTimeout(() => {}, 2000 * (index + 1));
});

console.log("All images have been processed.");
