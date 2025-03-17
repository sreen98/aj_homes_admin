import * as React from 'react';
import { Card, CardContent, Grid, Tooltip } from '@mui/material';

import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import messages from './messages';
import { getStatusLabel, localRedirect } from 'utils';
import { IPropertyCardProps } from './types';
import StarIcon from '@mui/icons-material/Star';

const getTitle = ({ title, status }: { title: string; status: string }) => {
  return getStatusLabel(status) === '' ? `${title}` : `${title} (${getStatusLabel(status)})`;
};

const PropertyCard = ({ properties, onOpenModal }: IPropertyCardProps) => {
  const handleClickDetails = (id: string) => {
    localRedirect(`/admin/property/${id}`);
  };

  const handleEditProperty = (id: string) => {
    localRedirect(`/admin/properties/new/${id}`);
  };
  const handleClickUpdateStatus = (id: string) => {
    onOpenModal(id);
  };
  return (
    <>
      {properties.map(item => {
        const imageUrl =
          Array.isArray(item.images) && item?.images.length > 0 ? item.images[0] : 'https://placehold.co/600x400';
        return (
          <Grid item xs={2} sm={4} md={4} xl={3} key={item._id}>
            <Card sx={{ maxWidth: 345, minHeight: 200 }}>
              <CardMedia
                sx={{ height: 140, cursor: 'pointer' }}
                image={imageUrl}
                onClick={() => handleClickDetails(item._id)}
              />
              <CardContent sx={{ maxHeight: 150, cursor: 'pointer' }} onClick={() => handleClickDetails(item._id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tooltip title={getTitle({ title: item.title, status: item.status })} placement="top">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '250px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {getTitle({ title: item.title, status: item.status })}
                    </Typography>
                  </Tooltip>

                  {item.isFeatured && <StarIcon />}
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                  }}
                >
                  {item.address}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>
                <Button size="small" onClick={() => handleEditProperty(item._id)}>
                  {messages.edit}
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
