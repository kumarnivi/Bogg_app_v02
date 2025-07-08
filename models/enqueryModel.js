import mongoose, { Schema, model, models } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  queryImage: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { toJSON: { virtuals: true } });

const Contact = models.Contact || model("Contact", contactSchema);
export default Contact;

