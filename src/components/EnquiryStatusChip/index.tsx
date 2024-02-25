import { Chip } from '@mui/material';
import { IEnquireStatus } from 'pages/EnquiryManagement/containers/EnquiryBox/types';

const EnquiryStatusChip = ({ status }: { status: IEnquireStatus }): JSX.Element => {
  const map = {
    contacted: {
      text: 'Not Contacted',
      color: 'error'
    },
    notContacted: {
      text: 'Contacted',
      color: 'success'
    }
  };

  const { text, color }: any = map[status];

  return <Chip color={color} label={text} variant="outlined" sx={{ minWidth: '150px' }}></Chip>;
};

export default EnquiryStatusChip;
