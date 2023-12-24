const messages = {
  basicInfo: {
    title: 'Basic Details',
    label: {
      title: 'Title',
      description: 'Description',
      reference: 'Reference',
      postcode: 'Post Code'
    }
  },
  propInfo: {
    title: 'Property Info',
    label: {
      area: 'Area in sq ft',
      floor: "No: of Floor's",
      bathroom: "No: of Bathroom's",
      bedroom: "No: of Bedroom's",
      tenure: 'Tenure in months'
    }
  },
  contractInfo: {
    title: 'Contract Info',
    label: {
      furnished: 'Furnished',
      lettingType: 'Letting Type',
      minTerm: 'Minimum Term',
      contractLength: 'Contract Length',
      deposit: 'Deposit'
    }
  },
  moreDetails: {
    title: 'More Details',
    label: { price: 'Price', payable: 'Payable', type: 'Property Type', status: 'Property Status' },
    helperText: {
      status: 'Please select  status'
    }
  }
};

export default messages;
