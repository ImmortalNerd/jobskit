"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewJobStore } from "@/store/newJobs.store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const AddJobSchema = zod.object({
  title: zod.string().min(1, { message: "Title is required!" }),
  category: zod.string().min(1, { message: "Category is required!" }),
});

export type AddJobFormData = zod.infer<typeof AddJobSchema>;

const AddJobForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AddJobSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const saveNewJob = useNewJobStore((state) => state.updateNewJob);
  const updateNewJobAdded = useNewJobStore((state) => state.updateNewJobAdded);

  const onSubmit = handleSubmit(async (data) => {
    saveNewJob(data);
    updateNewJobAdded(true);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add a new job
        </Typography>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              autoComplete="off"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Category"
              autoComplete="off"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          )}
        />
        <Button
          fullWidth
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddJobForm;
