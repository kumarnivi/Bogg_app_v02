'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data?.message || 'Message sent successfully!');
      e.target.reset();
    } catch (err) {
      toast.error(
        err?.response?.data?.error || 'Something went wrong. Please try again.'
      );
    }

    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6 bg-white shadow-lg rounded-2xl p-8 border"
      >
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            required
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            required
            placeholder="john@example.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            required
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </main>
  );
}
