export interface PropertyManagementState {
  loading: boolean;
  properties: IProperty[];
  property: IProperty;
  error: string;
}

export interface IProperty {
  _id: string;
  title: string;
  image?: string;
  reference: string;
  postcode: string;
  description: string;
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
  price: string;
  payable: string;
  type: string;
  status: string;
  ytLink: string;
}
