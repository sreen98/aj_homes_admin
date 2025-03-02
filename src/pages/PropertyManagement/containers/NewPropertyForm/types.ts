import { Dayjs } from 'dayjs';

export interface IState {
  title: string;
  reference: string;
  postcode: string;
  description: any;
  address: string;
  area: number;
  floor: number;
  bathroom: number;
  bedroom: number;
  tenure: string;
  furnishingType: string;
  lettingType: string;
  minTerm: string;
  contractLength: string;
  deposit: string;
  price: number;
  currency: string;
  payable: string;
  type: string;
  status: string;
  ytLink: string;
  mapLink: string;
  images: string[];
  isFeatured: boolean;
  moveInDate: Dayjs | null;
  category: string;
  [key: string]: string | number | boolean | Dayjs | null | string[] | any;
}
