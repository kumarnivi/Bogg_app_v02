'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";



type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  short_description: string;
  created_at_format: string;
};


export default function PostPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          `${process.env.NEXT_PUBLIC_API_URL}/singlepost/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError("Failed to load post.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!post) return <p className="p-4">Post not found</p>;

  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-500">
        Published on {post.created_at_format}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt="Post Image"
          className="my-4 w-full max-h-[400px] object-cover rounded-lg"
        />
      )}
      <p className="prose">{post.description}</p>
    </main>
  );
}