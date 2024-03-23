export const statusOptions = [
  {
    value: 'Available Immediately',
    label: 'Available Immediately'
  },
  {
    value: 'Available',
    label: 'Available'
  },
  {
    value: 'Let - Agreed',
    label: 'Let - Agreed'
  },
  {
    value: 'Let - Unavailable',
    label: 'Let - Unavailable'
  },
  {
    value: 'Sold',
    label: 'Sold'
  },
  {
    value: 'Sold -  Subject To Contract (STC)',
    label: 'Sold -  Subject To Contract (STC)'
  },
  {
    value: 'Short Term Let',
    label: 'Short Term Let'
  },
  {
    value: 'Archive',
    label: 'Archive'
  }
];

export const payableOptions = [
  {
    value: 'Weekly',
    label: 'Weekly'
  },
  {
    value: 'Monthly',
    label: 'Monthly'
  },
  {
    value: 'Yearly',
    label: 'Yearly'
  }
];

export const contractOptions = [
  {
    value: 'Furnished',
    label: 'Furnished'
  },
  {
    value: 'Un-Furnished',
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
  ytLink: '',
  mapLink: ''
};
