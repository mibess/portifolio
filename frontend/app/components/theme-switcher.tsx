"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";



export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-transparent cursor-pointer hover:bg-transparent" // Estilo simples para o botão
    >
      <Sun className="absolute h-10 w-10 transition-all  rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-slate-900" />
      <Moon className="absolute h-10 w-10 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-slate-50" />
    </Button>
  );
}