import React, {useState} from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

// import {
//   Dashboard as DashboardView,
//   ProductList as ProductListView,
//   UserList as UserListView,
//   Typography as TypographyView,
//   Icons as IconsView,
//   Account as AccountView,
//   Settings as SettingsView,
//   SignUp as SignUpView,
//   SignIn as SignInView,
//   NotFound as NotFoundView

//   ,Authors as AuthorsView
// } from '../views';

 
import { Authors as AuthorsView} from '../views/Authors/Authors';
import { Dashboard as DashboardView } from '../views/Dashboard/Dashboard'
import { UserList as UserListView } from '../views/UserList/UserList'
import { ProductList as ProductListView } from '../views/ProductList/ProductList'
import { Typography as TypographyView } from '../views/Typography/Typography'
import { Icons as IconsView } from '../views/Icons/Icons'
import { Account as AccountView } from '../views/Account/Account'
import { WatchAuthor as WatchAuthorView } from '../views/WatchAuthor/WatchAuthor'

import { createHashHistory } from 'history'

const history = createHashHistory();

const Routes = () => {

  const [recommendedAuthors, setRecommendedAuthors] = useState([]);
  const [author, setAuthor] = useState(null);

  const [showWatchAuthor, setShowWatchAuthor] = useState(false);

  const onSearchQueryResults = (results) => {
      console.log("Routes.js", results);
      setRecommendedAuthors(results);
      // setShowWatchAuthor(true);
  };

  const onAuthorSelected = (author) => {
    console.log("Routes.js Author selected:", author);
    // setRecommendedAuthors(results);
    setAuthor(author);
    setShowWatchAuthor(true);
};

  const renderRedirect = (showWatchAuthor) => {
    if(showWatchAuthor) {
      return <Redirect
      exact
      from="/"
      to="/watch"
    /> 
     } else { 
      return <Redirect
        exact
        from="/"
        to="/authors"
      /> 
     }
  }

  return (
    // This was Switch
    <BrowserRouter> 
    
     {renderRedirect(showWatchAuthor)}

      <RouteWithLayout
        component={AuthorsView}
        // exact
        layout={MainLayout}
        onSearchQueryResults={onSearchQueryResults}
        onAuthorSelected={onAuthorSelected}
        recommendedAuthors = {recommendedAuthors}
        //Author is redundant here
        author = {author}

        path="/authors"
      />
          <RouteWithLayout
        component={WatchAuthorView}
        // exact
        layout={MainLayout}
        onSearchQueryResults={onSearchQueryResults}
        onAuthorSelected={onAuthorSelected}

        recommendedAuthors = {recommendedAuthors}
        author = {author}
        path="/watch"
      />
      <RouteWithLayout
        component={DashboardView}
        // exact
        layout={MainLayout}

        //This may be redundant
        onSearchQueryResults={onSearchQueryResults}
        onAuthorSelected={onAuthorSelected}

        recommendedAuthors = {recommendedAuthors}
        //Author is redundant here
        author = {author}

        path="/dashboard"
      />
      {/* <Redirect to="/wsdadsd" /> */}
      </BrowserRouter>

  );
};

export  { Routes };


      // {/* <RouteWithLayout
      //   component={UserListView}
      //   exact
      //   layout={MainLayout}
      //   path="/users"
      // />
      // <RouteWithLayout
      //   component={ProductListView}
      //   exact
      //   layout={MainLayout}
      //   path="/products"
      // />
      // <RouteWithLayout
      //   component={TypographyView}
      //   exact
      //   layout={MainLayout}
      //   path="/typography"
      // />
      // <RouteWithLayout
      //   component={IconsView}
      //   exact
      //   layout={MainLayout}
      //   path="/icons"
      // />
      // <RouteWithLayout
      //   component={AccountView}
      //   exact
      //   layout={MainLayout}
      //   path="/account"
      // /> */}
      // {/* <RouteWithLayout
      //   component={SettingsView}
      //   exact
      //   layout={MainLayout}
      //   path="/settings"
      // />
      // <RouteWithLayout
      //   component={SignUpView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/sign-up"
      // />
      // <RouteWithLayout
      //   component={SignInView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/sign-in"
      // />
      // <RouteWithLayout
      //   component={NotFoundView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/not-found"
      // /> */}
      // {/* <Redirect to="/not-found" /> */}
