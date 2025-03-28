"use client"; 
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Prevent SSR mismatch
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
