export interface IState {
  title: string;
  reference: string;
  postcode: string;
  description: string;
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
  [key: string]: string | number | string[];
}
