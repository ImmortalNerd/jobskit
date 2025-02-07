import JobsList from "@/_components/jobs-list";
import { getJobs } from "@/actions/get-jobs-list";
import { Typography } from "@mui/material";
import { Suspense } from "react";

export default async function Home() {
  const jobsData = getJobs();
  const [jobs] = await Promise.all([jobsData]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-7">
      <Typography variant="h4" gutterBottom>
        Jobs List
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <JobsList initialJobs={jobs} />
      </Suspense>
    </div>
  );
}
