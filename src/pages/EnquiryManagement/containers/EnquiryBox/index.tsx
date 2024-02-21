import { FC, ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Chip,
  TextField
} from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { EnquiryTableProps, IEnquireStatus } from './types';
import { IEnquiry } from 'pages/EnquiryManagement/types';
import { filterOptions, mockEnquiries, tableHeaders } from '../../data';
import messages from './messages';

const getTableHeaders = () => {
  return tableHeaders.map(header => <TableCell align={header.align}>{header.name}</TableCell>);
};

const getStatusLabel = (status: IEnquireStatus): JSX.Element => {
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

  const { text, color }: any = map?.[status];

  return <Chip color={color} label={text} variant="outlined" sx={{ minWidth: '150px' }}></Chip>;
};

const getTableBody = (enquiry: IEnquiry, theme: any, onIconClick: (type: 'update' | 'view', id: string) => void) => {
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
      <TableCell align="center">{getStatusLabel(enquiry.status)}</TableCell>
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
            onClick={() => onIconClick('update', enquiry.id)}
            disabled={enquiry.status !== 'contacted'}
          >
            <DoneOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const applyPagination = (cryptoOrders: IEnquiry[], page: number, limit: number): IEnquiry[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const EnquiryTable: FC<EnquiryTableProps> = ({ enquiries, onFilterChange, onAction }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [status, setStatus] = useState<string>('');

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }

  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     status: value
  //   }));
  // };

  // const handleSelectAllCryptoOrders = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setSelectedCryptoOrders(event.target.checked ? cryptoOrders.map(enquiry => enquiry.id) : []);
  // };

  // const handleSelectOneCryptoOrder = (event: ChangeEvent<HTMLInputElement>, cryptoOrderId: string): void => {
  //   if (!selectedCryptoOrders.includes(cryptoOrderId)) {
  //     setSelectedCryptoOrders(prevSelected => [...prevSelected, cryptoOrderId]);
  //   } else {
  //     setSelectedCryptoOrders(prevSelected => prevSelected.filter(id => id !== cryptoOrderId));
  //   }
  // };

  // const handlePageChange = (event: any, newPage: number): void => {
  //   setPage(newPage);
  // };

  // const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setLimit(parseInt(event.target.value));
  // };

  // const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  // const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit);
  // const selectedSomeCryptoOrders = selectedCryptoOrders.length > 0 && selectedCryptoOrders.length < cryptoOrders.length;
  // const selectedAllCryptoOrders = selectedCryptoOrders.length === cryptoOrders.length;

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
    onFilterChange(event.target.value);
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
          <TableBody>{enquiries.map(enquiry => getTableBody(enquiry, theme, handleIconClick))}</TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        {/* <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        /> */}
      </Box>
    </Card>
  );
};

export default EnquiryTable;
