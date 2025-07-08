"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Flavors } from "next/font/google";

type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  short_description: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearch, setSearch] = useState<boolean>(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${process.env.NEXT_PUBLIC_API_URL}/post`);
        setPosts(response.data);
        setAllPosts(response.data); // Save a full backup
      } catch (error) {
        console.error("Axios fetch error:", error);
      }
    };
    fetchPosts();
  }, []);

  const searchPost = () => {
    setSearch(true)
    const query = inputRef.current?.value.toLowerCase() || '';
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.short_description.toLowerCase().includes(query)
    );
    setSearch(false)
    setPosts(filtered);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </main>

      <div className="flex justify-end px-4">
        <input
          ref={inputRef}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchPost();
            }
          }}
        />
        <button
          onClick={searchPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
          disabled={isSearch}
        >
          {isSearch ? '...' : "Search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`}>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 cursor-pointer border">
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized

                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.short_description}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && inputRef.current?.value && <p>Post not Available :{inputRef.current.value} </p>}
      </div>
    </>
  );
}
