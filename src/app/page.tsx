"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Search, X } from "lucide-react";

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
  const [isSearch, setSearch] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${process.env.NEXT_PUBLIC_API_URL}/post`);
        setPosts(response.data);
        setAllPosts(response.data);
      } catch (error) {
        console.error("Axios fetch error:", error);
      }
    };
    fetchPosts();
  }, []);

  const searchPost = () => {
    const query = inputRef.current?.value.toLowerCase() || "";
    setSearch(true);
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.short_description.toLowerCase().includes(query)
    );
    setPosts(filtered);
    setSearch(false);
  };

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    setPosts(allPosts);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-2 text-gray-800">Welcome to Our Blog</h2>
        <p className="text-gray-500">Explore stories, tutorials, and insights written by the community.</p>
      </main>

      {/* Search Bar */}
      <div className="flex justify-center items-center gap-2 px-4 py-2 mb-6">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") searchPost();
            }}
          />
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        </div>
        <button
          onClick={searchPost}
          disabled={isSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition"
        >
          {isSearch ? "..." : "Search"}
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-10">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl border border-gray-100 transition-transform duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="relative w-full h-52">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mt-1">{post.short_description}</p>
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && inputRef.current?.value && (
          <p className="text-center col-span-full text-gray-500 italic">
            No posts found for: <strong>{inputRef.current.value}</strong>
          </p>
        )}
      </div>
    </>
  );
}
