const messages = {
  basicInfo: {
    title: 'Basic Details',
    label: {
      title: 'Title',
      description: 'Description',
      descriptionHelpText:
        'Please copy paste the description from above and modify as required. If no changes needed, please ignore this field.',
      reference: 'Reference',
      postcode: 'Post Code',
      address: 'Address'
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
      furnishingType: 'Furnishing Type',
      lettingType: 'Letting Type',
      minTerm: 'Minimum Term',
      contractLength: 'Contract Length',
      deposit: 'Deposit'
    }
  },
  moreDetails: {
    title: 'More Details',
    label: {
      price: 'Price in Pounds',
      payable: 'Payable',
      type: 'Property Type',
      status: 'Property Status',
      ytLink: 'Youtube Link',
      mapLink: 'Map Link'
    },
    helperText: {
      status: 'Please select  status'
    }
  },
  imageUpload: {
    title: 'Edit Images'
  },
  button: {
    submit: 'Submit',
    uploadFile: 'Upload File'
  }
};

export default messages;
