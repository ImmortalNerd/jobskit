"use client";
import { getJobs } from "@/actions/get-jobs-list";
import { Jobs } from "@/types/jobs.interface";
import { JobsData } from "@/types/jobsData.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddJobForm from "./add-job";
import { useNewJobStore } from "@/store/newJobs.store";

const JobsList = ({ initialJobs }: { initialJobs: JobsData }) => {
  const [jobs, setJobs] = useState<Jobs[]>(initialJobs.data);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [page, setPage] = useState(1);

  const newJob = useNewJobStore((state) => state.newJob);
  const isNewJobAdded = useNewJobStore((state) => state.isNewJobAdded);
  const updateNewJobAdded = useNewJobStore((state) => state.updateNewJobAdded);
  const updateNewJob = useNewJobStore((state) => state.updateNewJob);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobsData = await getJobs(page);
      setJobs(jobsData.data);
      setLoading(false);
    };
    fetchJobs();
  }, [page]);

  useEffect(() => {
    if (isNewJobAdded) {
      setJobs([
        ...jobs,
        {
          title: newJob.title,
          id: Math.random(),
          datePosted: new Date().toISOString(),
          expirationDate: new Date(
            new Date().getTime() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          featured: false,
          shares: 0,
          views: 0,
          category: {
            id: 1,
            name: newJob.category,
            slug: "category",
            icon: "category",
          },
          subCategory: {
            id: 1,
            name: "Sub Category",
            slug: "sub-category",
          },
          speciality: "Speciality",
          jobType: "Job Type",
          positionLevel: "Position Level",
          company: {
            id: 1,
            name: "Company",
            industry: "Industry",
            description: "Description",
            address: "Address",
            phone: "Phone",
            email: "Email",
            size: 1,
            imageId: 1,
            imageURL: "Image URL",
          },
          country: "Country",
          location: "Location",
          employmentType: "Employment Type",
        },
      ]);
      updateNewJobAdded(false);
      updateNewJob({ title: "", category: "" });
      setOpenAddModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewJobAdded]);

  return (
    <>
      {loading ? (
        <div className="min-h-[300px] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center max-w-[90svw]">
          <div className="flex justify-end w-full">
            <Button
              sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}
              variant="outlined"
              color="primary"
              onClick={() => setOpenAddModal(true)}
            >
              <Icon icon="carbon:add-alt" width={20} height={20} />
              Add New Job
            </Button>
          </div>
          <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Employment Type</TableCell>
                  <TableCell align="center">Date Posted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs?.map((job) => (
                  <TableRow
                    key={job.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{job.title}</TableCell>
                    <TableCell align="center">{job.category.name}</TableCell>
                    <TableCell align="center">{job.location}</TableCell>
                    <TableCell align="center">{job.employmentType}</TableCell>
                    <TableCell align="center">
                      {new Date(job.datePosted).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {initialJobs.pagination && (
            <Pagination
              page={page}
              count={initialJobs.pagination.totalPages}
              onChange={(e, value) => setPage(value)}
            />
          )}
        </div>
      )}
      {openAddModal && (
        <Modal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddJobForm />
        </Modal>
      )}
    </>
  );
};

export default JobsList;
