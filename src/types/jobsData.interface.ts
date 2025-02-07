import { Jobs } from "./jobs.interface";
import { Pagination } from "./pagination.interface";

export interface JobsData {
  pagination: Pagination;
  data: Jobs[];
}
