import { ITableHeader } from 'types';
import { IEnquiry } from './types';

export const mockEnquiries: IEnquiry[] = [
  {
    id: '1',
    propertyId: 'oniugxnPteebex',
    name: 'Mildred',
    emailId: 'ebebin@kowanfu.mo',
    subject: 'pPoQBZCwVOWRnOnPtPv',
    status: 'contacted',
    message:
      'impossible string frog excitement crop moving diagram cent press living doctor breathing single enter learn path snow rope money particular height radio part wealth'
  },
  {
    id: '2',
    name: 'Jacob',
    propertyId: 'oniugxnPteebex',
    emailId: 'olfe@ugi.pk',
    subject: 'ntNqSEF',
    status: 'notContacted',
    message:
      'wolf ever shaking get sign cake respect three effect feathers printed national cloth shells vote excited question nest judge corn selection property feature away'
  },
  {
    id: '3',
    name: 'Sean Beck',
    propertyId: 'oniugxnPteebex',
    emailId: 'opvavazi@cekhob.mz',
    subject: 'MkeUeJxjLyevH',
    status: 'notContacted',
    message:
      'equal step hand sleep milk forest occur electricity race serious who declared strong swept suppose bad development not week home castle loose entirely express'
  },
  {
    id: '4',
    name: 'Francis Walker',
    propertyId: 'oniugxnPteebex',

    emailId: 'tica@far.ua',
    subject: 'NhdSdTupAKEBx',
    status: 'contacted',
    message:
      'fast natural save remarkable unusual machine due basis brown higher said morning arrange walk condition prove fox only hill nobody list provide agree began'
  },
  {
    id: '5',
    name: 'Viola Howard',
    propertyId: 'oniugxnPteebex',

    emailId: 'ehir@rak.hr',
    subject: 'PrWerJzJZuWG',
    status: 'notContacted',
    message:
      'dollar sides behind report rise knowledge wolf chest alone problem century chose service sunlight boy afternoon hurried over cattle avoid pot liquid who bank'
  },
  {
    id: '6',
    propertyId: 'oniugxnPteebex',

    name: 'Walter Bowen',
    emailId: 'efotom@lohkuze.gl',
    subject: 'FXiMIpcWAU',
    status: 'contacted',
    message:
      'using railroad queen bag center location mill outside volume worried slope buy belong spent interior thumb studying paper driven spite up near mark many'
  }
];

export const tableHeaders: ITableHeader[] = [
  {
    name: 'Customer Name',
    align: 'left'
  },
  {
    name: 'Subject',
    align: 'left'
  },
  {
    name: 'Email',
    align: 'left'
  },
  {
    name: 'Status',
    align: 'center'
  },
  {
    name: 'Actions',
    align: 'right'
  }
];

export const filterOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Contacted',
    value: 'contacted'
  },
  {
    label: 'Not Contacted',
    value: 'notContacted'
  }
];
