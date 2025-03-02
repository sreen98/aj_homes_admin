import { ISideBarListItem } from 'types';

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

export const categoryOptions = [
  {
    value: 'forSale',
    label: 'For Sale'
  },
  {
    value: 'studentLettings',
    label: 'Student Lettings'
  },
  {
    value: 'residentialLettings',
    label: 'Residential Lettings'
  }
];

export const mainList: ISideBarListItem[] = [
  {
    id: 'properties',
    name: 'Properties',
    subList: [
      {
        id: 'all',
        name: 'All'
      },
      {
        id: 'forSale',
        name: 'For Sale'
      },
      {
        id: 'studentLettings',
        name: 'Student Lettings'
      },
      {
        id: 'residentialLettings',
        name: 'Residential Lettings'
      }
    ]
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
  address: '',
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
  mapLink: '',
  isFeatured: false,
  moveInDate: '',
  category: ''
};
