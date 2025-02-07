/* eslint-disable */
"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { useAuthContext } from "@/hooks/useAuth";
import Login from "@/_components/login";

// ----------------------------------------------------------------------

export function AuthGuard({ children }: { children: ReactNode }): JSX.Element {
  const { authenticated } = useAuthContext();

  return authenticated ? (children as JSX.Element) : <Login />;
}
