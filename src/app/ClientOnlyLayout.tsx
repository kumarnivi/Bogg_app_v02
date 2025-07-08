// src/components/ClientOnlyLayout.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "../compoments/Header";
import Footer from "../compoments/Footer";
import ThemeProvider from "../../providers/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import Hero from "@/compoments/Hearo";

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Hero/>
      {children}
      <Footer />
    </ThemeProvider>
  );
}
