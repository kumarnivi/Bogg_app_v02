import { NextResponse } from 'next/server';
import { upload } from '../../../../lib/multer';
import connectMongo from "../../../../utiles/connectMongo";
import contactModel from "../../../../models/enqueryModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectMongo();

  return new Promise((resolve, reject) => {
    upload.single('queryImage')(req, {}, async (err) => {
      if (err) {
        return reject(NextResponse.json({ error: err.message }, { status: 400 }));
      }

      try {
        const formData = await req.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const file = req.file;

        const newContact = new contactModel({
          name,
          email,
          message,
          queryImage: file?.filename,
        });

        await newContact.save();
        resolve(NextResponse.json({ success: true, message: 'Contact submitted' }));
      } catch (error) {
        reject(NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 }));
      }
    });
  });
}
