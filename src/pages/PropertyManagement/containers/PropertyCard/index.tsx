import * as React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import messages from './messages';
import { IProperty } from 'pages/PropertyManagement/types';
import { localRedirect } from 'utils';

const PropertyCard = ({ properties }: { properties: IProperty[] }) => {
  const handleClickDetails = (id: string) => {
    localRedirect(`/property/${id}`);
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
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{messages.edit}</Button>
                <Button size="small" onClick={() => handleClickDetails(item._id)}>
                  {messages.details}
                </Button>
                <Button size="small" onClick={() => handleClickDetails(item._id)}>
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
