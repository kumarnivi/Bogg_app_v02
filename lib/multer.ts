// lib/multer.ts
import multer from 'multer';

// Use memory storage so we can access the file buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
