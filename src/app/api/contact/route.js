import { NextResponse } from 'next/server';
import dbConnect from '../../../../utiles/connectMongo';
import Contact from '../../../../models/enqueryModel';

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData(); 
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact' },
      { status: 500 }
    );
  }
}
