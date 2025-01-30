import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import Task from '@/models/task';
import DBconnect from '@/lib/db';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export const POST = async (req) => {
  await DBconnect();

  return new Promise((resolve, reject) => {
    upload.single('image')(req, {}, async (err) => {
      if (err) {
        return resolve(NextResponse.json({ success: false, message: 'File upload failed' }, { status: 400 }));
      }

      try {
        const { latitude, longitude, email, description } = JSON.parse(req.body); // Parse JSON body
        const patroller = await getPatrollerByEmail(email);

        if (!patroller) {
          return resolve(NextResponse.json({ success: false, message: 'Patroller not found' }, { status: 404 }));
        }

        const newTask = new Task({
          image: `/uploads/${req.file.filename}`,
          location: { latitude, longitude },
          rangerId: patroller._id,
          description,
        });

        await newTask.save();
        resolve(NextResponse.json({ success: true, message: 'Task saved successfully' }, { status: 201 }));
      } catch (error) {
        resolve(NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 }));
      }
    });
  });
};
