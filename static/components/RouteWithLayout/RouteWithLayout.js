import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Dashboard } from '../../views/Dashboard';
// import { Authors } from '../../views/Authors/Authors';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  // console.log(props);
  // return;
  return (
    <Route
      {...rest}
      render={ matchProps => (
        <Layout>
          {/* <Dashboard></Dashboard> */}
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
