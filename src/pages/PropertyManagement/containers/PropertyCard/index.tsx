import * as React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { mockPropertyCards } from 'pages/PropertyManagement/data';
import messages from './messages';

const PropertyCard = () => {
  return (
    <>
      {mockPropertyCards.map(item => {
        return (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 140 }} image={item.image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{messages.edit}</Button>
                <Button size="small">{messages.details}</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default PropertyCard;
