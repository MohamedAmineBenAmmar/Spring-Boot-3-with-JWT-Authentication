import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import CardActionArea from '@mui/material/CardActionArea'; // Add this import
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

function CateringCompanyCard({
  companyName,
  contactInformation,
  menus,
  delivery,
  specialSpecifications,
  capacity,
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
      
        return (
          <ImageListItem key={index}>
            <Card
              sx={{
                display: 'inline-block',
                borderRadius: 'md',
                mx: 1,
                boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'visible',
              }}
            >
              <CardActionArea>
                <CardContent sx={{ p: 3 }}>
                  <MDTypography variant="h5" gutterBottom>
                    {menu.name}
                  </MDTypography>
                  <MDBox display="flex" alignItems="center" mb={2}>
                    {menuTypeIcon}
                    <MDTypography variant="body2" color="textSecondary" ml={1}>
                      {menu.menuType}
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="body2" color="textSecondary" mb={2}>
                    {menu.items.join(', ')}
                  </MDTypography>
                  <MDTypography variant="subtitle2" color="primary" textAlign="center" mt={2}>
                    ${menu.pricePerServing}
                  </MDTypography>
                </CardContent>
              </CardActionArea>
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
        padding: '16px',
      }}
    >
      <MDBox mt={1} mx={0.5} display="flex" alignItems="center">
        <MDTypography variant="h4" textTransform="capitalize">
          {companyName}
        </MDTypography>
        <MDBox ml="auto" display="flex" alignItems="center">
          <LocalShippingIcon color ="primary" sx={{ mr: 0.5 }} />
          <MDTypography variant="body2" color="textSecondary">
            {delivery ? 'Available' : 'Not Available'}
          </MDTypography>
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
            <CheckIcon  color ="primary" sx={{ color: 'primary', mr: 0.5 }} />
            <MDTypography variant="body2" color="textSecondary">
              {specification}
            </MDTypography>
          </MDBox>
        ))}
        <MDBox display="flex" alignItems="center" ml={2}>
          <RestaurantIcon  color ="primary" sx={{ color: 'primary', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" color="textSecondary">
            {capacity}
          </Typography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" overflow="auto">
  <ImageList
    sx={{
      gridAutoFlow: 'column',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr)) !important',
      gridAutoColumns: 'minmax(160px, 1fr)',
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
