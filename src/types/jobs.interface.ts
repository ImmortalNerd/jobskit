export interface Jobs {
  id: number;
  title: string;
  featured: boolean;
  datePosted: string;
  expirationDate: string;
  employmentType: string;
  positionLevel: string;
  company: {
    id: number;
    name: string;
    industry: string;
    description: string;
    address: string;
    phone: string;
    email: string | null;
    size: number;
    imageId: number;
    imageURL: string;
  };
  country: string;
  location: string;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
  };
  subCategory: {
    id: number;
    name: string;
    slug: string;
  };
  speciality: string | null;
  jobType: string;
  views: number;
  shares: number;
}
