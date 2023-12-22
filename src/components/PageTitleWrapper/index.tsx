import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, styled, useTheme } from '@mui/material';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
  children?: React.ReactNode;
}

const PageTitleWrapper: React.FC<PageTitleWrapperProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <PageTitle
      sx={{
        background: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        marginBottom: `${theme.spacing(4)}`
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </PageTitle>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
