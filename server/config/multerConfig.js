import multer from 'multer';
import path from 'path';

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Append timestamp to filename
    cb(null, file.fieldname + '-' + uniqueSuffix); // Set filename
  },
});

// Create a multer instance
const upload = multer({ storage: storage });

export default upload;
