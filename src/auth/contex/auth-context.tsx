"use client";

import { createContext } from "react";

// ----------------------------------------------------------------------

export const AuthContext = createContext({
  user: null,
  checkUserSession: async () => {},
  loading: true,
  authenticated: false,
  unauthenticated: true,
});

export const AuthConsumer = AuthContext.Consumer;
