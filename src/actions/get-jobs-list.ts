"use server";

import { CONFIG } from "@/config-global";
import { JobsData } from "@/types/jobsData.interface";
import { endpoints } from "@/utils/axios";

export const getJobs = async (page: number = 1) => {
  try {
    const url = `${CONFIG.site.serverUrl}${endpoints.jobs.all}?page=${page}`;
    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });
    const result = await response.json();
    return result as JobsData;
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`);
  }
};
