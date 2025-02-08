"use client";

import { useMemo, useEffect, useCallback, ReactNode, useState } from "react";
import { STORAGE_KEY } from "./constant";
import { setSession, isValidToken } from "./utils";
import { AuthContext } from "./auth-context";
import axiosInstance, { endpoints } from "@/utils/axios";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axiosInstance.get(endpoints.auth.me , {
          headers: {
            Authorization: `${accessToken}`,
          }
        });
        const user = res.data;
        setState({ user: { ...user }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ?? null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
