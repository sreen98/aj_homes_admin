import * as React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import messages from './messages';
import { getStatusLabel, localRedirect } from 'utils';
import { IPropertyCardProps } from './types';

const getTitle = ({ title, status }: { title: string; status: string }) => {
  return getStatusLabel(status) === '' ? `${title}` : `${title} (${getStatusLabel(status)})`;
};

const PropertyCard = ({ properties, onOpenModal }: IPropertyCardProps) => {
  const handleClickDetails = (id: string) => {
    localRedirect(`/property/${id}`);
  };

  const handleEditProperty=(id: string)=>{
    localRedirect(`/properties/edit/${id}`);
  }
  const handleClickUpdateStatus = (id: string) => {
    onOpenModal(id);
  };
  return (
    <>
      {properties.map(item => {
        return (
          <Grid item xs={2} sm={4} md={4} key={item._id}>
            <Card sx={{ maxWidth: 345, minHeight: 300 }}>
              <CardMedia sx={{ height: 140 }} image={item.image ?? 'https://placehold.co/600x400'} />
              <CardContent sx={{ maxHeight: 150 }}> 
                <Typography gutterBottom variant="h5" component="div">
                  {getTitle({ title: item.title, status: item.status })}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=> handleEditProperty(item._id)}>{messages.edit}</Button>
                <Button size="small" onClick={() => handleClickDetails(item._id)}>
                  {messages.details}
                </Button>
                <Button size="small" onClick={() => handleClickUpdateStatus(item._id)}>
                  {messages.updateStatus}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default PropertyCard;
