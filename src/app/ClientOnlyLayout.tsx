// src/components/ClientOnlyLayout.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "../compoments/Header";
import Footer from "../compoments/Footer";
import ThemeProvider from "../../providers/ThemeProvider";

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
