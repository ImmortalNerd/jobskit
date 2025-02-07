"use client";

import axiosInstance, { endpoints } from "@/utils/axios";
import { setSession } from "./utils";

export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosInstance.post(endpoints.auth.signIn, {
      identifier: email,
      password: password,
    });

    if (!res.data.response) {
      throw new Error("Access token not found in response");
    }

    setSession(res.data.response);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};
