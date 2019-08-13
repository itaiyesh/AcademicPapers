import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { Dashboard } from '../../views/Dashboard';
// import { Authors } from '../../views/Authors/Authors';

const RouteWithLayout = props => {
  //TODO: We pass recommendedAuthors here to all views, even though not all views use it!
  const { layout: Layout, component: Component, onSearchQueryResults, onAuthorSelected, recommendedAuthors, setRecommendedAuthors, author, ...rest } = props;

  return (
    <Route
      {...rest}
      render={ matchProps => 
        (
        <Layout onSearchQueryResults={onSearchQueryResults}>
          <Component {...matchProps} recommendedAuthors={recommendedAuthors} setRecommendedAuthors={setRecommendedAuthors} onAuthorSelected={onAuthorSelected} author={author}/>
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
