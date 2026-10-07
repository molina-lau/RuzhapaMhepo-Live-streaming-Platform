import { useThemeMode } from "@/stores/user-state";
import React from "react";

export default function MainMapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lightMode = useThemeMode();
  return (
    <main
      className={`main ${
        lightMode.mode ? "" : "tw:bg-gray-950! tw:text-white!"
      }`}
    >
      {children}
    </main>
  );
}
