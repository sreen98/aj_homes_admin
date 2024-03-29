import { FC, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  TextField
} from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { EnquiryTableProps } from './types';
import { IEnquiry } from 'pages/EnquiryManagement/types';
import { filterOptions, tableHeaders } from '../../data';
import messages from './messages';
import { updateEnquiryStatus } from 'pages/EnquiryManagement/slice';
import { useDispatch } from 'react-redux';
import { EnquiryStatusChip } from 'components';

const getTableHeaders = () => {
  return tableHeaders?.map(header => <TableCell align={header.align}>{header.name}</TableCell>);
};

const getTableBody = (
  enquiry: IEnquiry,
  theme: any,
  onIconClick: (type: 'update' | 'view', id: string) => void,
  handleMarkAsRead: any
) => {
  return (
    <TableRow hover key={enquiry.id}>
      <TableCell>
        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
          {enquiry.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
          {enquiry.subject}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
          {enquiry.emailId}
        </Typography>
      </TableCell>
      <TableCell align="center">
        {' '}
        <EnquiryStatusChip status={enquiry.status} />
      </TableCell>
      <TableCell align="right">
        <Tooltip title={messages.tooltip.view} arrow>
          <IconButton
            sx={{
              '&:hover': { background: theme.palette.error.light },
              color: theme.palette.error.main
            }}
            color="inherit"
            size="small"
            onClick={() => onIconClick('view', enquiry.id)}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={messages.tooltip.markContacted} arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.palette.primary.light
              },
              color: theme.palette.primary.main
            }}
            color="inherit"
            size="small"
            onClick={() => handleMarkAsRead(enquiry.id)}
            disabled={enquiry.status !== 'contacted'}
          >
            <DoneOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const EnquiryTable: FC<EnquiryTableProps> = ({ enquiries, onFilterChange, onAction }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleMarkAsRead = (id: any) => {
    dispatch(updateEnquiryStatus(id as any));
  };
  const theme = useTheme();

  const handleIconClick = (type: 'update' | 'view', id: string) => {
    onAction('view', id);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15rem' }
            }}
          >
            <TextField
              id="outlined-select-status"
              required
              select
              label={messages.label.status}
              value={status}
              onChange={e => handleStatusChange(e as React.ChangeEvent<HTMLInputElement>)}
            >
              {filterOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        }
        title={messages.title}
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>{getTableHeaders()}</TableRow>
          </TableHead>
          <TableBody>
            {enquiries.map(enquiry => getTableBody(enquiry, theme, handleIconClick, handleMarkAsRead))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}></Box>
    </Card>
  );
};

export default EnquiryTable;
