"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Icon } from "@iconify/react";
import { signInWithPassword } from "@/auth/contex/action";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuth";
import Image from "next/image";

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email("Invalid email"),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { checkUserSession }: { checkUserSession: () => void } =
    useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });
      await checkUserSession?.();

      router.push("/");
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "Unknown error";
      setErrorMsg(errorMessage);
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-screen p-7">
      <div className="w-full flex justify-center">
        <div className="flex justify-center max-w-[50svw]">
          <Image src="/img/logo_full.png" width={500} height={125} alt="logo" />
        </div>
      </div>
      <form onSubmit={onSubmit} className="w-full flex justify-center p-3">
        <div className="w-[70%] flex flex-col gap-5 text-center font-bold">
          <Typography variant="h4" gutterBottom>
            Sign in to your account
          </Typography>
          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
