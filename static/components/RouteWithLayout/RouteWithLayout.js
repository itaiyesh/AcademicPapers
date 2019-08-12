import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { Dashboard } from '../../views/Dashboard';
// import { Authors } from '../../views/Authors/Authors';

const RouteWithLayout = props => {
  //TODO: We pass recommendedAuthors here to all views, even though not all views use it!
  const { layout: Layout, component: Component, onSearchQueryResults, onAuthorSelected, recommendedAuthors,author, ...rest } = props;
  console.log("onAuthorSelected1:  ", onAuthorSelected)

  return (
    <Route
      {...rest}
      render={ matchProps => 
        (
        <Layout onSearchQueryResults={onSearchQueryResults}>
          <Component {...matchProps} recommendedAuthors={recommendedAuthors} onAuthorSelected={onAuthorSelected} author={author}/>
        </Layout>
      )
  }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
