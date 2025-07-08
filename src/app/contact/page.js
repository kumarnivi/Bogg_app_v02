'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageSent('');

    const formData = new FormData(e.target); // Collect all form inputs

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessageSent(response.data?.message || 'Message sent successfully!');
      e.target.reset(); // Reset form
    } catch (err) {
      if (err.response) {
        setMessageSent(err.response.data?.error || 'Something went wrong.');
      } else {
        setMessageSent('Failed to send. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="w-1/4">Name:</label>
          <input name="name" type="text" id="name" required className="border rounded px-2 py-1 w-3/4" />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="email" className="w-1/4">Email:</label>
          <input name="email" type="email" id="email" required className="border rounded px-2 py-1 w-3/4" />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="message" className="w-1/4">Message:</label>
          <textarea name="message" id="message" required className="border rounded px-2 py-1 w-3/4" rows="4"></textarea>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="queryImage" className="w-1/4">Image:</label>
          <input name="queryImage" type="file" accept="image/*" className="w-3/4" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>

        {messageSent && <p className="mt-4 text-green-600">{messageSent}</p>}
      </form>
    </main>
  );
}
