import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

function CateringCompanyCard({
  companyName,
  contactInformation,
  menus,
  delivery,
  specialSpecifications,
  capacity,
  onDelete,
}) {
  const renderMenus = menus.map((menu, index) => {
    let menuTypeIcon = null;
    if (menu.menuType === 'BREAKFAST') {
      menuTypeIcon = <FreeBreakfastIcon />;
    } else if (menu.menuType === 'LUNCH') {
      menuTypeIcon = <FastfoodIcon />;
    } else if (menu.menuType === 'DINNER') {
      menuTypeIcon = <DinnerDiningIcon />;
    }

    const menuItems = menu.items.join(', ');

    return (
      <ImageListItem key={index}>
      <Card
        sx={{
          display: 'inline-block',
          borderRadius: 'md',
          mx: 1,
          boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'visible',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {menu.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            {menuTypeIcon}
            <Typography variant="body2" color="textSecondary" ml={1}>
              {menu.menuType}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" mb={2}>
            {menuItems}
          </Typography>
        </CardContent>
        <Box
          sx={{
            p: 2,
            color: 'white',
            textAlign: 'center',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
          }}
        >
          <Typography variant="subtitle2" component="div" color="primary">
            ${menu.pricePerServing}
          </Typography>
        </Box>
      </Card>
    </ImageListItem>
    );
  });

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
        padding: '12px',
      }}
    >
      <MDBox mt={1} mx={0.5} display="flex" alignItems="center">
        <MDTypography variant="h4" textTransform="capitalize">
          {companyName}
        </MDTypography>
        <MDBox ml="auto" display="flex" alignItems="center">
        <IconButton onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
        </MDBox>
      </MDBox>
      <MDBox mb={3} lineHeight={0} ml={2}>
        <MDTypography variant="body2" color="textSecondary">
          {contactInformation.email} | {contactInformation.phoneNumber} | {contactInformation.website}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={2} ml={2}>
        {specialSpecifications.map((specification, index) => (
          <MDBox key={index} display="flex" alignItems="center" mr={1}>
            <CheckIcon color="primary" sx={{ color: 'primary', mr: 0.5 }} />
            <MDTypography variant="body2" color="textSecondary">
              {specification}
            </MDTypography>
          </MDBox>
        ))}
        <MDBox display="flex" alignItems="center" ml={2}>
          <RestaurantIcon color="primary" sx={{ color: 'primary', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" color="textSecondary">
            {capacity}
          </Typography>
        </MDBox>
        <MDBox ml={2} display="flex" alignItems="center">
          <LocalShippingIcon color="primary" sx={{ mr: 0.5 }} />
          <MDTypography variant="body2" color="textSecondary">
            {delivery ? 'Available' : 'Not Available'}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" overflow="auto">
        <ImageList
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr)) !important',
            gridAutoColumns: 'minmax(240px, 1fr)',
            gap: '16px',
            height: '250px',
          }}
        >
          {renderMenus}
        </ImageList>
      </MDBox>
    </Card>
  );
}

CateringCompanyCard.propTypes = {
  companyName: PropTypes.string.isRequired,
  contactInformation: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      menuType: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pricePerServing: PropTypes.number.isRequired,
    })
  ).isRequired,
  delivery: PropTypes.bool.isRequired,
  specialSpecifications: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  capacity: PropTypes.number.isRequired,
};

export default CateringCompanyCard;
