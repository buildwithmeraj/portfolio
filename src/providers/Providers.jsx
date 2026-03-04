"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import ScrollRevealObserver from "@/components/shared/ScrollRevealObserver";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
      <ScrollRevealObserver />
      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
};

export default Providers;
