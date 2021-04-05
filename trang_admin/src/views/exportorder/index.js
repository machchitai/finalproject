import React, { useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ExportOrderForm from './ExportOrderForm';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ExportOrder = () => {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Page
      className={classes.root}
      title="Export orders"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <ExportOrderForm />
        </Box>
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default ExportOrder;
