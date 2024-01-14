export const statusOptions = [
  {
    value: 'availableImmediately',
    label: 'Available Immediately'
  },
  {
    value: 'available',
    label: 'Available'
  },
  {
    value: 'letAgreed',
    label: 'Let - Agreed'
  },
  {
    value: 'letUnavailable',
    label: 'Let - Unavailable'
  },
  {
    value: 'sold',
    label: 'Sold'
  },
  {
    value: 'soldSTC)',
    label: 'Sold -  Subject To Contract (STC)'
  },
  {
    value: 'shortTermLet',
    label: 'Short Term Let'
  },
  {
    value: 'archive',
    label: 'Archive'
  }
];

export const payableOptions = [
  {
    value: 'weekly',
    label: 'Weekly'
  },
  {
    value: 'monthly',
    label: 'Monthly'
  },
  {
    value: 'yearly',
    label: 'Yearly'
  }
];

export const contractOptions = [
  {
    value: 'furnished',
    label: 'Furnished'
  },
  {
    value: 'unFurnished',
    label: 'Un-Furnished'
  }
];

export const mainList: {
  [key: string]: string;
}[] = [
  {
    id: 'properties',
    name: 'Properties'
  },
  {
    id: 'enquiries',
    name: 'Enquiries'
  },
  {
    id: 'myAccount',
    name: 'My Account'
  }
];

export const PropertyInitialState = {
  _id: '',
  title: '',
  image: '',
  reference: '',
  postcode: '',
  description: '',
  area: 0,
  floor: 0,
  bathroom: 0,
  bedroom: 0,
  tenure: '',
  furnishingType: '',
  lettingType: '',
  minTerm: '',
  contractLength: '',
  deposit: '',
  price: '',
  payable: '',
  type: '',
  status: '',
  ytLink: ''
};
