"use client";

import { AuthContext } from "@/auth/contex/auth-context";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext: Context must be used inside AuthProvider");
  }

  return context;
}
