import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Fix __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the temp folder
const tempDirectory = path.resolve(__dirname, '..', '..', 'public', 'temp');

// Ensure the directory exists
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory, { recursive: true });
  console.log(`Temp directory created at ${tempDirectory}`);
} else {
  console.log(`Using existing temp directory: ${tempDirectory}`);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, tempDirectory);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });
